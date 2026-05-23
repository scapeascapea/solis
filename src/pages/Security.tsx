import { motion } from "framer-motion";
import {
  Snowflake,
  Eye,
  FileCheck,
  RefreshCw,
  ShieldCheck,
  Lock,
  EyeOff,
  Wifi,
  Wallet,
  Shield,
  Globe,
  Fingerprint,
  EyeIcon,
} from "lucide-react";

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

const BADGES = [
  { icon: ShieldCheck, label: "SOC 2 Certified" },
  { icon: Lock, label: "256-bit SSL" },
  { icon: EyeOff, label: "Privacy First" },
  { icon: Fingerprint, label: "Zero-Knowledge" },
];

const SECURITY_FEATURES = [
  {
    icon: Snowflake,
    title: "Cold Storage",
    desc: "95% of assets stored in offline, air-gapped cold wallets with multi-signature protection. Assets are never exposed to online threats.",
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    desc: "24/7 automated threat detection and anomaly analysis across all transaction flows. Suspicious activity triggers immediate lockdown protocols.",
  },
  {
    icon: FileCheck,
    title: "Proof of Reserves",
    desc: "Fully audited and publicly verifiable on-chain. We maintain 1:1 backing for all customer assets at all times. Transparency is non-negotiable.",
  },
  {
    icon: RefreshCw,
    title: "Insurance Coverage",
    desc: "Comprehensive insurance policy covering digital assets against theft, security breaches, and operational failures. Your funds are protected.",
  },
  {
    icon: Shield,
    title: "Smart Contract Audits",
    desc: "All smart contracts undergo rigorous third-party security audits by leading firms like CertiK and Trail of Bits before deployment.",
  },
  {
    icon: Wifi,
    title: "DDoS Protection",
    desc: "Enterprise-grade DDoS mitigation with 100+ Tbps capacity across 300+ data centers worldwide. Platform stays online under any attack.",
  },
  {
    icon: Wallet,
    title: "Non-Custodial Option",
    desc: "Trade directly from your wallet — funds never leave your control unless you explicitly authorize a swap. True self-custody supported.",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    desc: "While we require no KYC, our infrastructure meets international security standards including ISO 27001 and SOC 2 Type II.",
  },
];

const PRIVACY_POINTS = [
  {
    icon: EyeOff,
    title: "No KYC Required",
    desc: "We don't ask for your name, email, phone, or ID. Ever. Connect your wallet and trade. That's it.",
  },
  {
    icon: Fingerprint,
    title: "No Personal Data Collection",
    desc: "We don't store IP addresses, device fingerprints, or browsing history. Zero data retention policy.",
  },
  {
    icon: Lock,
    title: "Encrypted Communications",
    desc: "All traffic is encrypted with TLS 1.3. No third-party trackers, analytics, or cookies that identify you.",
  },
  {
    icon: Shield,
    title: "Decentralized Settlement",
    desc: "Trades settle on-chain. No centralized database holding your transaction history. Your privacy is baked into the protocol.",
  },
];

export default function Security() {
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
              <Shield size={14} className="text-amber" />
              <span className="text-xs font-semibold text-amber uppercase tracking-wider">
                Enterprise-Grade Protection
              </span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-4"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
              variants={fadeInUp}
            >
              Security &amp; Privacy
            </motion.h1>

            <motion.div
              className="liquid-glass rounded-xl px-6 py-4 max-w-[700px]"
              variants={fadeInUp}
            >
              <p
                className="text-base text-white/90 leading-relaxed"
                style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
              >
                Your assets and identity are protected by institutional-grade
                security measures. We collect zero personal data — trade with
                complete anonymity and peace of mind.
              </p>
            </motion.div>

            {/* Badges */}
            <motion.div
              className="flex flex-wrap gap-3 mt-6"
              variants={stagger}
            >
              {BADGES.map((badge) => (
                <motion.div
                  key={badge.label}
                  className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-lg px-4 py-2.5 hover:bg-amber/[0.05] hover:border-amber/20 transition-all"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <badge.icon size={18} className="text-amber" />
                  <span className="text-sm text-white font-medium">
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="px-6 md:px-12 lg:px-16 pb-16 relative z-10">
        <div className="content-max-width">
          <motion.div
            className="mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p className="label-overline mb-3" variants={fadeInUp}>
              SECURITY ARCHITECTURE
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-bold"
              variants={fadeInUp}
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              How We Protect Your Assets
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SECURITY_FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-xl p-6 hover:border-amber/30 hover:bg-black/60 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-10 h-10 rounded-full bg-amber/[0.08] flex items-center justify-center mb-4">
                  <feat.icon size={20} className="text-amber" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-[#A3A3A3] leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section
        className="px-6 md:px-12 lg:px-16 py-16 relative z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))",
        }}
      >
        <div className="content-max-width">
          <motion.div
            className="mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p className="label-overline mb-3" variants={fadeInUp}>
              PRIVACY BY DESIGN
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl font-bold"
              variants={fadeInUp}
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              Fully Anonymous. Zero Data Collected.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRIVACY_POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                className="bg-black/40 backdrop-blur-sm border border-amber/10 rounded-xl p-6 hover:border-amber/30 transition-all"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-amber/[0.08] flex items-center justify-center mb-4">
                  <point.icon size={20} className="text-amber" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-[#A3A3A3] leading-relaxed">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Big privacy statement */}
          <motion.div
            className="mt-12 liquid-glass rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <EyeIcon size={32} className="text-amber mx-auto mb-4" />
            <h3
              className="text-2xl font-bold text-white mb-3"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              Your Identity Is Yours Alone
            </h3>
            <p className="text-[#A3A3A3] max-w-[600px] mx-auto leading-relaxed">
              Unlike centralized exchanges that demand passports, proof of address,
              and invasive verification, Solis respects your privacy. We believe
              financial freedom starts with anonymity. No documents. No waiting.
              No compromise.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
