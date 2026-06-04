import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, Phone, MapPin, Star, ChevronDown,
  Laptop, Monitor, Printer, Mouse,
  Truck, ShieldCheck, CreditCard, Gift,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Produk", href: "/products", hasDropdown: true },
  { name: "Cek Poin", href: "/points" },
  { name: "Daftar Member", href: "/member" },
  { name: "Tentang Kami", href: "/about" },
  { name: "Kontak", href: "/contact" },
];

const categories = [
  { name: "Laptop", icon: Laptop, href: "/products?category=laptop", desc: "Gaming, bisnis & edukasi", bg: "bg-blue-500" },
  { name: "PC & Desktop", icon: Monitor, href: "/products?category=desktop", desc: "PC rakitan & branded", bg: "bg-violet-500" },
  { name: "Printer", icon: Printer, href: "/products?category=printer", desc: "Inkjet, laserjet & multifungsi", bg: "bg-emerald-500" },
  { name: "Aksesoris", icon: Mouse, href: "/products?category=accessories", desc: "Mouse, keyboard, monitor", bg: "bg-green-500" },
];

const trustItems = [
  { icon: Truck, text: "Bebas Ongkir Surabaya" },
  { icon: ShieldCheck, text: "Garansi Resmi" },
  { icon: CreditCard, text: "Cicilan 0%" },
  { icon: Star, text: "Kumpulkan Poin Tiap Belanja" },
  { icon: Gift, text: "Bonus Poin Member" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const location = useLocation();
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoryOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">

      {/* ── Row 1: Info bar ── */}
      <div className="bg-[#0B1E35] dark:bg-[#0a0a0f] text-white/80 text-xs border-b border-white/5">
        <div className="container-custom flex items-center justify-between py-1.5">
          <div className="flex items-center gap-5">
            <a href="tel:+6281234567890" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3 text-green-400 dark:text-purple-400" />
              <span>+62 812-3456-7890</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-teal-400 dark:text-purple-300" />
              Plaza Marina Lt. 3, Surabaya
            </span>
          </div>
          <span className="hidden md:block text-white/40">
            Senin–Jumat 09:00–18:00 · Sabtu 09:00–15:00 WIB
          </span>
        </div>
      </div>

      {/* ── Row 2: Main bar ── */}
      <div className={cn(
        "border-b shadow-sm transition-colors",
        "bg-white dark:bg-[#13111c]",
        "border-gray-200 dark:border-purple-900/30"
      )}>
        <div className="container-custom">
          <div className="flex items-center gap-3 py-3">

            {/* Logo */}
            <Link to="/" className="shrink-0 mr-1" aria-label="BESTI Computer">
              <img src="/logo-besti.jpg" alt="BESTI Computer" className="h-11 w-auto object-contain" />
            </Link>

            <div className="hidden md:block h-8 w-px bg-gray-200 dark:bg-purple-900/50 mx-1" />

            {/* Nav links — desktop */}
            <nav className="hidden md:flex items-center gap-0.5 flex-1" ref={categoryRef}>
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <button
                      type="button"
                      onClick={() => setCategoryOpen(!categoryOpen)}
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                        isActive(item.href)
                          ? "bg-green-500 dark:bg-purple-600 text-white font-semibold shadow-sm dark:shadow-purple-900/40"
                          : "text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-purple-900/30 hover:text-green-700 dark:hover:text-purple-300"
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", categoryOpen && "rotate-180")} />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "block px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                        isActive(item.href)
                          ? "bg-green-500 dark:bg-purple-600 text-white font-semibold shadow-sm dark:shadow-purple-900/40"
                          : "text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-purple-900/30 hover:text-green-700 dark:hover:text-purple-300"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Category dropdown */}
                  {item.hasDropdown && categoryOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-[420px] bg-white dark:bg-[#1a1625] rounded-xl border border-gray-200 dark:border-purple-900/40 shadow-xl z-50 overflow-hidden">
                      <div className="p-2">
                        <p className="px-3 pt-1 pb-2 text-[11px] font-semibold text-gray-400 dark:text-purple-400/70 uppercase tracking-widest">
                          Kategori Produk
                        </p>
                        <div className="grid grid-cols-2 gap-1">
                          {categories.map((cat) => (
                            <Link
                              key={cat.name}
                              to={cat.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-green-50 dark:hover:bg-purple-900/25 transition-all group"
                              onClick={() => setCategoryOpen(false)}
                            >
                              <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", cat.bg)}>
                                <cat.icon className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-green-700 dark:group-hover:text-purple-300">
                                  {cat.name}
                                </p>
                                <p className="text-[11px] text-gray-400 dark:text-gray-500">{cat.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-1 pt-2 border-t border-gray-100 dark:border-purple-900/30 px-3 pb-1">
                          <Link
                            to="/products"
                            className="text-xs font-semibold text-green-600 dark:text-purple-400 hover:underline"
                            onClick={() => setCategoryOpen(false)}
                          >
                            Lihat semua produk →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right group */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Poin */}
              <Link
                to="/points"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-yellow-300 dark:border-yellow-600/40 bg-yellow-50 dark:bg-yellow-900/15 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all group"
                aria-label="Cek Poin"
              >
                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">Poin</span>
              </Link>

              {/* WA CTA */}
              <a
                href="https://wa.me/6281234567890?text=Halo%20BESTI,%20saya%20ingin%20konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-green-500 dark:bg-purple-600 hover:bg-green-600 dark:hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Konsultasi
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="md:hidden p-2 rounded-lg border border-gray-200 dark:border-purple-900/50 bg-gray-50 dark:bg-[#1a1625] hover:bg-gray-100 dark:hover:bg-purple-900/30 transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen
                  ? <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  : <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                }
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Row 3: Trust bar ── */}
      <div className="bg-[#0B1E35] dark:bg-[#0f0b1a] overflow-hidden">
        <div className="flex py-1.5">
          <div className="marquee-track">
            {[...trustItems, ...trustItems].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-6 shrink-0">
                <item.icon className="h-3 w-3 text-green-400 dark:text-purple-400" />
                <span className="text-white/75 text-[11px] font-medium whitespace-nowrap">{item.text}</span>
                <span className="text-white/15 ml-3">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#13111c] border-b border-gray-200 dark:border-purple-900/30 shadow-lg animate-fade-in">
          <div className="container-custom py-3 space-y-0.5">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive(item.href)
                      ? "bg-green-500 dark:bg-purple-600 text-white font-semibold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-purple-900/25 hover:text-green-700 dark:hover:text-purple-300"
                  )}
                >
                  {item.name}
                </Link>
                {item.hasDropdown && (
                  <div className="ml-4 mt-0.5 grid grid-cols-2 gap-1 mb-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-purple-900/20 hover:text-green-700 dark:hover:text-purple-300 transition-all"
                      >
                        <div className={cn("h-5 w-5 rounded flex items-center justify-center shrink-0", cat.bg)}>
                          <cat.icon className="h-3 w-3 text-white" />
                        </div>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-2 pb-1 border-t border-gray-100 dark:border-purple-900/30 flex items-center justify-between gap-2 px-1">
              <Link
                to="/points"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all"
              >
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
                Poin Saya
              </Link>
              <a
                href="https://wa.me/6281234567890?text=Halo%20BESTI,%20saya%20ingin%20konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-green-700 hover:bg-green-50 transition-all"
              >
                <MessageCircle className="h-4 w-4 text-green-500" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
