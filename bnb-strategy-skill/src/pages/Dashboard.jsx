import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenSelector from "../components/TokenSelector";
import RegimeCard from "../components/RegimeCard";
import SentimentCard from "../components/SentimentCard";
import SignalOutput from "../components/SignalOutput";
import { getTokenData, getGlobalMetrics } from "../services/cmcService";
import { generateSignal } from "../services/groqService";
import { detectRegime, detectSentimentDivergence } from "../utils/regimeDetector";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedToken, setSelectedToken] = useState("BTC");
  const [regimeData, setRegimeData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const [signalData, setSignalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signalLoading, setSignalLoading] = useState(false);
  const [error, setError] = useState(null);

  async function analyze(token) {
    setLoading(true);
    setSignalLoading(true);
    setError(null);
    setRegimeData(null);
    setSentimentData(null);
    setSignalData(null);

    try {
      const [tokenData, globalMetrics] = await Promise.all([
        getTokenData(token),
        getGlobalMetrics(),
      ]);

      const regime = detectRegime(tokenData, globalMetrics);
      const sentiment = detectSentimentDivergence(globalMetrics, tokenData);

      setRegimeData(regime);
      setSentimentData(sentiment);
      setLoading(false);

      const signal = await generateSignal(regime, sentiment, token);
      setSignalData(signal);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setSignalLoading(false);
    }
  }

  function handleTokenSelect(token) {
    setSelectedToken(token);
    analyze(token);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <span className="text-yellow-400 text-2xl">⚡</span>
          <span className="text-white font-black text-lg">RegimeSkill</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-sm">Live CMC Data</span>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">
            Strategy <span className="text-yellow-400">Analyzer</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Select a token and analyze live market conditions
          </p>
        </div>

        {/* Token Selector */}
        <div className="mb-4">
          <TokenSelector
            selected={selectedToken}
            onSelect={handleTokenSelect}
            loading={loading}
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={() => analyze(selectedToken)}
          disabled={loading || signalLoading}
          className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-3 rounded-xl mb-6 transition-all text-lg"
        >
          {loading || signalLoading ? "⏳ Analyzing..." : "🔍 Analyze Market"}
        </button>

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-xl p-4 mb-4 text-red-400">
            {error}
          </div>
        )}

        {/* Results */}
        {(regimeData || sentimentData || signalData || signalLoading) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RegimeCard data={regimeData} />
            <SentimentCard data={sentimentData} />
            <div className="md:col-span-2">
              <SignalOutput data={signalData} loading={signalLoading} />
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-400 text-sm transition"
          >
            ← Back to home
          </button>
        </div>

        <div className="text-center mt-4 text-gray-700 text-xs">
          Not financial advice. For hackathon demonstration only.
        </div>
      </div>
    </div>
  );
}
