# ⚡ RegimeSkill - AI Powered Trading Strategy Skill

> BNB Hack 2026 · Track 2 · Strategy Skills

Live Demo: https://bnb-strategy-skill.vercel.app

## What is RegimeSkill?

RegimeSkill is a CoinMarketCap-powered AI trading strategy skill that detects market regimes, analyzes sentiment divergence, and generates actionable trading signals using Groq AI (Llama 3.3 70B).

## How It Works

1. **Fetch Live Data** — Pulls real-time price, volume, BTC dominance, and Fear & Greed Index from CoinMarketCap API
2. **Detect Market Regime** — Classifies market as Trending Up, Trending Down, Ranging, or High Volatility
3. **Sentiment Divergence Analysis** — Detects when price action and sentiment disagree (high-alpha signals)
4. **AI Signal Generation** — Groq AI generates BUY/SELL/WAIT signal with entry zone, stop loss, take profit, and plain-English reasoning

## Features

- Live token price, market cap, volume, 7d change
- 4-regime market classification engine
- Fear & Greed Index integration
- Sentiment divergence detection
- AI-powered trading signals (BUY/SELL/WAIT)
- Signal history (last 5 signals)
- Custom token search (any CMC-listed token)
- Dark/Light mode
- 10+ pre-loaded tokens: BTC, ETH, BNB, SOL, ADA, LINK, DOT, AVAX, UNI, AAVE

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| AI Skill | Groq API (Llama 3.3 70B) |
| Market Data | CoinMarketCap API |
| Deployment | Vercel |
| Font | Space Grotesk |

## Strategy Logic

### Regime Detection
- Price change > 8% either direction → HIGH VOLATILITY
- Price > +3% with positive volume → TRENDING UP
- Price < -3% with positive volume → TRENDING DOWN
- Otherwise → RANGING

### Sentiment Divergence
- Price falling + Fear & Greed > 60 → BEARISH DIVERGENCE (strong signal)
- Price rising + Fear & Greed < 40 → BULLISH DIVERGENCE (strong signal)
- Mild mismatches → MEDIUM signals
- Aligned → NO DIVERGENCE (weak signal)

## Local Development

```bash
git clone https://github.com/Mayahang/bnb-strategy-skill
cd bnb-strategy-skill/bnb-strategy-skill
npm install
# Add your API keys to .env
# VITE_CMC_API_KEY=your_key
# VITE_GROQ_API_KEY=your_key
npm run dev
```

## Environment Variables

```
VITE_CMC_API_KEY=your_coinmarketcap_api_key
VITE_GROQ_API_KEY=your_groq_api_key
```

## Hackathon

Built for BNB Hack 2026 - Track 2: Strategy Skills
Powered by CoinMarketCap AI Agent Hub + Groq AI + BNB Chain
