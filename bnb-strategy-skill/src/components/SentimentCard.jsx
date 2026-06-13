export default function SentimentCard({ data }) {
  if (!data) return null;

  const getScoreColor = (score) => {
    if (score >= 75) return "text-red-400";
    if (score >= 55) return "text-orange-400";
    if (score >= 45) return "text-yellow-400";
    if (score >= 25) return "text-blue-400";
    return "text-green-400";
  };

  const getStrengthColor = (strength) => {
    if (strength === "STRONG") return "text-green-400 bg-green-400/10";
    if (strength === "MEDIUM") return "text-yellow-400 bg-yellow-400/10";
    return "text-gray-400 bg-gray-400/10";
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
      <h2 className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Sentiment Analysis</h2>
      <div className="flex items-center gap-4 mb-4">
        <div className={`text-5xl font-black ${getScoreColor(data.fearGreedScore)}`}>
          {data.fearGreedScore}
        </div>
        <div>
          <div className="text-white font-bold">{data.fearGreedLabel}</div>
          <div className="text-gray-500 text-xs">Fear & Greed Index</div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 mb-3">
        <div className="text-gray-500 text-xs mb-1">Divergence Signal</div>
        <div className="text-white text-sm">{data.divergence}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-gray-500 text-xs">Signal Strength:</div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStrengthColor(data.signalStrength)}`}>
          {data.signalStrength}
        </span>
      </div>
    </div>
  );
}
