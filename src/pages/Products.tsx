import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List, MessageCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "Semua" },
  { id: "laptop", name: "Laptop" },
  { id: "desktop", name: "PC & Desktop" },
  { id: "printer", name: "Printer & Scanner" },
  { id: "accessories", name: "Aksesoris" },
];

const products = [
  { id: "lenovo-laptop", brand: "Lenovo", category: "laptop", categoryLabel: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600", badge: "Terlaris" },
  { id: "asus-laptop", brand: "ASUS", category: "laptop", categoryLabel: "Laptop", image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600", badge: "Best Value" },
  { id: "acer-laptop", brand: "Acer", category: "laptop", categoryLabel: "Laptop", image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600", badge: null },
  { id: "hp-laptop", brand: "HP", category: "laptop", categoryLabel: "Laptop", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600", badge: "Rekomendasi" },
  { id: "dell-laptop", brand: "Dell", category: "laptop", categoryLabel: "Laptop", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600", badge: null },
  { id: "msi-laptop", brand: "MSI", category: "laptop", categoryLabel: "Laptop", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600", badge: null },

  { id: "acer-pc", brand: "Acer", category: "desktop", categoryLabel: "Desktop PC", image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600", badge: "Paket Hemat" },
  { id: "hp-pc", brand: "HP", category: "desktop", categoryLabel: "Desktop PC", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600", badge: null },
  { id: "lenovo-pc", brand: "Lenovo", category: "desktop", categoryLabel: "Desktop PC", image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600", badge: null },

  { id: "hp-printer", brand: "HP", category: "printer", categoryLabel: "Printer", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600", badge: null },
  { id: "canon-printer", brand: "Canon", category: "printer", categoryLabel: "Printer", image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600", badge: null },
  { id: "epson-printer", brand: "Epson", category: "printer", categoryLabel: "Printer", image: "https://images.unsplash.com/photo-1551636898-47668aa61de2?w=600", badge: "Populer" },
  { id: "brother-printer", brand: "Brother", category: "printer", categoryLabel: "Printer", image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600", badge: null },

  { id: "logitech-acc", brand: "Logitech", category: "accessories", categoryLabel: "Aksesoris", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600", badge: null },
  { id: "razer-acc", brand: "Razer", category: "accessories", categoryLabel: "Aksesoris", image: "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?w=600", badge: null },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = searchParams.get("category") || "all";

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <section className="relative surface-mesh border-b border-border">
        <div className="container-custom py-14 md:py-20">
          <div className="max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase">
              Katalog Brand
            </span>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground">
              Brand IT yang <span className="gradient-text">Kami Sediakan</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Jelajahi pilihan laptop, PC, printer, dan aksesoris dari brand terpercaya.
              Hubungi tim BESTI untuk tipe & penawaran terbaik.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-10">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari brand..."
              className="pl-10 h-11 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  if (category.id === "all") {
                    searchParams.delete("category");
                  } else {
                    searchParams.set("category", category.id);
                  }
                  setSearchParams(searchParams);
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:bg-brand-sky hover:text-foreground"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex gap-1 bg-secondary rounded-xl p-1 ml-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === "grid" ? "bg-card shadow-sm text-accent" : "text-muted-foreground hover:bg-card/50"
              )}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === "list" ? "bg-card shadow-sm text-accent" : "text-muted-foreground hover:bg-card/50"
              )}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Menampilkan <span className="font-semibold text-foreground">{filteredProducts.length}</span> brand
        </p>

        <div className={cn(
          "gap-6",
          viewMode === "grid"
            ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "flex flex-col"
        )}>
          {filteredProducts.map((product, index) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className={cn(
                "group rounded-2xl bg-card border border-border overflow-hidden card-hover animate-fade-in",
                viewMode === "list" && "flex"
              )}
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <div className={cn(
                "relative bg-secondary overflow-hidden",
                viewMode === "grid" ? "aspect-[4/3]" : "w-56 shrink-0"
              )}>
                <img
                  src={product.image}
                  alt={`${product.brand} ${product.categoryLabel}`}
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

              <div className="p-5 space-y-2 flex-1 flex flex-col">
                <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <h3 className="font-heading font-bold text-2xl text-foreground group-hover:text-accent transition-colors">
                  {product.brand}
                </h3>

                <div className="pt-3 border-t border-border flex gap-2 mt-auto">
                  <Button variant="accent" size="sm" className="flex-1" asChild>
                    <span>Lihat Detail</span>
                  </Button>
                  <Button variant="whatsapp" size="sm" className="px-3" asChild>
                    <a
                      href={`https://wa.me/6281234567890?text=Halo%20BESTI,%20saya%20tertarik%20dengan%20${product.categoryLabel}%20${product.brand}`}
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Tidak ada brand yang ditemukan.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                searchParams.delete("category");
                setSearchParams(searchParams);
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
