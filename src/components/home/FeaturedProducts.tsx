import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  brand: string;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  badge?: "FLASH" | "DISKON" | "BARU" | "TERLARIS";
  badgeDiscount?: number;
  rating: number;
  sold: number;
  poinReward: number;
};

const featuredProducts: Product[] = [
  {
    id: "lenovo-ideapad-slim3",
    brand: "Lenovo",
    name: "IdeaPad Slim 3 15IRU8 i5 Gen 12",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    price: 7_499_000,
    originalPrice: 8_999_000,
    badge: "TERLARIS",
    rating: 4.8,
    sold: 128,
    poinReward: 750,
  },
  {
    id: "asus-vivobook-15",
    brand: "ASUS",
    name: "VivoBook 15 A1502ZA i5 OLED",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80",
    price: 8_999_000,
    originalPrice: 10_500_000,
    badge: "DISKON",
    badgeDiscount: 14,
    rating: 4.7,
    sold: 96,
    poinReward: 900,
  },
  {
    id: "hp-laserjet-m28",
    brand: "HP",
    name: "LaserJet Pro M28w WiFi Multifungsi",
    category: "Printer",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80",
    price: 2_350_000,
    badge: "BARU",
    rating: 4.6,
    sold: 42,
    poinReward: 235,
  },
  {
    id: "acer-aspire-c24",
    brand: "Acer",
    name: "Aspire C24-1800 AIO i3 Gen 13",
    category: "PC Desktop",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80",
    price: 5_799_000,
    originalPrice: 6_500_000,
    badge: "DISKON",
    badgeDiscount: 11,
    rating: 4.5,
    sold: 67,
    poinReward: 580,
  },
  {
    id: "lenovo-thinkpad-e14",
    brand: "Lenovo",
    name: "ThinkPad E14 Gen 5 Ryzen 5",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    price: 11_500_000,
    originalPrice: 13_000_000,
    badge: "FLASH",
    badgeDiscount: 12,
    rating: 4.9,
    sold: 54,
    poinReward: 1150,
  },
  {
    id: "hp-deskjet-2335",
    brand: "HP",
    name: "DeskJet 2335 All-in-One Printer",
    category: "Printer",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80",
    price: 649_000,
    originalPrice: 799_000,
    badge: "DISKON",
    badgeDiscount: 19,
    rating: 4.4,
    sold: 215,
    poinReward: 65,
  },
  {
    id: "asus-pc-s500",
    brand: "ASUS",
    name: "ExpertCenter S500MA Intel Core i5",
    category: "PC Desktop",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80",
    price: 7_299_000,
    badge: "BARU",
    rating: 4.6,
    sold: 39,
    poinReward: 730,
  },
  {
    id: "acer-swift-go",
    brand: "Acer",
    name: "Swift Go 14 Ryzen 7 OLED",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    price: 12_999_000,
    originalPrice: 14_500_000,
    badge: "TERLARIS",
    badgeDiscount: 10,
    rating: 4.8,
    sold: 73,
    poinReward: 1300,
  },
];

const badgeStyle: Record<string, string> = {
  FLASH: "bg-red-500 text-white",
  DISKON: "bg-[#22C55E] text-white",
  BARU: "bg-[#0B1E35] text-white",
  TERLARIS: "bg-green-600 text-white",
};

function formatPrice(p: number) {
  return "Rp " + p.toLocaleString("id-ID");
}

function formatInstallment(p: number) {
  return "Rp " + Math.round(p / 12).toLocaleString("id-ID") + "/bln";
}

export function FeaturedProducts() {
  return (
    <section className="py-14 md:py-20 bg-gray-50" aria-labelledby="featured-heading">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 id="featured-heading" className="font-heading text-2xl md:text-3xl text-gray-900 font-bold mb-1.5">
              Produk Terlaris
            </h2>
            <p className="text-gray-500 text-sm">
              Produk terpopuler pilihan pelanggan — original bergaransi resmi
            </p>
          </div>
          <Button variant="outline" className="shrink-0 border-gray-300 text-gray-700 hover:bg-gray-100" asChild>
            <Link to="/products">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product, index) => (
            <article
              key={product.id}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-green-300 hover:shadow-md transition-all duration-200 animate-fade-in flex flex-col"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.brand} ${product.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={400}
                  height={400}
                />
                {product.badge && (
                  <span className={cn(
                    "absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[11px] font-bold",
                    badgeStyle[product.badge]
                  )}>
                    {product.badge === "DISKON" || product.badge === "FLASH"
                      ? `${product.badge}${product.badgeDiscount ? " " + product.badgeDiscount + "%" : ""}`
                      : product.badge}
                  </span>
                )}
                {/* Poin badge */}
                <span className="absolute top-2.5 right-2.5 flex items-center gap-0.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-md">
                  <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                  +{product.poinReward}
                </span>
                {/* Wishlist */}
                <button
                  type="button"
                  className="absolute bottom-2.5 right-2.5 h-7 w-7 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-red-200"
                  aria-label={`Simpan ${product.name} ke wishlist`}
                >
                  <Heart className="h-3.5 w-3.5 text-gray-400 hover:text-red-500 transition-colors" />
                </button>
              </div>

              {/* Info */}
              <div className="p-3.5 flex flex-col flex-1 gap-1.5">
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">{product.category}</span>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">{product.brand}</p>
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug mt-0.5">
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex" aria-label={`${product.rating} bintang`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200 fill-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400">({product.sold})</span>
                </div>

                {/* Price */}
                <div className="mt-auto pt-1">
                  <p className="font-heading font-bold text-base text-[#0B1E35] tabular">
                    {formatPrice(product.price)}
                  </p>
                  {product.originalPrice && (
                    <p className="text-xs text-gray-400 line-through tabular">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                  <p className="text-[11px] text-gray-400 tabular">
                    atau {formatInstallment(product.price)}
                  </p>
                </div>

                <Button
                  size="sm"
                  className="w-full mt-2 bg-[#0B1E35] hover:bg-[#1A3A6A] text-white font-semibold text-xs h-8"
                  asChild
                >
                  <Link to={`/products/${product.id}`}>
                    <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                    Lihat Detail
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
