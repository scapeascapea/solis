import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Markets", path: "/markets" },
  { label: "Convert", path: "/convert" },
  { label: "Trade", path: "/trade" },
  { label: "Security", path: "/security" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Persistent video background - all pages */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      >
        <source src="/assets/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlays */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between transition-all duration-300 ${
          scrolled ? "nav-blur border-b border-white/[0.08]" : "bg-transparent"
        }`}
        style={{ padding: "0 clamp(1.5rem, 4vw, 3rem)" }}
      >
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/logo.png"
              alt="Solis"
              className="h-12 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[0.9375rem] font-medium transition-colors duration-200 relative group ${
                  location.pathname === link.path
                    ? "text-amber"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-amber transition-all duration-200 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Anonymous badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-1.5">
            <Eye size={14} className="text-amber" />
            <span className="text-xs font-semibold tracking-wide text-amber uppercase">
              No KYC · Fully Anonymous
            </span>
          </div>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-bold ${
                  location.pathname === link.path ? "text-amber" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-2 mt-4">
              <Eye size={16} className="text-amber" />
              <span className="text-sm font-semibold text-amber uppercase">
                No KYC · Fully Anonymous
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative z-10 pt-[72px]">{children}</main>
    </div>
  );
}
