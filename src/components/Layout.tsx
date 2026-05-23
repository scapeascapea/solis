import { Menu, X, Eye, Wallet, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [walletType, setWalletType] = useState<"phantom" | "metamask" | null>(null);
  const location = useLocation();

// Check if wallet is already connected on mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    // Check Phantom
    if (window.solana?.isPhantom) {
      try {
        const response = await window.solana.connect({ onlyIfTrusted: true });
        setWalletAddress(response.publicKey.toString());
        setWalletConnected(true);
        setWalletType("phantom");
      } catch (err) {
        // Not connected
      }
    }
    // Check MetaMask
    if (window.ethereum?.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
          setWalletType("metamask");
        }
      } catch (err) {
        // Not connected
      }
    }
  };

  const connectPhantom = async () => {
    if (!window.solana?.isPhantom) {
      window.open("https://phantom.app/", "_blank");
      return;
    }
    try {
      const response = await window.solana.connect();
      setWalletAddress(response.publicKey.toString());
      setWalletConnected(true);
      setWalletType("phantom");
      setShowWalletMenu(false);
    } catch (err) {
      console.error("Failed to connect Phantom:", err);
    }
  };

  const connectMetaMask = async () => {
    if (!window.ethereum?.isMetaMask) {
      window.open("https://metamask.io/", "_blank");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      setWalletConnected(true);
      setWalletType("metamask");
      setShowWalletMenu(false);
    } catch (err) {
      console.error("Failed to connect MetaMask:", err);
    }
  };

  const disconnect = () => {
    setWalletConnected(false);
    setWalletAddress("");
    setWalletType(null);
    setShowWalletMenu(false);
    if (window.solana?.disconnect) {
      window.solana.disconnect();
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

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

{/* Right side: Anonymous badge + Wallet button */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-1.5">
            <Eye size={14} className="text-amber" />
            <span className="text-xs font-semibold tracking-wide text-amber uppercase">
              No KYC · Fully Anonymous
            </span>
          </div>

{/* Wallet button */}
          <div className="relative">
            <button
              onClick={() => {
                console.log("Button clicked");
                setShowWalletMenu(!showWalletMenu);
              }}
              className="flex items-center gap-2 bg-amber/10 border border-amber/20 hover:border-amber/40 rounded-full px-4 py-2 transition-all duration-200"
            >
              <Wallet size={16} className="text-amber" />
              <span className="text-sm font-semibold text-white">
                {walletConnected ? truncateAddress(walletAddress) : "Connect"}
              </span>
            </button>

            {/* Wallet dropdown menu */}
            <AnimatePresence>
              {showWalletMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-black/95 border border-white/10 rounded-xl backdrop-blur-xl z-50 overflow-hidden"
                >
                  {!walletConnected ? (
                    <>
                      <button
                        onClick={connectPhantom}
                        className="w-full px-4 py-3 text-left text-white hover:bg-amber/10 transition-colors flex items-center gap-2 border-b border-white/10"
                      >
                        <Wallet size={16} className="text-amber" />
                        <span className="font-semibold">Phantom</span>
                      </button>
                      <button
                        onClick={connectMetaMask}
                        className="w-full px-4 py-3 text-left text-white hover:bg-amber/10 transition-colors flex items-center gap-2"
                      >
                        <Wallet size={16} className="text-amber" />
                        <span className="font-semibold">MetaMask</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-xs text-white/50 border-b border-white/10">
                        {walletType === "phantom" ? "Phantom" : "MetaMask"}
                      </div>
                      <div className="px-4 py-2 text-xs text-white break-all">
                        {walletAddress}
                      </div>
                      <button
                        onClick={disconnect}
                        className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2 border-t border-white/10"
                      >
                        <LogOut size={16} />
                        <span className="font-semibold">Disconnect</span>
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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

// Type definitions for window objects
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect(options?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: { toString(): string } }>;
      disconnect(): Promise<void>;
    };
    ethereum?: {
      isMetaMask?: boolean;
      request(args: { method: string; params?: unknown[] }): Promise<unknown>;
    };
  }
}