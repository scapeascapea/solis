import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap,
  Shield,
  Percent,
  ChevronDown,
  Eye,
  Clock,
  Globe,
  Lock,
} from "lucide-react";
import SwapCard from "@/components/SwapCard";

/* ─── helpers ─── */
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

/* ─── Market Ticker Data ─── */
const TICKER = [
  { pair: "SOL/USDC", price: "$190.42", change: "+2.34%", up: true },
  { pair: "ETH/USDC", price: "$3,847.21", change: "-0.87%", up: false },
  { pair: "BTC/USDC", price: "$97,542.18", change: "+1.12%", up: true },
  { pair: "XMR/USDT", price: "$218.50", change: "+0.45%", up: true },
  { pair: "LTC/USDT", price: "$89.32", change: "-1.23%", up: false },
  { pair: "SOL/ETH", price: "0.0495", change: "+3.21%", up: true },
  { pair: "BCH/USDT", price: "$452.18", change: "-0.56%", up: false },
  { pair: "DOGE/USDT", price: "$0.185", change: "+3.21%", up: true },
  { pair: "TRX/USDT", price: "$0.245", change: "+1.85%", up: true },
  { pair: "USDT/USDC", price: "$1.0002", change: "+0.01%", up: true },
];

function MiniSparkline({ up }: { up: boolean }) {
  const pts = up
    ? "0,15 5,12 10,14 15,8 20,10 25,5 30,7 35,3 40,5 45,2 50,4 55,0 60,3"
    : "0,3 5,5 10,2 15,8 12,10 20,6 25,12 30,9 35,14 40,11 45,16 50,13 55,18 60,15";
  return (
    <svg width="60" height="20" className="shrink-0">
      <polyline
        points={pts}
        fill="none"
        stroke={up ? "#22C55E" : "#EF4444"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* ─── Features ─── */
const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast Execution",
    desc: "Sub-second settlement powered by Solana. Up to 65,000 TPS with near-zero latency.",
    stat: "< 0.4s",
    statLabel: "avg. settlement",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    desc: "Multi-sig cold wallets, real-time monitoring, and comprehensive insurance coverage.",
    stat: "$2.4B+",
    statLabel: "assets secured",
  },
  {
    icon: Percent,
    title: "Zero Hidden Fees",
    desc: "Transparent pricing. Maker fees from 0.08% with volume discounts. No surprises.",
    stat: "0.08%",
    statLabel: "maker fee",
  },
  {
    icon: Eye,
    title: "Fully Anonymous",
    desc: "No KYC. No account. No email. Connect your wallet and trade immediately. Your privacy is our priority.",
    stat: "0",
    statLabel: "personal data collected",
  },
  {
    icon: Clock,
    title: "24/7 Operation",
    desc: "Trade anytime, anywhere. Our infrastructure runs around the clock with 99.99% uptime.",
    stat: "99.99%",
    statLabel: "uptime SLA",
  },
  {
    icon: Globe,
    title: "10+ Cryptocurrencies",
    desc: "Swap BTC, ETH, SOL, XMR, LTC, USDT, USDC, BCH, DOGE, TRX and more. All major chains supported.",
    stat: "10+",
    statLabel: "supported assets",
  },
];

/* ─── Stats ─── */
const STATS = [
  { value: "$2.4B+", label: "Trading Volume (24h)" },
  { value: "150K+", label: "Active Traders" },
  { value: "< 0.4s", label: "Average Settlement" },
  { value: "99.99%", label: "Uptime SLA" },
];

/* ═══════════ PAGE ═══════════ */
export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const cardY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <div ref={sectionRef}>
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
        {/* Hero Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-4 pt-[72px] pb-8"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Anonymous badge */}
          <motion.div
            className="flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Lock size={14} className="text-amber" />
            <span className="text-xs font-semibold tracking-wide text-amber uppercase">
              No KYC · No Account · Fully Anonymous
            </span>
          </motion.div>

          <motion.p
            className="label-overline mb-6"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            INSTITUTIONAL-GRADE CRYPTO EXCHANGE
          </motion.p>

          <motion.h1
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-6 max-w-[720px]"
            style={{
              textShadow:
                "0 2px 40px rgba(0,0,0,0.7), 0 4px 80px rgba(0,0,0,0.5), 0 0 120px rgba(0,0,0,0.3)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Trade the Future<span className="text-amber">.</span>
            <br />
            Own the Moment<span className="text-amber">.</span>
          </motion.h1>

          {/* Subtitle with liquid glass background */}
          <motion.div
            className="liquid-glass rounded-xl px-6 py-4 max-w-[600px] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p
              className="text-lg text-white/90 leading-relaxed"
              style={{
                textShadow: "0 1px 10px rgba(0,0,0,0.5)",
              }}
            >
              Solis is a high-speed crypto exchange built for serious traders.
              Swap{" "}
              <span className="text-amber font-semibold">
                Bitcoin, Ethereum, Solana, Monero, Litecoin, USDT &amp; USDC
              </span>{" "}
              with institutional-grade security and zero hidden fees. No account
              required.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Link
              to="/trade"
              className="bg-amber text-black font-semibold text-[0.9375rem] px-8 py-3.5 rounded-full hover:bg-amber-light hover:shadow-glow-amber-strong hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Start Trading
            </Link>
            <Link
              to="/markets"
              className="border border-white/25 text-white font-semibold text-[0.9375rem] px-8 py-3.5 rounded-full hover:border-amber hover:text-amber transition-all duration-200"
            >
              View Markets
            </Link>
          </motion.div>
        </motion.div>

        {/* Swap Card */}
        <motion.div
          className="relative z-10 w-full max-w-[440px] mx-auto px-4 mb-8"
          style={{ y: cardY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <SwapCard />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <ChevronDown
            size={20}
            className="text-white/40 animate-bounce-slow"
          />
        </motion.div>
      </section>

      {/* ═══════ MARKET TICKER ═══════ */}
      <section className="relative bg-black/60 backdrop-blur-sm border-y border-white/[0.08] py-4 overflow-hidden z-10">
        <div className="group flex animate-ticker hover:pause-animation">
          {[...TICKER, ...TICKER].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-6 px-6 shrink-0 hover:bg-amber/[0.05] rounded-lg py-1 transition-colors cursor-default"
            >
              <span className="text-sm font-semibold text-white whitespace-nowrap">
                {item.pair}
              </span>
              <span className="text-sm font-medium text-white font-data whitespace-nowrap">
                {item.price}
              </span>
              <span
                className={`text-sm font-medium font-data whitespace-nowrap ${
                  item.up ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.change}
              </span>
              <MiniSparkline up={item.up} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="section-padding-lg relative z-10">
        <div className="content-max-width">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p className="label-overline mb-4" variants={fadeInUp}>
              WHY SOLIS
            </motion.p>
            <motion.h2
              className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.01em] max-w-[600px] mx-auto"
              variants={fadeInUp}
              style={{
                textShadow: "0 2px 30px rgba(0,0,0,0.5)",
              }}
            >
              Built for Traders. Trusted by Institutions.
            </motion.h2>
            <motion.div
              className="mt-4 flex items-center justify-center gap-2"
              variants={fadeInUp}
            >
              <Eye size={14} className="text-amber" />
              <span className="text-sm text-amber/80">
                Fully anonymous — we collect zero personal data
              </span>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-xl p-8 hover:bg-black/60 hover:border-amber/40 hover:shadow-card-hover transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <div className="w-14 h-14 rounded-full bg-amber/[0.08] flex items-center justify-center mb-6">
                  <f.icon size={32} className="text-amber" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {f.title}
                </h3>
                <p className="text-[#A3A3A3] leading-relaxed mb-6">
                  {f.desc}
                </p>
                <div>
                  <span className="text-2xl md:text-3xl font-bold text-amber font-data">
                    {f.stat}
                  </span>
                  <p className="text-sm text-[#737373] mt-1">{f.statLabel}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ STATS BAND ═══════ */}
      <section className="relative bg-black/60 backdrop-blur-sm border-y border-white/[0.08] py-16 z-10">
        <div className="content-max-width px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`text-center ${
                  i < STATS.length - 1
                    ? "lg:border-r lg:border-white/[0.08]"
                    : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-amber font-data">
                  {stat.value}
                </div>
                <p className="text-[#A3A3A3] mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-20 relative overflow-hidden z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,149,58,0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="relative z-10 max-w-[700px] mx-auto text-center px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-2 mb-6"
            variants={fadeInUp}
          >
            <Eye size={14} className="text-amber" />
            <span className="text-xs font-semibold text-amber uppercase tracking-wider">
              No KYC · Fully Anonymous
            </span>
          </motion.div>
          <motion.h2
            className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.01em] mb-4"
            variants={fadeInUp}
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
          >
            Start Trading in 60 Seconds
          </motion.h2>
          <motion.p
            className="text-lg text-[#A3A3A3] max-w-[500px] mx-auto mb-8"
            variants={fadeInUp}
          >
            Join 150,000+ traders on the fastest anonymous crypto exchange. Just
            connect your wallet and go. No forms. No verification. No waiting.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              to="/trade"
              className="inline-block bg-amber text-black font-semibold px-10 py-4 rounded-full hover:bg-amber-light hover:shadow-glow-amber-strong hover:scale-[1.03] transition-all duration-200"
            >
              Start Trading Now
            </Link>
          </motion.div>
          <motion.p
            className="text-sm text-[#737373] mt-4"
            variants={fadeInUp}
          >
            Free to use. No hidden fees. Fully anonymous.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
