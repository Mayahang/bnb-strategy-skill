const TOKENS = [
  "BTC", "ETH", "BNB", "SOL", "ADA",
  "LINK", "DOT", "AVAX", "UNI", "AAVE"
];

export default function TokenSelector({ selected, onSelect, loading }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
      <h2 className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Select Token</h2>
      <div className="flex flex-wrap gap-2">
        {TOKENS.map((token) => (
          <button
            key={token}
            onClick={() => !loading && onSelect(token)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              selected === token
                ? "bg-yellow-400 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {token}
          </button>
        ))}
      </div>
    </div>
  );
}
