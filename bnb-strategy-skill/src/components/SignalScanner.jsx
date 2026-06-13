import { useState } from "react";
import { getTokenData, getGlobalMetrics } from "../services/cmcService";
import { generateSignal } from "../services/groqService";
import { detectRegime, detectSentimentDivergence } from "../utils/regimeDetector";

const TOKENS = ["BTC", "ETH", "BNB", "SOL", "ADA", "LINK", "DOT", "AVAX", "UNI", "AAVE"];

const SIGNAL_STYLES = {
  BUY: { bg: "rgba(34,197,94,0.1)", color: "#22c55e", border: "#22c55e", icon: "🟢" },
  SELL: { bg: "rgba(239,68,68,0.1)", color: "#ef4444", border: "#ef4444", icon: "🔴" },
  WAIT: { bg: "rgba(250,204,21,0.1)", color: "#facc15", border: "#facc15", icon: "🟡" },
};

export default function SignalScanner() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentToken, setCurrentToken] = useState("");

  async function scanAll() {
    setScanning(true);
    setResults([]);
    setProgress(0);

    const globalMetrics = await getGlobalMetrics();
    const scanResults = [];

    for (let i = 0; i < TOKENS.length; i++) {
      const token = TOKENS[i];
      setCurrentToken(token);
      setProgress(Math.round(((i) / TOKENS.length) * 100));

      try {
        const td = await getTokenData(token);
        const regime = detectRegime(td, globalMetrics);
        const sentiment = detectSentimentDivergence(globalMetrics, td);
        const signal = await generateSignal(regime, sentiment, token);

        scanResults.push({
          symbol: token,
          price: td?.quote?.USD?.price,
          change24h: td?.quote?.USD?.percent_change_24h,
          regime: regime.regime,
          signal: signal.signal,
          confidence: signal.confidence,
          divergence: sentiment.divergence,
          strength: sentiment.signalStrength,
        });

        // Sort: BUY first, then SELL, then WAIT
        const sorted = [...scanResults].sort((a, b) => {
          const order = { BUY: 0, SELL: 1, WAIT: 2 };
          return order[a.signal] - order[b.signal];
        });
        setResults([...sorted]);
      } catch (err) {
        console.error("Error scanning " + token, err);
      }

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
    }

    setProgress(100);
    setCurrentToken("");
    setScanning(false);
  }

  const fmtPrice = (n) => {
    if (!n) return "-";
    if (n >= 1) return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return "$" + n.toFixed(6);
  };

  const buyCount = results.filter(r => r.signal === "BUY").length;
  const sellCount = results.filter(r => r.signal === "SELL").length;
  const waitCount = results.filter(r => r.signal === "WAIT").length;

  return (
    <div style={{backgroundColor:"#111827",borderRadius:"16px",padding:"20px",border:"1px solid #1f2937",marginBottom:"16px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}}>
        <div>
          <h3 style={{color:"white",fontWeight:"700",fontSize:"16px",marginBottom:"4px"}}>🔍 Signal Scanner</h3>
          <p style={{color:"#6b7280",fontSize:"12px"}}>Scan all tokens and find BUY opportunities instantly</p>
        </div>
        <button
          onClick={scanAll}
          disabled={scanning}
          style={{backgroundColor:scanning?"#374151":"#facc15",color:scanning?"#9ca3af":"black",border:"none",borderRadius:"10px",padding:"10px 20px",cursor:scanning?"not-allowed":"pointer",fontWeight:"700",fontSize:"14px",whiteSpace:"nowrap"}}
        >
          {scanning ? "Scanning..." : "🚀 Scan All Tokens"}
        </button>
      </div>

      {/* Progress bar */}
      {scanning && (
        <div style={{marginBottom:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
            <span style={{color:"#9ca3af",fontSize:"12px"}}>Analyzing {currentToken}...</span>
            <span style={{color:"#9ca3af",fontSize:"12px"}}>{progress}%</span>
          </div>
          <div style={{backgroundColor:"#1f2937",borderRadius:"999px",height:"6px",overflow:"hidden"}}>
            <div style={{backgroundColor:"#facc15",height:"100%",width:progress+"%",transition:"width 0.3s",borderRadius:"999px"}}></div>
          </div>
        </div>
      )}

      {/* Summary badges */}
      {results.length > 0 && !scanning && (
        <div style={{display:"flex",gap:"8px",marginBottom:"16px",flexWrap:"wrap"}}>
          <div style={{backgroundColor:"rgba(34,197,94,0.1)",border:"1px solid #22c55e",borderRadius:"8px",padding:"6px 14px",color:"#22c55e",fontSize:"13px",fontWeight:"700"}}>
            🟢 {buyCount} BUY
          </div>
          <div style={{backgroundColor:"rgba(239,68,68,0.1)",border:"1px solid #ef4444",borderRadius:"8px",padding:"6px 14px",color:"#ef4444",fontSize:"13px",fontWeight:"700"}}>
            🔴 {sellCount} SELL
          </div>
          <div style={{backgroundColor:"rgba(250,204,21,0.1)",border:"1px solid #facc15",borderRadius:"8px",padding:"6px 14px",color:"#facc15",fontSize:"13px",fontWeight:"700"}}>
            🟡 {waitCount} WAIT
          </div>
        </div>
      )}

      {/* Results table */}
      {results.length > 0 && (
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {results.map((r) => {
            const s = SIGNAL_STYLES[r.signal] || SIGNAL_STYLES.WAIT;
            const isPositive = r.change24h >= 0;
            return (
              <div key={r.symbol} style={{display:"grid",gridTemplateColumns:"80px 100px 1fr 100px 80px",alignItems:"center",gap:"12px",backgroundColor:"#1f2937",borderRadius:"10px",padding:"12px 16px",border:"1px solid " + (r.signal === "BUY" ? "rgba(34,197,94,0.3)" : "transparent")}}>
                <div style={{color:"white",fontWeight:"700",fontSize:"14px"}}>{r.symbol}</div>
                <div style={{color:"white",fontSize:"13px"}}>{fmtPrice(r.price)}</div>
                <div style={{color:"#9ca3af",fontSize:"12px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.regime}</div>
                <div style={{color: isPositive ? "#22c55e" : "#ef4444",fontSize:"12px",fontWeight:"600"}}>
                  {isPositive ? "▲" : "▼"} {Math.abs(r.change24h).toFixed(2)}%
                </div>
                <div style={{backgroundColor:s.bg,color:s.color,border:"1px solid "+s.border,borderRadius:"6px",padding:"3px 10px",fontSize:"12px",fontWeight:"700",textAlign:"center"}}>
                  {s.icon} {r.signal}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {results.length === 0 && !scanning && (
        <div style={{textAlign:"center",padding:"24px",color:"#6b7280",fontSize:"14px"}}>
          Click "Scan All Tokens" to find BUY signals across all supported tokens
        </div>
      )}
    </div>
  );
}