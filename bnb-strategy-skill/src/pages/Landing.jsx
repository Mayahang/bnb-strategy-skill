import { useNavigate } from "react-router-dom";
import { useState } from "react";

const stats = [
  { value: "10+", label: "Tokens Supported" },
  { value: "3", label: "Data Layers" },
  { value: "Live", label: "CMC Data" },
  { value: "AI", label: "Groq Powered" },
];

const steps = [
  { step: "01", icon: "📡", title: "Fetch Live Data", desc: "Pulls real-time price, volume, BTC dominance, and Fear and Greed Index from CoinMarketCap API.", border: "#3b82f6" },
  { step: "02", icon: "🔍", title: "Detect Regime", desc: "Classifies the market as Trending Up, Trending Down, Ranging, or High Volatility. Checks if sentiment diverges from price.", border: "#facc15" },
  { step: "03", icon: "🧠", title: "Generate AI Signal", desc: "Groq AI synthesizes all data into a BUY, SELL, or WAIT signal with entry zone, stop loss, take profit, and reasoning.", border: "#22c55e" },
];

const features = [
  { icon: "📈", title: "Regime Detection", desc: "Automatically classifies market conditions into 4 regime types" },
  { icon: "😱", title: "Fear and Greed Analysis", desc: "Real-time CMC Fear and Greed Index integrated into every signal" },
  { icon: "⚡", title: "Sentiment Divergence", desc: "Spots when price action and market sentiment disagree" },
  { icon: "🤖", title: "AI Signal Generation", desc: "Llama 3.3 70B generates entry, exit, stop loss, and plain-English reasoning" },
  { icon: "🪙", title: "10+ Tokens", desc: "BTC, ETH, BNB, SOL, ADA, LINK, DOT, AVAX, UNI, AAVE and more" },
  { icon: "📊", title: "Backtestable Strategy", desc: "Every signal includes a clear strategy spec suitable for backtesting" },
];

export default function Landing() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);

  const t = {
    bg: dark ? "#030712" : "#f9fafb",
    card: dark ? "#111827" : "#ffffff",
    border: dark ? "#1f2937" : "#e5e7eb",
    text: dark ? "#ffffff" : "#111827",
    muted: dark ? "#9ca3af" : "#6b7280",
    subtle: dark ? "#4b5563" : "#9ca3af",
    navbg: dark ? "rgba(3,7,18,0.95)" : "rgba(249,250,251,0.95)",
  };

  return (
    <div style={{minHeight:"100vh", backgroundColor:t.bg, color:t.text, transition:"all 0.3s"}}>

      {/* Navbar */}
      <nav style={{position:"sticky", top:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 48px", borderBottom:"1px solid " + t.border, backgroundColor:t.navbg, backdropFilter:"blur(12px)"}}>
        <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
          <span style={{color:"#facc15", fontSize:"22px"}}>⚡</span>
          <span style={{color:t.text, fontWeight:"700", fontSize:"20px", letterSpacing:"-0.5px"}}>RegimeSkill</span>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:"28px"}}>
          <a href="#how" style={{color:t.muted, textDecoration:"none", fontSize:"14px", fontWeight:"500"}}>How it works</a>
          <a href="#features" style={{color:t.muted, textDecoration:"none", fontSize:"14px", fontWeight:"500"}}>Features</a>
          <button onClick={() => setDark(!dark)} style={{background:"none", border:"1px solid " + t.border, borderRadius:"8px", padding:"6px 12px", cursor:"pointer", color:t.muted, fontSize:"16px"}}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button onClick={() => navigate("/app")} style={{backgroundColor:"#facc15", color:"#000", fontWeight:"700", padding:"10px 22px", borderRadius:"10px", border:"none", cursor:"pointer", fontSize:"14px", letterSpacing:"-0.2px"}}>
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", padding:"100px 24px 80px"}}>
        <div style={{backgroundColor: dark ? "rgba(250,204,21,0.08)" : "rgba(250,204,21,0.15)", border:"1px solid rgba(250,204,21,0.4)", borderRadius:"999px", padding:"6px 18px", marginBottom:"32px", display:"inline-block"}}>
          <span style={{color:"#d97706", fontSize:"12px", fontWeight:"700", letterSpacing:"1px"}}>BNB HACK 2026 · TRACK 2 STRATEGY SKILL</span>
        </div>
        <h1 style={{fontSize:"clamp(40px, 7vw, 80px)", fontWeight:"700", marginBottom:"28px", lineHeight:"1.05", maxWidth:"900px", letterSpacing:"-2px"}}>
          AI-Powered<br />
          <span style={{color:"#facc15"}}>Trading Strategy</span><br />
          Skill
        </h1>
        <p style={{color:t.muted, fontSize:"18px", maxWidth:"560px", marginBottom:"48px", lineHeight:"1.75", fontWeight:"400"}}>
          Detects market regimes, analyzes sentiment divergence, and generates
          actionable trading signals powered by live CoinMarketCap data and Groq AI.
        </p>
        <div style={{display:"flex", gap:"16px", flexWrap:"wrap", justifyContent:"center"}}>
          <button onClick={() => navigate("/app")} style={{backgroundColor:"#facc15", color:"#000", fontWeight:"700", padding:"16px 36px", borderRadius:"12px", border:"none", cursor:"pointer", fontSize:"17px", letterSpacing:"-0.3px"}}>
            🚀 Launch App
          </button>
          <a href="#how" style={{border:"1px solid " + t.border, color:t.text, fontWeight:"600", padding:"16px 36px", borderRadius:"12px", textDecoration:"none", fontSize:"17px"}}>
            How it works
          </a>
        </div>

        {/* Stats */}
        <div style={{display:"flex", gap:"56px", marginTop:"80px", flexWrap:"wrap", justifyContent:"center", borderTop:"1px solid " + t.border, paddingTop:"48px", width:"100%", maxWidth:"700px"}}>
          {stats.map((stat) => (
            <div key={stat.label} style={{textAlign:"center"}}>
              <div style={{fontSize:"36px", fontWeight:"700", color:"#facc15", letterSpacing:"-1px"}}>{stat.value}</div>
              <div style={{color:t.muted, fontSize:"13px", marginTop:"4px", fontWeight:"500"}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{padding:"80px 24px", borderTop:"1px solid " + t.border}}>
        <div style={{maxWidth:"960px", margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:"56px"}}>
            <h2 style={{fontSize:"36px", fontWeight:"700", marginBottom:"12px", letterSpacing:"-1px"}}>How It Works</h2>
            <p style={{color:t.muted, fontSize:"16px"}}>Three layers of intelligence, one clear signal</p>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"24px"}}>
            {steps.map((item) => (
              <div key={item.step} style={{backgroundColor:t.card, borderRadius:"16px", padding:"28px", borderTop:"3px solid " + item.border, boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.08)"}}>
                <div style={{color:t.subtle, fontSize:"11px", fontWeight:"700", marginBottom:"16px", letterSpacing:"2px"}}>STEP {item.step}</div>
                <div style={{fontSize:"36px", marginBottom:"16px"}}>{item.icon}</div>
                <h3 style={{color:t.text, fontWeight:"700", fontSize:"18px", marginBottom:"10px", letterSpacing:"-0.3px"}}>{item.title}</h3>
                <p style={{color:t.muted, fontSize:"14px", lineHeight:"1.7"}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{padding:"80px 24px", borderTop:"1px solid " + t.border}}>
        <div style={{maxWidth:"960px", margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:"56px"}}>
            <h2 style={{fontSize:"36px", fontWeight:"700", marginBottom:"12px", letterSpacing:"-1px"}}>Features</h2>
            <p style={{color:t.muted, fontSize:"16px"}}>Everything you need to make informed trading decisions</p>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(360px, 1fr))", gap:"16px"}}>
            {features.map((f) => (
              <div key={f.title} style={{backgroundColor:t.card, borderRadius:"14px", padding:"22px", border:"1px solid " + t.border, display:"flex", gap:"16px", boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.06)"}}>
                <div style={{fontSize:"26px", flexShrink:0}}>{f.icon}</div>
                <div>
                  <h3 style={{color:t.text, fontWeight:"600", marginBottom:"6px", fontSize:"15px"}}>{f.title}</h3>
                  <p style={{color:t.muted, fontSize:"13px", lineHeight:"1.6"}}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"100px 24px", borderTop:"1px solid " + t.border}}>
        <div style={{maxWidth:"600px", margin:"0 auto", textAlign:"center"}}>
          <h2 style={{fontSize:"40px", fontWeight:"700", marginBottom:"16px", letterSpacing:"-1.5px"}}>Ready to analyze the market?</h2>
          <p style={{color:t.muted, marginBottom:"40px", fontSize:"16px", lineHeight:"1.7"}}>Pick a token, click analyze, get your AI trading signal in seconds.</p>
          <button onClick={() => navigate("/app")} style={{backgroundColor:"#facc15", color:"#000", fontWeight:"700", padding:"18px 48px", borderRadius:"14px", border:"none", cursor:"pointer", fontSize:"19px", letterSpacing:"-0.3px"}}>
            🚀 Launch App
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{borderTop:"1px solid " + t.border, padding:"28px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px"}}>
        <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
          <span style={{color:"#facc15"}}>⚡</span>
          <span style={{color:t.muted, fontSize:"14px", fontWeight:"500"}}>RegimeSkill</span>
        </div>
        <div style={{color:t.subtle, fontSize:"12px"}}>Powered by CoinMarketCap · Groq AI · BNB Chain</div>
      </footer>

    </div>
  );
}