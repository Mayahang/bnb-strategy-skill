
const SIGNAL_STYLES = {
  BUY: "bg-green-400/10 border-green-400 text-green-400",
  SELL: "bg-red-400/10 border-red-400 text-red-400",
  WAIT: "bg-yellow-400/10 border-yellow-400 text-yellow-400",
};

const CONFIDENCE_COLORS = {
  HIGH: "text-green-400",
  MEDIUM: "text-yellow-400",
  LOW: "text-red-400",
};

const RISK_COLORS = {
  LOW: "text-green-400",
  MEDIUM: "text-yellow-400",
  HIGH: "text-red-400",
};

function exportJSON(data, symbol) {
  const exportData = {
    generated_at: new Date().toISOString(),
    token: symbol,
    signal: data.signal,
    confidence: data.confidence,
    risk_level: data.riskLevel,
    entry_zone: data.entryZone,
    stop_loss: data.stopLoss,
    take_profit: data.takeProfit,
    timeframe: data.timeframe,
    reasoning: data.reasoning,
    powered_by: "RegimeSkill - BNB Hack 2026",
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "regimeskill-signal-" + symbol + "-" + Date.now() + ".json";
  a.click();
  URL.revokeObjectURL(url);
}

export default function SignalOutput({ data, loading, symbol }) {
  if (loading) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-pulse">🧠</div>
          <div className="text-gray-400">AI Skill analyzing market...</div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const signalStyle = SIGNAL_STYLES[data.signal] || SIGNAL_STYLES.WAIT;

  return (
    <div style={{backgroundColor:"#111827", borderRadius:"16px", padding:"20px", border:"1px solid " + (data.signal === "BUY" ? "#22c55e" : data.signal === "SELL" ? "#ef4444" : "#facc15")}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px"}}>
        <div>
          <div style={{color:"#9ca3af", fontSize:"11px", letterSpacing:"2px", marginBottom:"8px"}}>AI TRADING SIGNAL</div>
          <div style={{fontSize:"36px", fontWeight:"900", color: data.signal === "BUY" ? "#22c55e" : data.signal === "SELL" ? "#ef4444" : "#facc15"}}>
            {data.signal === "BUY" ? "🟢" : data.signal === "SELL" ? "🔴" : "🟡"} {data.signal}
          </div>
        </div>
        <button
          onClick={() => exportJSON(data, symbol)}
          style={{backgroundColor:"#1f2937", border:"1px solid #374151", color:"#9ca3af", borderRadius:"10px", padding:"10px 16px", cursor:"pointer", fontSize:"13px", fontWeight:"600", display:"flex", alignItems:"center", gap:"6px"}}
        >
          ⬇️ Export JSON
        </button>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"12px"}}>
        <div style={{backgroundColor:"#1f2937", borderRadius:"10px", padding:"14px"}}>
          <div style={{color:"#6b7280", fontSize:"11px", marginBottom:"4px"}}>Confidence</div>
          <div style={{fontWeight:"700", color: data.confidence === "HIGH" ? "#22c55e" : data.confidence === "MEDIUM" ? "#facc15" : "#ef4444"}}>{data.confidence}</div>
        </div>
        <div style={{backgroundColor:"#1f2937", borderRadius:"10px", padding:"14px"}}>
          <div style={{color:"#6b7280", fontSize:"11px", marginBottom:"4px"}}>Risk Level</div>
          <div style={{fontWeight:"700", color: data.riskLevel === "LOW" ? "#22c55e" : data.riskLevel === "MEDIUM" ? "#facc15" : "#ef4444"}}>{data.riskLevel}</div>
        </div>
        <div style={{backgroundColor:"#1f2937", borderRadius:"10px", padding:"14px"}}>
          <div style={{color:"#6b7280", fontSize:"11px", marginBottom:"4px"}}>Entry Zone</div>
          <div style={{color:"white", fontSize:"13px"}}>{data.entryZone}</div>
        </div>
        <div style={{backgroundColor:"#1f2937", borderRadius:"10px", padding:"14px"}}>
          <div style={{color:"#6b7280", fontSize:"11px", marginBottom:"4px"}}>Timeframe</div>
          <div style={{color:"white", fontSize:"13px"}}>{data.timeframe}</div>
        </div>
      </div>

      <div style={{backgroundColor:"#1f2937", borderRadius:"10px", padding:"14px", marginBottom:"12px"}}>
        <div style={{color:"#6b7280", fontSize:"11px", marginBottom:"4px"}}>Stop Loss</div>
        <div style={{color:"#ef4444", fontSize:"13px"}}>{data.stopLoss}</div>
      </div>

      <div style={{backgroundColor:"#1f2937", borderRadius:"10px", padding:"14px", marginBottom:"12px"}}>
        <div style={{color:"#6b7280", fontSize:"11px", marginBottom:"4px"}}>Take Profit</div>
        <div style={{color:"#22c55e", fontSize:"13px"}}>{data.takeProfit}</div>
      </div>

      <div style={{backgroundColor:"#1f2937", borderRadius:"10px", padding:"14px"}}>
        <div style={{color:"#6b7280", fontSize:"11px", marginBottom:"8px"}}>AI Reasoning</div>
        <div style={{color:"#d1d5db", fontSize:"13px", lineHeight:"1.7"}}>{data.reasoning}</div>
      </div>
    </div>
  );
}
