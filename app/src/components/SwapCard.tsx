import { useState } from "react";
import { ChevronDown, ArrowUpDown, Settings, RefreshCw } from "lucide-react";
import { SUPPORTED_CRYPTOS } from "@/hooks/useCryptoPrices";
import CryptoIcon from "./CryptoIcon";

const POPULAR_PAIRS = [
  { from: "SOL", to: "USDC" },
  { from: "ETH", to: "USDT" },
  { from: "BTC", to: "USDT" },
  { from: "XMR", to: "BTC" },
  { from: "LTC", to: "ETH" },
  { from: "ETH", to: "SOL" },
  { from: "BCH", to: "USDT" },
  { from: "DOGE", to: "SOL" },
  { from: "TRX", to: "USDC" },
];

export default function SwapCard() {
  const [fromCoin, setFromCoin] = useState("SOL");
  const [toCoin, setToCoin] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("1.5");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromCrypto = SUPPORTED_CRYPTOS.find((c) => c.symbol === fromCoin);
  const toCrypto = SUPPORTED_CRYPTOS.find((c) => c.symbol === toCoin);
  const fromPrice = fromCrypto?.price ?? 1;
  const toPrice = toCrypto?.price ?? 1;
  const usdValue = parseFloat(fromAmount || "0") * fromPrice;
  const toAmount = toPrice > 0 ? (usdValue / toPrice).toFixed(4) : "0";
  const rate = toPrice > 0 ? (fromPrice / toPrice).toFixed(6) : "0";

  const handleSwap = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
  };

  return (
    <div className="liquid-glass rounded-2xl p-5 w-full max-w-[440px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Swap</span>
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse-dot" />
        </div>
        <div className="flex items-center gap-3">
          <Settings
            size={18}
            className="text-[#737373] hover:text-white cursor-pointer transition-colors"
          />
          <RefreshCw
            size={18}
            className="text-[#737373] hover:text-white cursor-pointer transition-colors"
          />
        </div>
      </div>

      {/* Quick pair selectors */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {POPULAR_PAIRS.map((pair) => (
          <button
            key={`${pair.from}-${pair.to}`}
            onClick={() => {
              setFromCoin(pair.from);
              setToCoin(pair.to);
            }}
            className={`text-[0.7rem] px-2.5 py-1 rounded-full border transition-colors ${
              fromCoin === pair.from && toCoin === pair.to
                ? "border-amber/40 bg-amber/10 text-amber"
                : "border-white/[0.08] text-[#737373] hover:text-white hover:border-white/20"
            }`}
          >
            {pair.from}/{pair.to}
          </button>
        ))}
      </div>

      {/* You Pay */}
      <div className="bg-white/[0.03] rounded-xl p-4 mb-2 border border-transparent hover:border-amber/40 transition-colors relative">
        <div className="text-sm text-[#737373] mb-1">You Pay</div>
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="bg-transparent text-2xl md:text-3xl font-bold text-white font-data outline-none w-1/2"
          />
          <div className="relative">
            <button
              onClick={() => {
                setShowFromDropdown(!showFromDropdown);
                setShowToDropdown(false);
              }}
              className="flex items-center gap-2 bg-white/[0.06] px-3 py-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <CryptoIcon symbol={fromCoin} size={22} />
              <span className="text-white font-semibold text-sm">
                {fromCoin}
              </span>
              <ChevronDown size={14} className="text-[#737373]" />
            </button>
            {showFromDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-[#111] border border-white/[0.08] rounded-xl p-2 z-50 min-w-[160px] max-h-[200px] overflow-y-auto">
                {SUPPORTED_CRYPTOS.map((c) => (
                  <button
                    key={c.symbol}
                    onClick={() => {
                      setFromCoin(c.symbol);
                      setShowFromDropdown(false);
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm hover:bg-white/[0.06] transition-colors ${
                      fromCoin === c.symbol
                        ? "text-amber"
                        : "text-white"
                    }`}
                  >
                    <CryptoIcon symbol={c.symbol} size={18} />
                    <span className="font-medium">{c.symbol}</span>
                    <span className="text-[#737373] ml-auto text-xs">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="text-sm text-[#737373] mt-1">
          ≈ ${usdValue.toLocaleString("en", { maximumFractionDigits: 2 })}
        </div>
      </div>

      {/* Switch */}
      <div className="flex justify-center -my-2 relative z-10">
        <button
          onClick={handleSwap}
          className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-amber/10 hover:rotate-180 transition-all duration-300"
        >
          <ArrowUpDown size={16} className="text-amber" />
        </button>
      </div>

      {/* You Receive */}
      <div className="bg-white/[0.03] rounded-xl p-4 mt-2 border border-transparent hover:border-amber/40 transition-colors relative">
        <div className="text-sm text-[#737373] mb-1">You Receive</div>
        <div className="flex items-center justify-between">
          <span className="text-2xl md:text-3xl font-bold text-white font-data">
            ~ {toAmount}
          </span>
          <div className="relative">
            <button
              onClick={() => {
                setShowToDropdown(!showToDropdown);
                setShowFromDropdown(false);
              }}
              className="flex items-center gap-2 bg-white/[0.06] px-3 py-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <CryptoIcon symbol={toCoin} size={22} />
              <span className="text-white font-semibold text-sm">{toCoin}</span>
              <ChevronDown size={14} className="text-[#737373]" />
            </button>
            {showToDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-[#111] border border-white/[0.08] rounded-xl p-2 z-50 min-w-[160px] max-h-[200px] overflow-y-auto">
                {SUPPORTED_CRYPTOS.map((c) => (
                  <button
                    key={c.symbol}
                    onClick={() => {
                      setToCoin(c.symbol);
                      setShowToDropdown(false);
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm hover:bg-white/[0.06] transition-colors ${
                      toCoin === c.symbol ? "text-amber" : "text-white"
                    }`}
                  >
                    <CryptoIcon symbol={c.symbol} size={18} />
                    <span className="font-medium">{c.symbol}</span>
                    <span className="text-[#737373] ml-auto text-xs">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="text-sm text-[#737373] mt-1">
          ≈ ${usdValue.toLocaleString("en", { maximumFractionDigits: 2 })}
        </div>
      </div>

      {/* Rate */}
      <div className="flex items-center justify-between py-3">
        <span className="text-sm text-[#737373]">
          1 {fromCoin} = {rate} {toCoin}
        </span>
        <span className="text-sm text-[#737373]">Floating rate</span>
      </div>

      {/* Anonymous note */}
      <div className="flex items-center gap-2 mb-3 py-2 px-3 bg-amber/[0.05] rounded-lg border border-amber/10">
        <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-dot" />
        <span className="text-xs text-amber/80">
          No account required. Connect wallet to swap instantly.
        </span>
      </div>

      {/* CTA */}
      <button className="w-full bg-amber text-black font-semibold py-3.5 rounded-xl hover:bg-amber-light hover:shadow-glow-amber-strong transition-all duration-200 mt-1">
        Connect Wallet
      </button>
    </div>
  );
}
