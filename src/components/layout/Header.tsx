import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Produk", href: "/products" },
  { name: "Member", href: "/member" },
  { name: "Cek Poin", href: "/points" },
  { name: "Tentang Kami", href: "/about" },
  { name: "Kontak", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container-custom flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            <a 
              href="https://wa.me/6281234567890" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+62 812-3456-7890</span>
            </a>
            <span className="hidden sm:flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Plaza Marina, Surabaya
            </span>
          </div>
          <span className="text-primary-foreground/80">
            Senin - Sabtu: 09:00 - 18:00 WIB
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="container-custom">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-action flex items-center justify-center shadow-sm">
              <span className="font-heading font-bold text-accent-foreground text-lg">B</span>
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-foreground">BESTI</span>
              <span className="text-muted-foreground text-sm block -mt-1">Computer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="default" asChild>
              <Link to="/member">Daftar Member</Link>
            </Button>
            <Button variant="whatsapp" size="default" asChild>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                Chat WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="whatsapp" className="mt-3" asChild>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  Chat WhatsApp
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
