const CMC_KEY = "bf811c5ad0484fe0af959410a100fc6b";
const BASE = "/cmc/v1";

const headers = {
  "X-CMC_PRO_API_KEY": CMC_KEY,
  Accept: "application/json",
};

export async function getTokenData(symbol = "BTC") {
  const res = await fetch(
    `${BASE}/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD`,
    { headers }
  );
  const data = await res.json();
  return data.data[symbol];
}

export async function getGlobalMetrics() {
  const res = await fetch(`${BASE}/global-metrics/quotes/latest`, { headers });
  const data = await res.json();
  return data.data;
}
