import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const footerLinks = {
  products: [
    { name: "Laptop", href: "/products?category=laptop" },
    { name: "PC Rakitan", href: "/products?category=desktop" },
    { name: "Printer & Scanner", href: "/products?category=printer" },
    { name: "Aksesoris", href: "/products?category=accessories" },
  ],
  company: [
    { name: "Tentang Kami", href: "/about" },
    { name: "Kontak", href: "/contact" },
    { name: "Lokasi Toko", href: "/contact#location" },
  ],
  brands: ["Lenovo", "ASUS", "HP", "Acer", "Axioo"],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="font-heading font-bold text-accent-foreground text-lg">B</span>
              </div>
              <div>
                <span className="font-heading font-bold text-xl">BESTI</span>
                <span className="text-primary-foreground/70 text-sm block -mt-1">Computer</span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Solusi IT terpercaya untuk bisnis, pendidikan, dan kebutuhan personal Anda. 
              Partner resmi pengadaan IT dengan garansi resmi.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Kategori Produk</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h5 className="font-medium text-sm mb-2">Brand Partner</h5>
              <div className="flex flex-wrap gap-2">
                {footerLinks.brands.map((brand) => (
                  <span 
                    key={brand} 
                    className="text-xs px-2 py-1 rounded bg-primary-foreground/10 text-primary-foreground/70"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  Plaza Marina Lt. 3 No. 42<br />
                  Jl. Margorejo Indah, Surabaya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a 
                  href="tel:+6281234567890" 
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a 
                  href="mailto:info@besticomputer.id" 
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  info@besticomputer.id
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  Senin - Sabtu: 09:00 - 18:00 WIB
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © 2024 BESTI Computer. Semua hak dilindungi.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors text-sm">
                Kebijakan Privasi
              </Link>
              <Link to="/terms" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors text-sm">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
