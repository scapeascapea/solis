import { useState } from "react";
import { ChevronDown, ArrowUpDown, Settings, RefreshCw, Loader2 } from "lucide-react";
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

// Jupiter token mint addresses for Solana tokens
const SOLANA_MINTS: Record<string, string> = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  RAY: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
};

declare global {
  interface Window {
    Jupiter: {
      init(config: Record<string, unknown>): void;
    };
  }
}

export default function SwapCard() {
  const [fromCoin, setFromCoin] = useState("SOL");
  const [toCoin, setToCoin] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("1.5");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapStatus, setSwapStatus] = useState<string | null>(null);

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

  const isSolanaToken = (symbol: string) => SOLANA_MINTS[symbol] !== undefined;

  const handleExecuteSwap = async () => {
    // Check if both tokens are on Solana
    if (isSolanaToken(fromCoin) && isSolanaToken(toCoin)) {
      // Use Jupiter for Solana swaps
      if (!window.solana?.isPhantom) {
        setSwapStatus("Please install Phantom wallet for Solana swaps.");
        return;
      }

      try {
        setIsSwapping(true);
        setSwapStatus("Connecting to Jupiter...");

        const fromMint = SOLANA_MINTS[fromCoin];
        const toMint = SOLANA_MINTS[toCoin];
        const amount = Math.floor(parseFloat(fromAmount) * 1e9); // Convert to lamports

        // Get quote from Jupiter
        const quoteRes = await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=${fromMint}&outputMint=${toMint}&amount=${amount}&slippageBps=50`
        );
        const quote = await quoteRes.json();

        if (!quote || quote.error) {
          setSwapStatus("Failed to get swap quote. Try again.");
          return;
        }

        setSwapStatus("Getting swap transaction...");

        // Connect wallet
        const wallet = await window.solana.connect();
        const userPublicKey = wallet.publicKey.toString();

        // Get swap transaction
        const swapRes = await fetch("https://quote-api.jup.ag/v6/swap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quoteResponse: quote,
            userPublicKey,
            wrapAndUnwrapSol: true,
          }),
        });
        const swapData = await swapRes.json();

        if (!swapData.swapTransaction) {
          setSwapStatus("Failed to create transaction. Try again.");
          return;
        }

        setSwapStatus("Please approve in your wallet...");

        // Sign and send transaction
        const { VersionedTransaction } = await import("@solana/web3.js");
        const transaction = VersionedTransaction.deserialize(
          Buffer.from(swapData.swapTransaction, "base64")
        );

        const { Connection } = await import("@solana/web3.js");
        const connection = new Connection("https://api.mainnet-beta.solana.com");

        const signedTx = await window.solana.signTransaction(transaction);
        const txid = await connection.sendRawTransaction(signedTx.serialize());

        setSwapStatus(`Swap successful! TX: ${txid.slice(0, 8)}...`);
      } catch (err: unknown) {
        const error = err as Error;
        if (error.message?.includes("rejected")) {
          setSwapStatus("Swap cancelled.");
        } else {
          setSwapStatus("Swap failed. Try again.");
        }
      } finally {
        setIsSwapping(false);
      }
    } else {
      // Non-Solana tokens — redirect to ChangeNOW
      const url = `https://changenow.io/?from=${fromCoin.toLowerCase()}&to=${toCoin.toLowerCase()}&amount=${fromAmount}`;
      window.open(url, "_blank");
    }
  };

  const getButtonText = () => {
    if (isSwapping) return swapStatus || "Swapping...";
    if (!isSolanaToken(fromCoin) || !isSolanaToken(toCoin)) return `Swap via ChangeNOW`;
    return "Swap Now";
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
              <span className="text-white font-semibold text-sm">{fromCoin}</span>
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
                      fromCoin === c.symbol ? "text-amber" : "text-white"
                    }`}
                  >
                    <CryptoIcon symbol={c.symbol} size={18} />
                    <span className="font-medium">{c.symbol}</span>
                    <span className="text-[#737373] ml-auto text-xs">{c.name}</span>
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
                    <span className="text-[#737373] ml-auto text-xs">{c.name}</span>
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

      {/* Status message */}
      {swapStatus && (
        <div className="flex items-center gap-2 mb-3 py-2 px-3 bg-amber/[0.05] rounded-lg border border-amber/10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-dot" />
          <span className="text-xs text-amber/80">{swapStatus}</span>
        </div>
      )}

      {/* Anonymous note */}
      {!swapStatus && (
        <div className="flex items-center gap-2 mb-3 py-2 px-3 bg-amber/[0.05] rounded-lg border border-amber/10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-dot" />
          <span className="text-xs text-amber/80">
            No account required. Connect wallet to swap instantly.
          </span>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleExecuteSwap}
        disabled={isSwapping}
        className="w-full bg-amber text-black font-semibold py-3.5 rounded-xl hover:bg-amber-light hover:shadow-glow-amber-strong transition-all duration-200 mt-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSwapping && <Loader2 size={16} className="animate-spin" />}
        {getButtonText()}
      </button>
    </div>
  );
}