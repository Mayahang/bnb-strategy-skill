export function detectRegime(tokenData, globalMetrics) {
  const priceChange24h = tokenData?.quote?.USD?.percent_change_24h || 0;
  const volumeChange24h = tokenData?.quote?.USD?.volume_change_24h || 0;
  const btcDominance = globalMetrics?.btc_dominance || 0;
  const marketCapChange24h = globalMetrics?.quote?.USD?.total_market_cap_yesterday_percentage_change || 0;

  let regime = "";

  if (Math.abs(priceChange24h) > 8) {
    regime = "HIGH VOLATILITY";
  } else if (priceChange24h > 3 && volumeChange24h > 0) {
    regime = "TRENDING UP";
  } else if (priceChange24h < -3 && volumeChange24h > 0) {
    regime = "TRENDING DOWN";
  } else {
    regime = "RANGING";
  }

  return {
    regime,
    priceChange24h: priceChange24h.toFixed(2),
    volumeChange24h: volumeChange24h.toFixed(2),
    btcDominance: btcDominance.toFixed(2),
    marketCapChange24h: marketCapChange24h.toFixed(2),
  };
}

export function detectSentimentDivergence(globalMetrics, tokenData) {
  const priceChange24h = tokenData?.quote?.USD?.percent_change_24h || 0;
  const fearGreedScore = globalMetrics?.fear_and_greed_value || 50;

  let fearGreedLabel = "";
  if (fearGreedScore >= 75) fearGreedLabel = "Extreme Greed";
  else if (fearGreedScore >= 55) fearGreedLabel = "Greed";
  else if (fearGreedScore >= 45) fearGreedLabel = "Neutral";
  else if (fearGreedScore >= 25) fearGreedLabel = "Fear";
  else fearGreedLabel = "Extreme Fear";

  // Divergence: price down but greed high = bearish divergence
  // price up but fear high = bullish divergence
  let divergence = "NONE";
  let signalStrength = "WEAK";

  if (priceChange24h < -2 && fearGreedScore > 60) {
    divergence = "BEARISH DIVERGENCE — Price falling but sentiment still greedy";
    signalStrength = "STRONG";
  } else if (priceChange24h > 2 && fearGreedScore < 40) {
    divergence = "BULLISH DIVERGENCE — Price rising but sentiment fearful";
    signalStrength = "STRONG";
  } else if (priceChange24h < 0 && fearGreedScore > 50) {
    divergence = "MILD BEARISH — Slight price drop with positive sentiment";
    signalStrength = "MEDIUM";
  } else if (priceChange24h > 0 && fearGreedScore < 50) {
    divergence = "MILD BULLISH — Slight price rise with negative sentiment";
    signalStrength = "MEDIUM";
  } else {
    divergence = "NO DIVERGENCE — Price and sentiment aligned";
    signalStrength = "WEAK";
  }

  return {
    fearGreedScore,
    fearGreedLabel,
    divergence,
    signalStrength,
  };
}
