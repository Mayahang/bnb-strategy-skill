export default function PriceCard({ data, symbol, onRefresh, refreshing }) {
  if (!data) return null;

  const price = data?.quote?.USD?.price;
  const change24h = data?.quote?.USD?.percent_change_24h;
  const change7d = data?.quote?.USD?.percent_change_7d;
  const marketCap = data?.quote?.USD?.market_cap;
  const volume24h = data?.quote?.USD?.volume_24h;
  const cmcId = data?.id;
  const isPositive = change24h >= 0;

  const fmt = (n) => {
    if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
    return "$" + n?.toFixed(2);
  };

  const fmtPrice = (n) => {
    if (!n) return "$0.00";
    if (n >= 1) return "$" + n?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return "$" + n?.toFixed(6);
  };

  const logoUrl = cmcId
    ? "https://s2.coinmarketcap.com/static/img/coins/64x64/" + cmcId + ".png"
    : null;

  return (
    <div style={{backgroundColor:"#111827",borderRadius:"16px",padding:"20px",border:"1px solid #1f2937"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          {logoUrl ? (
            <img src={logoUrl} alt={symbol} style={{width:"40px",height:"40px",borderRadius:"50%"}} onError={(e) => { e.target.style.display="none"; }} />
          ) : (
            <div style={{width:"40px",height:"40px",backgroundColor:"rgba(250,204,21,0.1)",border:"1px solid rgba(250,204,21,0.3)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{color:"#facc15",fontWeight:"900",fontSize:"12px"}}>{symbol?.slice(0,3)}</span>
            </div>
          )}
          <div>
            <div style={{color:"white",fontWeight:"700",fontSize:"18px"}}>{symbol}</div>
            <div style={{color:"#6b7280",fontSize:"12px"}}>{data?.name}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <div style={{backgroundColor: isPositive ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",color: isPositive ? "#22c55e" : "#ef4444",borderRadius:"8px",padding:"6px 12px",fontSize:"13px",fontWeight:"700"}}>
            {isPositive ? "▲" : "▼"} {Math.abs(change24h)?.toFixed(2)}% 24h
          </div>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            style={{backgroundColor:"#1f2937",border:"1px solid #374151",color:"#9ca3af",borderRadius:"8px",padding:"6px 12px",cursor:"pointer",fontSize:"16px"}}
            title="Refresh data"
          >
            {refreshing ? "⏳" : "🔄"}
          </button>
        </div>
      </div>

      <div style={{fontSize:"36px",fontWeight:"700",color:"white",letterSpacing:"-1px",marginBottom:"16px"}}>
        {fmtPrice(price)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"}}>
        <div style={{backgroundColor:"#1f2937",borderRadius:"10px",padding:"12px"}}>
          <div style={{color:"#6b7280",fontSize:"11px",marginBottom:"4px"}}>Market Cap</div>
          <div style={{color:"white",fontWeight:"600",fontSize:"13px"}}>{fmt(marketCap)}</div>
        </div>
        <div style={{backgroundColor:"#1f2937",borderRadius:"10px",padding:"12px"}}>
          <div style={{color:"#6b7280",fontSize:"11px",marginBottom:"4px"}}>Volume 24h</div>
          <div style={{color:"white",fontWeight:"600",fontSize:"13px"}}>{fmt(volume24h)}</div>
        </div>
        <div style={{backgroundColor:"#1f2937",borderRadius:"10px",padding:"12px"}}>
          <div style={{color:"#6b7280",fontSize:"11px",marginBottom:"4px"}}>7d Change</div>
          <div style={{color: change7d >= 0 ? "#22c55e" : "#ef4444",fontWeight:"600",fontSize:"13px"}}>
            {change7d >= 0 ? "▲" : "▼"} {Math.abs(change7d)?.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}