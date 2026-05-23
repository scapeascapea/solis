import { motion } from "framer-motion";
import TradingViewChart from "@/components/TradingViewChart";
import { SUPPORTED_CRYPTOS } from "@/hooks/useCryptoPrices";
import CryptoIcon from "@/components/CryptoIcon";
import { TrendingUp, TrendingDown, Eye } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: "easeOut" as const },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const CHART_PAIRS = [
  { symbol: "BTCUSDT", name: "Bitcoin", sub: "BTC / USDT", exchange: "BINANCE" },
  { symbol: "ETHUSDT", name: "Ethereum", sub: "ETH / USDT", exchange: "BINANCE" },
  { symbol: "SOLUSDT", name: "Solana", sub: "SOL / USDT", exchange: "BINANCE" },
  { symbol: "XMRUSDT", name: "Monero", sub: "XMR / USDT", exchange: "BINANCE" },
  { symbol: "LTCUSDT", name: "Litecoin", sub: "LTC / USDT", exchange: "BINANCE" },
  { symbol: "BCHUSDT", name: "Bitcoin Cash", sub: "BCH / USDT", exchange: "BINANCE" },
];

export default function Markets() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-24 pb-12 px-6 md:px-12 lg:px-16">
        <div className="content-max-width">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-2 mb-6"
              variants={fadeInUp}
            >
              <Eye size={14} className="text-amber" />
              <span className="text-xs font-semibold text-amber uppercase tracking-wider">
                Live Market Data
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-4"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
              variants={fadeInUp}
            >
              Live Markets
            </motion.h1>

            <motion.div
              className="liquid-glass rounded-xl px-6 py-4 max-w-[700px]"
              variants={fadeInUp}
            >
              <p
                className="text-base text-white/90 leading-relaxed"
                style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
              >
                Real-time charts powered by TradingView. Track Bitcoin, Ethereum, Solana, Monero, Litecoin and more. All data updates live — no refresh needed.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Price overview cards */}
      <section className="px-6 md:px-12 lg:px-16 pb-8 relative z-10">
        <div className="content-max-width">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {SUPPORTED_CRYPTOS.filter(c => c.symbol !== "USDC" && c.symbol !== "USDT").slice(0, 5).map((crypto, i) => (
              <motion.div
                key={crypto.symbol}
                className="bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-xl p-4 hover:border-amber/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CryptoIcon symbol={crypto.symbol} size={24} />
                  <span className="font-semibold text-white text-sm">{crypto.symbol}</span>
                </div>
                <div className="text-lg font-bold text-white font-data">
                  ${crypto.price.toLocaleString("en", { maximumFractionDigits: crypto.price < 1 ? 4 : 2 })}
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {crypto.change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="px-6 md:px-12 lg:px-16 pb-20 relative z-10">
        <div className="content-max-width space-y-8">
          {CHART_PAIRS.map((pair, i) => (
            <motion.div
              key={pair.symbol}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <CryptoIcon
                  symbol={pair.symbol.replace("USDT", "")}
                  size={28}
                />
                <div>
                  <h3 className="font-semibold text-white">{pair.name}</h3>
                  <span className="text-xs text-[#737373]">{pair.sub}</span>
                </div>
              </div>
              <TradingViewChart
                symbol={pair.symbol}
                exchange={pair.exchange}
                height={420}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
