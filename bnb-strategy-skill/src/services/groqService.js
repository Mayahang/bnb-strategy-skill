export async function generateSignal(regimeData, sentimentData, tokenSymbol) {
  const prompt = `You are an expert crypto trading strategy AI Skill.

Analyze the following market data for ${tokenSymbol} and generate a trading signal.

MARKET REGIME DATA:
- Regime: ${regimeData.regime}
- Price Change 24h: ${regimeData.priceChange24h}%
- Volume Change 24h: ${regimeData.volumeChange24h}%
- BTC Dominance: ${regimeData.btcDominance}%
- Total Market Cap Change 24h: ${regimeData.marketCapChange24h}%

SENTIMENT DATA:
- Fear & Greed Index: ${sentimentData.fearGreedScore} (${sentimentData.fearGreedLabel})
- Sentiment vs Price Divergence: ${sentimentData.divergence}
- Signal Strength: ${sentimentData.signalStrength}

Based on this data, provide a trading strategy in this exact JSON format:
{
  "signal": "BUY or SELL or WAIT",
  "confidence": "HIGH or MEDIUM or LOW",
  "entryZone": "price range or description",
  "stopLoss": "level or description",
  "takeProfit": "level or description",
  "timeframe": "recommended holding period",
  "reasoning": "2-3 sentence explanation",
  "riskLevel": "LOW or MEDIUM or HIGH"
}

Respond with ONLY the JSON object, no other text.`;

  const res = await fetch("/api/groq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 500,
    }),
  });

  const data = await res.json();
  const text = data.choices[0].message.content;
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}
