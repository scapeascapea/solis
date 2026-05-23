import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Eye } from "lucide-react";
import SwapCard from "@/components/SwapCard";
import TradingViewChart from "@/components/TradingViewChart";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: "easeOut" as const },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const FEATURES = [
  "Advanced TradingView charting integration",
  "Real-time depth charts and order book",
  "Limit, market, and stop-loss orders",
  "Portfolio tracking and P&L analytics",
  "API access for algorithmic trading",
  "Cross-chain swaps via atomic swaps",
];

const TIMEFRAMES = ["1H", "4H", "1D", "1W"];
const CHART_PAIRS = [
  { symbol: "BTCUSDT", name: "BTC / USDT" },
  { symbol: "ETHUSDT", name: "ETH / USDT" },
  { symbol: "SOLUSDT", name: "SOL / USDT" },
];

export default function Trade() {
  const [activePair, setActivePair] = useState(0);
  const [activeTf, setActiveTf] = useState("1D");

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
                No Account Required · Connect Wallet to Trade
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-4"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
              variants={fadeInUp}
            >
              Professional Trading
            </motion.h1>

            <motion.div
              className="liquid-glass rounded-xl px-6 py-4 max-w-[700px]"
              variants={fadeInUp}
            >
              <p
                className="text-base text-white/90 leading-relaxed"
                style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
              >
                From simple swaps to complex order strategies, Solis provides the
                tools you need. Trade BTC, ETH, SOL, XMR, LTC and more with
                zero KYC. Connect your wallet and trade in seconds.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main trading area */}
      <section className="px-6 md:px-12 lg:px-16 pb-20 relative z-10">
        <div className="content-max-width grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Left: Chart + Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Chart header */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-xl p-4 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  {CHART_PAIRS.map((pair, i) => (
                    <button
                      key={pair.symbol}
                      onClick={() => setActivePair(i)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        activePair === i
                          ? "bg-amber/15 text-amber"
                          : "text-[#737373] hover:text-white"
                      }`}
                    >
                      {pair.name}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setActiveTf(tf)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        activeTf === tf
                          ? "bg-amber/15 text-amber"
                          : "text-[#737373] hover:text-white"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart */}
            <TradingViewChart
              symbol={CHART_PAIRS[activePair].symbol}
              height={450}
            />

            {/* Features */}
            <motion.div
              className="mt-8 bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h3 className="font-semibold text-white mb-4">
                Trading Features
              </h3>
              <div className="space-y-3">
                {FEATURES.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-green-500" />
                    </div>
                    <span className="text-[#A3A3A3] text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Anonymity callout */}
              <div className="mt-6 p-4 bg-amber/[0.05] rounded-lg border border-amber/10">
                <div className="flex items-start gap-3">
                  <Eye size={18} className="text-amber mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber mb-1">
                      Trade Anonymously
                    </h4>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">
                      No KYC verification required. No personal information collected.
                      Connect any wallet — Phantom, MetaMask, Solflare, Trust Wallet —
                      and start trading immediately. Your identity stays private.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Swap card */}
          <motion.div
            className="lg:sticky lg:top-24 self-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <SwapCard />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
