import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, Star, ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const flashSaleProducts = [
  {
    id: "lenovo-ideapad-3",
    brand: "Lenovo",
    name: "IdeaPad 3 15IAU7 Intel Core i3",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    price: 5_799_000,
    originalPrice: 6_999_000,
    discount: 17,
    stock: 4,
    maxStock: 10,
    poinReward: 580,
  },
  {
    id: "hp-inkjet-tank-415",
    brand: "HP",
    name: "Ink Tank 415 All-in-One WiFi",
    category: "Printer",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80",
    price: 1_099_000,
    originalPrice: 1_499_000,
    discount: 27,
    stock: 7,
    maxStock: 15,
    poinReward: 110,
  },
  {
    id: "asus-vivobook-flip",
    brand: "ASUS",
    name: "Vivobook Flip 14 TP1401KA",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80",
    price: 6_499_000,
    originalPrice: 7_999_000,
    discount: 19,
    stock: 3,
    maxStock: 8,
    poinReward: 650,
  },
  {
    id: "acer-veriton-pc",
    brand: "Acer",
    name: "Veriton N4710G Mini PC i3",
    category: "PC Desktop",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&q=80",
    price: 4_299_000,
    originalPrice: 5_199_000,
    discount: 17,
    stock: 6,
    maxStock: 12,
    poinReward: 430,
  },
];

function getEndOfDay() {
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  return end;
}

function formatPrice(p: number) {
  return "Rp " + p.toLocaleString("id-ID");
}

export function FlashSaleSection() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, Math.floor((getEndOfDay().getTime() - Date.now()) / 1000));
      setTimeLeft({ h: Math.floor(diff / 3600), m: Math.floor((diff % 3600) / 60), s: diff % 60 });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="py-14 md:py-20" aria-labelledby="flash-sale-heading">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg">
              <Zap className="h-4 w-4 fill-white" />
              <span className="font-heading font-bold text-base">Flash Sale</span>
            </div>
            <div className="flex items-center gap-2" aria-live="polite" aria-label="Waktu tersisa">
              <Clock className="h-4 w-4 text-red-500 shrink-0" />
              <div className="flex items-center gap-1">
                {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((val, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="inline-flex items-center justify-center bg-gray-900 text-white font-heading font-bold text-sm tabular rounded w-8 h-8">
                      {val}
                    </span>
                    {i < 2 && <span className="text-gray-600 font-bold text-sm">:</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 shrink-0" asChild>
            <Link to="/products">
              Lihat Semua Promo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {flashSaleProducts.map((product, index) => {
            const stockPct = Math.round((product.stock / product.maxStock) * 100);
            const isLowStock = product.stock <= 4;
            return (
              <article
                key={product.id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-red-200 hover:shadow-md transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                {/* Discount badge */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <span className="absolute top-2.5 left-2.5 z-10 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                    -{product.discount}%
                  </span>
                  <span className="absolute top-2.5 right-2.5 z-10 flex items-center gap-0.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-md">
                    <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                    +{product.poinReward}
                  </span>
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={300}
                    height={300}
                  />
                </div>

                <div className="p-3.5 space-y-2">
                  <span className="text-[10px] font-bold text-green-600 uppercase">{product.category}</span>
                  <div>
                    <p className="text-[11px] text-gray-400">{product.brand}</p>
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug mt-0.5">
                      {product.name}
                    </h3>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-base text-red-600 tabular">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-xs text-gray-400 line-through tabular">
                      {formatPrice(product.originalPrice)}
                    </p>
                  </div>

                  {/* Stock bar */}
                  <div className="space-y-1">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", isLowStock ? "bg-red-500" : "bg-green-500")}
                        style={{ width: `${stockPct}%` }}
                        role="progressbar"
                        aria-valuenow={product.stock}
                        aria-valuemax={product.maxStock}
                        aria-label={`Stok ${product.stock}`}
                      />
                    </div>
                    <p className={cn("text-[10px] font-semibold", isLowStock ? "text-red-500" : "text-gray-400")}>
                      {isLowStock ? `Sisa ${product.stock} lagi!` : `${product.stock} tersedia`}
                    </p>
                  </div>

                  <Button size="sm" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-xs h-8" asChild>
                    <Link to={`/products/${product.id}`}>
                      <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                      Beli Sekarang
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
