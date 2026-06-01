import { Link } from "react-router-dom";
import { Laptop, Monitor, Printer, Mouse } from "lucide-react";

const categories = [
  {
    id: "laptop",
    name: "Laptop",
    description: "Laptop bisnis, gaming, dan edukasi dari brand terpercaya",
    icon: Laptop,
    count: "250+ produk",
    href: "/products?category=laptop",
  },
  {
    id: "desktop",
    name: "PC & Desktop",
    description: "PC rakitan dan branded untuk kantor dan sekolah",
    icon: Monitor,
    count: "180+ produk",
    href: "/products?category=desktop",
  },
  {
    id: "printer",
    name: "Printer & Scanner",
    description: "Printer inkjet, laserjet, dan multifungsi",
    icon: Printer,
    count: "120+ produk",
    href: "/products?category=printer",
  },
  {
    id: "accessories",
    name: "Aksesoris",
    description: "Mouse, keyboard, monitor, dan aksesoris lainnya",
    icon: Mouse,
    count: "300+ produk",
    href: "/products?category=accessories",
  },
];

export function CategorySection() {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Kategori Produk
          </h2>
          <p className="text-muted-foreground text-lg">
            Temukan perangkat IT yang tepat untuk kebutuhan bisnis, pendidikan, atau personal Anda
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.href}
              className="group card-hover rounded-xl bg-card border border-border p-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <category.icon className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <span className="inline-block text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {category.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
