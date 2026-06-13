export default function PriceCard({ data, symbol }) {
  if (!data) return null;

  const price = data?.quote?.USD?.price;
  const change24h = data?.quote?.USD?.percent_change_24h;
  const change7d = data?.quote?.USD?.percent_change_7d;
  const marketCap = data?.quote?.USD?.market_cap;
  const volume24h = data?.quote?.USD?.volume_24h;
  const isPositive = change24h >= 0;

  const fmt = (n) => {
    if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
    return "$" + n?.toFixed(2);
  };

  const fmtPrice = (n) => {
    if (n >= 1) return "$" + n?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return "$" + n?.toFixed(6);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-full flex items-center justify-center">
            <span className="text-yellow-400 font-black text-sm">{symbol?.slice(0,3)}</span>
          </div>
          <div>
            <div className="text-white font-black text-lg">{symbol}</div>
            <div className="text-gray-500 text-xs">{data?.name}</div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${isPositive ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}>
          {isPositive ? "▲" : "▼"} {Math.abs(change24h)?.toFixed(2)}% 24h
        </div>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-black text-white">{fmtPrice(price)}</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">Market Cap</div>
          <div className="text-white font-bold text-sm">{fmt(marketCap)}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">Volume 24h</div>
          <div className="text-white font-bold text-sm">{fmt(volume24h)}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-500 text-xs mb-1">7d Change</div>
          <div className={`font-bold text-sm ${change7d >= 0 ? "text-green-400" : "text-red-400"}`}>
            {change7d >= 0 ? "▲" : "▼"} {Math.abs(change7d)?.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
