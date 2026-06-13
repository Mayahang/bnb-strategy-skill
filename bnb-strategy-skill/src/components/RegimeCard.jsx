const REGIME_COLORS = {
  "TRENDING UP": "text-green-400 border-green-400",
  "TRENDING DOWN": "text-red-400 border-red-400",
  "HIGH VOLATILITY": "text-orange-400 border-orange-400",
  "RANGING": "text-blue-400 border-blue-400",
};

const REGIME_ICONS = {
  "TRENDING UP": "📈",
  "TRENDING DOWN": "📉",
  "HIGH VOLATILITY": "💥",
  "RANGING": "🔄",
};

export default function RegimeCard({ data }) {
  if (!data) return null;
  const colorClass = REGIME_COLORS[data.regime] || "text-gray-400 border-gray-400";

  return (
    <div className={`bg-gray-900 rounded-xl p-4 border ${colorClass.split(" ")[1]}`}>
      <h2 className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Market Regime</h2>
      <div className={`text-2xl font-black mb-4 ${colorClass.split(" ")[0]}`}>
        {REGIME_ICONS[data.regime]} {data.regime}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">Price Change 24h</div>
          <div className={`text-lg font-bold ${parseFloat(data.priceChange24h) >= 0 ? "text-green-400" : "text-red-400"}`}>
            {data.priceChange24h}%
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">Volume Change 24h</div>
          <div className={`text-lg font-bold ${parseFloat(data.volumeChange24h) >= 0 ? "text-green-400" : "text-red-400"}`}>
            {data.volumeChange24h}%
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">BTC Dominance</div>
          <div className="text-lg font-bold text-yellow-400">{data.btcDominance}%</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">Market Cap Δ</div>
          <div className={`text-lg font-bold ${parseFloat(data.marketCapChange24h) >= 0 ? "text-green-400" : "text-red-400"}`}>
            {data.marketCapChange24h}%
          </div>
        </div>
      </div>
    </div>
  );
}
