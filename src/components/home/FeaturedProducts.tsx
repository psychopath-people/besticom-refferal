import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, ArrowUpRight } from "lucide-react";

const featuredProducts = [
  {
    id: "lenovo-laptop",
    brand: "Lenovo",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    badge: "Terlaris",
  },
  {
    id: "asus-laptop",
    brand: "ASUS",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600",
    badge: "Best Value",
  },
  {
    id: "hp-printer",
    brand: "HP",
    category: "Printer",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600",
    badge: null,
  },
  {
    id: "acer-pc",
    brand: "Acer",
    category: "Desktop PC",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600",
    badge: "Paket Hemat",
  },
];

export function FeaturedProducts() {
  return (
    <section className="section-spacing bg-gradient-to-b from-background to-secondary/40">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase">
              Pilihan BESTI
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">
              Brand Pilihan
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Kami menyediakan produk dari brand-brand terpercaya untuk produktivitas, pendidikan, dan bisnis Anda.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products">
              Lihat Semua Brand
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="group relative rounded-2xl bg-card border border-border overflow-hidden card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.brand} ${product.category}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-sm">
                    {product.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 h-9 w-9 rounded-full bg-card/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4 text-accent" />
                </span>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-heading font-bold text-2xl text-foreground group-hover:text-accent transition-colors">
                  {product.brand}
                </h3>

                <div className="pt-3 border-t border-border flex gap-2">
                  <Button variant="accent" size="sm" className="flex-1" asChild>
                    <span>Lihat Detail</span>
                  </Button>
                  <Button variant="whatsapp" size="sm" className="px-3" asChild>
                    <a
                      href={`https://wa.me/6281234567890?text=Halo%20BESTI,%20saya%20tertarik%20dengan%20${product.category}%20${product.brand}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
