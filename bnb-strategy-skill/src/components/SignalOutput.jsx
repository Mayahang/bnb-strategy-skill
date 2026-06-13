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

export default function SignalOutput({ data, loading }) {
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
    <div className={`bg-gray-900 rounded-xl p-4 border ${signalStyle.split(" ")[1]}`}>
      <h2 className="text-gray-400 text-sm mb-3 uppercase tracking-wider">AI Trading Signal</h2>
      <div className={`text-4xl font-black mb-4 ${signalStyle.split(" ")[2]}`}>
        {data.signal === "BUY" ? "🟢" : data.signal === "SELL" ? "🔴" : "🟡"} {data.signal}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">Confidence</div>
          <div className={`font-bold ${CONFIDENCE_COLORS[data.confidence]}`}>{data.confidence}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">Risk Level</div>
          <div className={`font-bold ${RISK_COLORS[data.riskLevel]}`}>{data.riskLevel}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">Entry Zone</div>
          <div className="text-white text-sm">{data.entryZone}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">Timeframe</div>
          <div className="text-white text-sm">{data.timeframe}</div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 mb-3">
        <div className="text-gray-500 text-xs mb-1">Stop Loss</div>
        <div className="text-red-400 text-sm">{data.stopLoss}</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 mb-3">
        <div className="text-gray-500 text-xs mb-1">Take Profit</div>
        <div className="text-green-400 text-sm">{data.takeProfit}</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3">
        <div className="text-gray-500 text-xs mb-2">AI Reasoning</div>
        <div className="text-gray-300 text-sm leading-relaxed">{data.reasoning}</div>
      </div>
    </div>
  );
}
