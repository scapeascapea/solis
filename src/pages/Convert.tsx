import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, Eye, Search, TrendingUp, TrendingDown } from "lucide-react";
import { SUPPORTED_CRYPTOS, useCryptoPrices } from "@/hooks/useCryptoPrices";
import CryptoIcon from "@/components/CryptoIcon";
import SwapCard from "@/components/SwapCard";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: "easeOut" as const },
  }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Convert() {
  const { prices, loading } = useCryptoPrices();
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState("1");
  const [baseCoin, setBaseCoin] = useState("USDT");

  const basePrice = useMemo(
    () => prices.find((c) => c.symbol === baseCoin)?.price ?? 1,
    [prices, baseCoin]
  );

  const filtered = useMemo(
    () =>
      prices.filter(
        (c) =>
          c.symbol !== baseCoin &&
          (c.symbol.toLowerCase().includes(search.toLowerCase()) ||
            c.name.toLowerCase().includes(search.toLowerCase()))
      ),
    [prices, baseCoin, search]
  );

  const inputValue = parseFloat(amount) || 0;

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-24 pb-12 px-6 md:px-12 lg:px-16">
        <div className="content-max-width">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              className="inline-flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-2 mb-6"
              variants={fadeInUp}
            >
              <Eye size={14} className="text-amber" />
              <span className="text-xs font-semibold text-amber uppercase tracking-wider">
                Live Rates · Updated Every 30 Seconds
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-4"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
              variants={fadeInUp}
            >
              Conversion Rates
            </motion.h1>

            <motion.div
              className="liquid-glass rounded-xl px-6 py-4 max-w-[700px]"
              variants={fadeInUp}
            >
              <p
                className="text-base text-white/90 leading-relaxed"
                style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
              >
                Real-time conversion rates between all supported cryptocurrencies. 
                Powered by live market data. Swap instantly with no account required.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Two-column layout: Swap card + Rate table */}
      <section className="px-6 md:px-12 lg:px-16 pb-20 relative z-10">
        <div className="content-max-width grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
          {/* Swap Card */}
          <motion.div
            className="lg:sticky lg:top-24 self-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SwapCard />
          </motion.div>

          {/* Rate Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Controls */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-xl p-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"
                  />
                  <input
                    type="text"
                    placeholder="Search cryptocurrency..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-[#737373] outline-none focus:border-amber/40 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#737373]">Base:</span>
                  <select
                    value={baseCoin}
                    onChange={(e) => setBaseCoin(e.target.value)}
                    className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-amber/40 transition-colors"
                  >
                    {SUPPORTED_CRYPTOS.map((c) => (
                      <option key={c.symbol} value={c.symbol}>
                        {c.symbol}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#737373]">Amount:</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-28 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white font-data outline-none focus:border-amber/40 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_80px] gap-4 px-5 py-3 border-b border-white/[0.08] text-xs font-semibold text-[#737373] uppercase tracking-wider">
                <span>Asset</span>
                <span className="text-right">Price ({baseCoin})</span>
                <span className="text-right">24h Change</span>
                <span className="text-right">You Receive</span>
                <span></span>
              </div>

              {/* Loading */}
              {loading && (
                <div className="px-5 py-8 text-center text-[#737373]">
                  Loading live rates...
                </div>
              )}

              {/* Rows */}
              {filtered.map((crypto) => {
                const rate = basePrice > 0 ? crypto.price / basePrice : 0;
                const received = inputValue * rate;
                return (
                  <div
                    key={crypto.symbol}
                    className="grid grid-cols-[1fr_1fr_1fr_1fr_80px] gap-4 px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center"
                  >
                    <div className="flex items-center gap-3">
                      <CryptoIcon symbol={crypto.symbol} size={28} />
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {crypto.symbol}
                        </div>
                        <div className="text-xs text-[#737373]">
                          {crypto.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-data text-sm text-white">
                      {rate.toLocaleString("en", {
                        maximumFractionDigits: 8,
                      })}
                    </div>
                    <div
                      className={`text-right text-sm font-medium flex items-center justify-end gap-1 ${
                        crypto.change24h >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {crypto.change24h >= 0 ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h.toFixed(2)}%
                    </div>
                    <div className="text-right font-data text-sm text-amber">
                      {received.toLocaleString("en", {
                        maximumFractionDigits: 6,
                      })}
                    </div>
                    <div className="text-right">
                      <ArrowRightLeft
                        size={16}
                        className="text-[#737373] hover:text-amber cursor-pointer transition-colors inline-block"
                      />
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && !loading && (
                <div className="px-5 py-8 text-center text-[#737373]">
                  No cryptocurrencies found matching "{search}"
                </div>
              )}
            </div>

            {/* Supported pairs */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white mb-3">
                All Supported Trading Pairs
              </h3>
              <div className="flex flex-wrap gap-2">
                {SUPPORTED_CRYPTOS.flatMap((a) =>
                  SUPPORTED_CRYPTOS.filter((b) => b.symbol !== a.symbol).map(
                    (b) => `${a.symbol}/${b.symbol}`
                  )
                )
                  .filter((_, i, arr) => arr.indexOf(_) === i)
                  .slice(0, 24)
                  .map((pair) => (
                    <span
                      key={pair}
                      className="text-xs bg-white/[0.03] border border-white/[0.08] text-[#A3A3A3] px-3 py-1.5 rounded-full"
                    >
                      {pair}
                    </span>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
