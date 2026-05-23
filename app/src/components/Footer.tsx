import { Link } from "react-router-dom";
import { Twitter, Github, MessageCircle, Send, Eye } from "lucide-react";

const FOOTER_LINKS = [
  {
    header: "Product",
    links: [
      { label: "Spot Trading", path: "/trade" },
      { label: "Swaps", path: "/convert" },
      { label: "Markets", path: "/markets" },
      { label: "Earn/Yield", path: "/trade" },
    ],
  },
  {
    header: "Resources",
    links: [
      { label: "Trading Guide", path: "/trade" },
      { label: "Fees", path: "/convert" },
      { label: "Status", path: "/markets" },
      { label: "Changelog", path: "/" },
    ],
  },
  {
    header: "Company",
    links: [
      { label: "About", path: "/security" },
      { label: "Security", path: "/security" },
      { label: "Contact", path: "/security" },
      { label: "Media", path: "/" },
    ],
  },
  {
    header: "Legal",
    links: [
      { label: "Terms of Service", path: "/security" },
      { label: "Privacy Policy", path: "/security" },
      { label: "Risk Disclosure", path: "/security" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black/80 backdrop-blur-sm border-t border-white/[0.08]">
      <div className="content-max-width py-16 px-6 md:px-12 lg:px-16">
        {/* Anonymous banner */}
        <div className="flex items-center justify-center gap-3 mb-12 pb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-5 py-2.5">
            <Eye size={16} className="text-amber" />
            <span className="text-sm font-semibold text-amber uppercase tracking-wider">
              No Account Required · No Personal Data · Fully Anonymous
            </span>
          </div>
        </div>

        {/* Top row */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/logo.png" alt="Solis" className="h-9 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            {[Twitter, MessageCircle, Send, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-[#737373] hover:text-amber transition-colors duration-150"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {FOOTER_LINKS.map((col) => (
            <div key={col.header}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {col.header}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-[#A3A3A3] hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/[0.08] gap-4">
          <p className="text-sm text-[#737373]">
            © 2025 Solis. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#737373]">
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] inline-block" />
            <span>Built on Solana</span>
            <span className="mx-2">·</span>
            <span className="text-amber">Anonymous by Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
