export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { endpoint } = req.query;
  const CMC_KEY = process.env.VITE_CMC_API_KEY;

  const url = `https://pro-api.coinmarketcap.com/v1/${endpoint}`;
  const params = new URLSearchParams(req.query);
  params.delete('endpoint');

  const fullUrl = params.toString() ? `${url}?${params}` : url;

  const response = await fetch(fullUrl, {
    headers: {
      'X-CMC_PRO_API_KEY': CMC_KEY,
      'Accept': 'application/json',
    },
  });

  const data = await response.json();
  return res.status(200).json(data);
}
