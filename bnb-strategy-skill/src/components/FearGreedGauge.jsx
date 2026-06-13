export default function FearGreedGauge({ score }) {
  const getColor = (s) => {
    if (s >= 75) return "#ef4444";
    if (s >= 55) return "#f97316";
    if (s >= 45) return "#facc15";
    if (s >= 25) return "#60a5fa";
    return "#22c55e";
  };

  const getLabel = (s) => {
    if (s >= 75) return "Extreme Greed";
    if (s >= 55) return "Greed";
    if (s >= 45) return "Neutral";
    if (s >= 25) return "Fear";
    return "Extreme Fear";
  };

  const color = getColor(score);
  const label = getLabel(score);
  const angle = (score / 100) * 180 - 90;
  const needleX = 60 + 40 * Math.cos((angle * Math.PI) / 180);
  const needleY = 60 + 40 * Math.sin((angle * Math.PI) / 180);

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"16px"}}>
      <svg width="120" height="70" viewBox="0 0 120 70">
        {/* Background arc segments */}
        <path d="M 10 60 A 50 50 0 0 1 30 17" stroke="#22c55e" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M 30 17 A 50 50 0 0 1 60 10" stroke="#60a5fa" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M 60 10 A 50 50 0 0 1 90 17" stroke="#facc15" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M 90 17 A 50 50 0 0 1 110 60" stroke="#f97316" strokeWidth="8" fill="none" strokeLinecap="round"/>
        {/* Needle */}
        <line x1="60" y1="60" x2={needleX} y2={needleY} stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="60" cy="60" r="4" fill={color}/>
        {/* Score text */}
        <text x="60" y="58" textAnchor="middle" fill={color} fontSize="14" fontWeight="bold">{score}</text>
      </svg>
      <div style={{color:color,fontWeight:"700",fontSize:"13px",marginTop:"4px"}}>{label}</div>
      <div style={{color:"#6b7280",fontSize:"11px",marginTop:"2px"}}>Fear & Greed Index</div>
    </div>
  );
}