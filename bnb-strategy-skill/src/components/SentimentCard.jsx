import FearGreedGauge from "./FearGreedGauge";

export default function SentimentCard({ data }) {
  if (!data) return null;

  const getStrengthColor = (strength) => {
    if (strength === "STRONG") return { color: "#22c55e", bg: "rgba(34,197,94,0.1)" };
    if (strength === "MEDIUM") return { color: "#facc15", bg: "rgba(250,204,21,0.1)" };
    return { color: "#9ca3af", bg: "rgba(156,163,175,0.1)" };
  };

  const sc = getStrengthColor(data.signalStrength);

  return (
    <div style={{backgroundColor:"#111827",borderRadius:"16px",padding:"20px",border:"1px solid #1f2937"}}>
      <div style={{color:"#9ca3af",fontSize:"11px",letterSpacing:"2px",marginBottom:"16px"}}>SENTIMENT ANALYSIS</div>
      
      {/* Gauge */}
      <div style={{display:"flex",justifyContent:"center",marginBottom:"16px"}}>
        <FearGreedGauge score={data.fearGreedScore} />
      </div>

      {/* Divergence */}
      <div style={{backgroundColor:"#1f2937",borderRadius:"10px",padding:"14px",marginBottom:"12px"}}>
        <div style={{color:"#6b7280",fontSize:"11px",marginBottom:"6px"}}>Divergence Signal</div>
        <div style={{color:"white",fontSize:"13px",lineHeight:"1.5"}}>{data.divergence}</div>
      </div>

      {/* Signal Strength */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{color:"#6b7280",fontSize:"12px"}}>Signal Strength</span>
        <span style={{backgroundColor:sc.bg,color:sc.color,borderRadius:"6px",padding:"3px 10px",fontSize:"12px",fontWeight:"700"}}>
          {data.signalStrength}
        </span>
      </div>
    </div>
  );
}