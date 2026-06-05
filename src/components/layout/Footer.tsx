import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, ExternalLink } from "lucide-react";

const footerLinks = {
  products: [
    { name: "Laptop", href: "/products?category=laptop" },
    { name: "PC Rakitan", href: "/products?category=desktop" },
    { name: "Printer & Scanner", href: "/products?category=printer" },
    { name: "Aksesoris IT", href: "/products?category=accessories" },
  ],
  company: [
    { name: "Tentang BESTI", href: "/about" },
    { name: "Kontak Kami", href: "/contact" },
    { name: "Daftar Member", href: "/member" },
    { name: "Cek Poin Saya", href: "/points" },
    { name: "Scan QR Redeem", href: "/scan" },
  ],
  brands: ["Lenovo", "ASUS", "HP", "Acer", "Dell", "MSI", "Intel", "AMD", "Axioo", "Zyrex"],
};

export function Footer() {
  return (
    <footer style={{ background: "#0B1E35" }} role="contentinfo">

      {/* Top accent line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #22C55E 0%, #0EA5E9 50%, #22C55E 100%)" }} />

      {/* Main footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" aria-label="BESTI Computer">
              <img src="/besticom.png" alt="BESTI Computer" className="h-12 w-auto object-contain brightness-110" />
            </Link>
            <p className="text-white/55 text-sm leading-relaxed">
              Toko komputer & solusi IT terpercaya di Plaza Marina Surabaya. Produk original bergaransi resmi, melayani instansi & perusahaan.
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.instagram.com/sahabatbesti/"
                aria-label="Instagram BESTI Computer"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.07)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#E1306C")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              >
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@sahabatbesti.id/"
                aria-label="TikTok BESTI Computer"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.07)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#010101")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              >
                {/* TikTok icon */}
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-base text-white mb-5">Produk</h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-green-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + brands */}
          <div>
            <h4 className="font-heading font-bold text-base text-white mb-5">Perusahaan</h4>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-green-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-2.5">Brand Partner</p>
            <div className="flex flex-wrap gap-1.5">
              {footerLinks.brands.map((brand) => (
                <span
                  key={brand}
                  className="text-xs px-2.5 py-1 rounded-lg text-white/50 hover:text-white transition-colors cursor-default"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-base text-white mb-5">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                <address className="not-italic text-white/50 text-sm leading-relaxed">
                  Plasa Marina Lt.2 Blok G3-4<br />
                  Jl. Margorejo Indah, Surabaya
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-400 shrink-0" />
                <a href="tel:+6285135985189" className="text-white/50 hover:text-green-400 transition-colors text-sm">
                  0851-3598-5189
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-green-400 shrink-0" />
                <a href="mailto:bestimarinasby@gmail.com" className="text-white/50 hover:text-green-400 transition-colors text-sm">
                  bestimarinasby@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                <p className="text-white/50 text-sm leading-relaxed">
                  Setiap hari: 10:00–21:00 WIB
                </p>
              </li>
            </ul>
            <a
              href="https://maps.google.com/?q=besticom+surabaya"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
            >
              Lihat di Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container-custom py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} BESTI Computer. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-xs">Powered by n8n Automation</span>
            <div className="flex gap-4">
              <Link to="/about" className="text-white/30 hover:text-white/60 text-xs transition-colors">Kebijakan Privasi</Link>
              <Link to="/about" className="text-white/30 hover:text-white/60 text-xs transition-colors">Syarat & Ketentuan</Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
