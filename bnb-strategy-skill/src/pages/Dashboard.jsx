import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenSelector from "../components/TokenSelector";
import RegimeCard from "../components/RegimeCard";
import SentimentCard from "../components/SentimentCard";
import SignalOutput from "../components/SignalOutput";
import PriceCard from "../components/PriceCard";
import { getTokenData, getGlobalMetrics } from "../services/cmcService";
import { generateSignal } from "../services/groqService";
import { detectRegime, detectSentimentDivergence } from "../utils/regimeDetector";

const SIGNAL_COLORS = {
  BUY: { bg: "rgba(34,197,94,0.1)", text: "#22c55e", border: "#22c55e" },
  SELL: { bg: "rgba(239,68,68,0.1)", text: "#ef4444", border: "#ef4444" },
  WAIT: { bg: "rgba(250,204,21,0.1)", text: "#facc15", border: "#facc15" },
};

const HISTORY_KEY = "regimeskill_history";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedToken, setSelectedToken] = useState("BTC");
  const [tokenData, setTokenData] = useState(null);
  const [regimeData, setRegimeData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const [signalData, setSignalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signalLoading, setSignalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"));
  const [customSymbol, setCustomSymbol] = useState("");

  async function analyze(token) {
    setLoading(true);
    setSignalLoading(true);
    setError(null);
    setRegimeData(null);
    setSentimentData(null);
    setSignalData(null);
    setTokenData(null);

    try {
      const [td, globalMetrics] = await Promise.all([
        getTokenData(token),
        getGlobalMetrics(),
      ]);
      const regime = detectRegime(td, globalMetrics);
      const sentiment = detectSentimentDivergence(globalMetrics, td);
      setTokenData(td);
      setRegimeData(regime);
      setSentimentData(sentiment);
      setLoading(false);
      const signal = await generateSignal(regime, sentiment, token);
      setSignalData(signal);
      const entry = { symbol: token, signal: signal.signal, confidence: signal.confidence, regime: regime.regime, time: new Date().toLocaleTimeString(), date: new Date().toLocaleDateString() };
      const updated = [entry, ...JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]")].slice(0, 5);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      setHistory(updated);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setSignalLoading(false);
    }
  }

  function handleTokenSelect(token) {
    setSelectedToken(token);
    analyze(token);
  }

  function handleCustomSearch(e) {
    e.preventDefault();
    if (customSymbol.trim()) {
      const sym = customSymbol.trim().toUpperCase();
      setSelectedToken(sym);
      setCustomSymbol("");
      analyze(sym);
    }
  }

  return (
    <div style={{minHeight:"100vh",backgroundColor:"#030712",color:"white"}}>
      <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 40px",borderBottom:"1px solid #1f2937",position:"sticky",top:0,zIndex:100,backgroundColor:"rgba(3,7,18,0.95)",backdropFilter:"blur(12px)"}}>
        <button onClick={() => navigate("/")} style={{display:"flex",alignItems:"center",gap:"8px",background:"none",border:"none",cursor:"pointer"}}>
          <span style={{color:"#facc15",fontSize:"22px"}}>⚡</span>
          <span style={{color:"white",fontWeight:"700",fontSize:"18px"}}>RegimeSkill</span>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <div style={{width:"8px",height:"8px",backgroundColor:"#22c55e",borderRadius:"50%"}}></div>
          <span style={{color:"#9ca3af",fontSize:"13px"}}>Live CMC Data</span>
        </div>
      </nav>

      <div style={{maxWidth:"900px",margin:"0 auto",padding:"40px 20px"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <h1 style={{fontSize:"32px",fontWeight:"700",marginBottom:"8px",letterSpacing:"-1px"}}>Strategy <span style={{color:"#facc15"}}>Analyzer</span></h1>
          <p style={{color:"#9ca3af",fontSize:"14px"}}>Select a token and analyze live market conditions</p>
        </div>

        <div style={{marginBottom:"16px"}}>
          <TokenSelector selected={selectedToken} onSelect={handleTokenSelect} loading={loading} />
        </div>

        <div style={{display:"flex",gap:"8px",marginBottom:"16px"}}>
          <input
            value={customSymbol}
            onChange={(e) => setCustomSymbol(e.target.value.toUpperCase())}
            placeholder="Or type any symbol... e.g. PEPE"
            style={{flex:1,backgroundColor:"#111827",border:"1px solid #374151",borderRadius:"10px",padding:"12px 16px",color:"white",fontSize:"14px",outline:"none"}}
            onKeyDown={(e) => e.key === "Enter" && handleCustomSearch(e)}
          />
          <button onClick={handleCustomSearch} style={{backgroundColor:"#374151",color:"white",border:"none",borderRadius:"10px",padding:"12px 20px",cursor:"pointer",fontSize:"14px",fontWeight:"600"}}>
            Search
          </button>
        </div>

        <button
          onClick={() => analyze(selectedToken)}
          disabled={loading || signalLoading}
          style={{width:"100%",backgroundColor:loading||signalLoading?"#6b7280":"#facc15",color:loading||signalLoading?"white":"black",fontWeight:"700",padding:"14px",borderRadius:"12px",border:"none",cursor:loading||signalLoading?"not-allowed":"pointer",fontSize:"17px",marginBottom:"24px"}}
        >
          {loading || signalLoading ? "Analyzing..." : "Analyze Market"}
        </button>

        {error && (
          <div style={{backgroundColor:"rgba(239,68,68,0.1)",border:"1px solid #ef4444",borderRadius:"12px",padding:"16px",marginBottom:"16px",color:"#ef4444"}}>
            {error}
          </div>
        )}

        {tokenData && (
          <div style={{marginBottom:"16px"}}>
            <PriceCard data={tokenData} symbol={selectedToken} />
          </div>
        )}

        {(regimeData || sentimentData || signalData || signalLoading) && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"16px"}}>
            <RegimeCard data={regimeData} />
            <SentimentCard data={sentimentData} />
            <div style={{gridColumn:"1 / -1"}}>
              <SignalOutput data={signalData} loading={signalLoading} symbol={selectedToken} />
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div style={{backgroundColor:"#111827",borderRadius:"16px",padding:"20px",border:"1px solid #1f2937",marginTop:"8px"}}>
            <h3 style={{color:"white",fontWeight:"700",marginBottom:"16px",fontSize:"15px"}}>Recent Signals</h3>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {history.map((h, i) => {
                const c = SIGNAL_COLORS[h.signal] || SIGNAL_COLORS.WAIT;
                return (
                  <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",backgroundColor:"#1f2937",borderRadius:"10px",padding:"12px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                      <span style={{backgroundColor:c.bg,color:c.text,border:"1px solid "+c.border,borderRadius:"6px",padding:"3px 10px",fontSize:"12px",fontWeight:"700"}}>{h.signal}</span>
                      <span style={{color:"white",fontWeight:"600",fontSize:"14px"}}>{h.symbol}</span>
                      <span style={{color:"#9ca3af",fontSize:"12px"}}>{h.regime}</span>
                    </div>
                    <div style={{color:"#6b7280",fontSize:"12px"}}>{h.date} {h.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{textAlign:"center",marginTop:"32px"}}>
          <button onClick={() => navigate("/")} style={{color:"#6b7280",background:"none",border:"none",cursor:"pointer",fontSize:"13px"}}>Back to home</button>
          <div style={{color:"#374151",fontSize:"11px",marginTop:"8px"}}>Not financial advice. For hackathon demonstration only.</div>
        </div>
      </div>
    </div>
  );
}