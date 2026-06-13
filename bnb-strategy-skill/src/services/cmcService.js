export async function getTokenData(symbol = "BTC") {
  const res = await fetch(
    `/api/cmc?endpoint=cryptocurrency/quotes/latest&symbol=${symbol}&convert=USD`
  );
  const data = await res.json();
  return data.data[symbol];
}

export async function getGlobalMetrics() {
  const res = await fetch(`/api/cmc?endpoint=global-metrics/quotes/latest`);
  const data = await res.json();
  return data.data;
}

export async function getTopTokens() {
  const res = await fetch(
    `/api/cmc?endpoint=cryptocurrency/listings/latest&limit=10&convert=USD`
  );
  const data = await res.json();
  return data.data;
}
