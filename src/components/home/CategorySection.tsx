import { Link } from "react-router-dom";
import { Laptop, Monitor, Printer, Mouse } from "lucide-react";

const categories = [
  {
    id: "laptop",
    name: "Laptop",
    description: "Laptop gaming, bisnis & edukasi dari brand terpercaya",
    icon: Laptop,
    count: "250+",
    href: "/products?category=laptop",
    iconBg: "bg-blue-50 dark:bg-blue-900/25",
    iconColor: "text-blue-600 dark:text-blue-400",
    hoverBg: "group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40",
    badge: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/25",
    border: "hover:border-blue-300 dark:hover:border-blue-700/60",
  },
  {
    id: "desktop",
    name: "PC & Desktop",
    description: "PC rakitan dan branded untuk kantor & sekolah",
    icon: Monitor,
    count: "180+",
    href: "/products?category=desktop",
    iconBg: "bg-violet-50 dark:bg-purple-900/30",
    iconColor: "text-violet-600 dark:text-purple-400",
    hoverBg: "group-hover:bg-violet-100 dark:group-hover:bg-purple-900/40",
    badge: "text-violet-600 bg-violet-50 dark:text-purple-400 dark:bg-purple-900/25",
    border: "hover:border-violet-300 dark:hover:border-purple-700/60",
  },
  {
    id: "printer",
    name: "Printer & Scanner",
    description: "Inkjet, laserjet, multifungsi untuk kantor & rumahan",
    icon: Printer,
    count: "120+",
    href: "/products?category=printer",
    iconBg: "bg-cyan-50 dark:bg-cyan-900/25",
    iconColor: "text-cyan-700 dark:text-cyan-400",
    hoverBg: "group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/40",
    badge: "text-cyan-700 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-900/25",
    border: "hover:border-cyan-300 dark:hover:border-cyan-700/60",
  },
  {
    id: "accessories",
    name: "Aksesoris IT",
    description: "Mouse, keyboard, monitor, headset & aksesoris lainnya",
    icon: Mouse,
    count: "300+",
    href: "/products?category=accessories",
    iconBg: "bg-green-50 dark:bg-green-900/25",
    iconColor: "text-green-600 dark:text-green-400",
    hoverBg: "group-hover:bg-green-100 dark:group-hover:bg-green-900/40",
    badge: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/25",
    border: "hover:border-green-300 dark:hover:border-green-700/60",
  },
];

export function CategorySection() {
  return (
    <section className="py-14 md:py-20 bg-white dark:bg-[#0f0b1a]" aria-labelledby="category-heading">
      <div className="container-custom">
        <div className="mb-8 md:mb-10">
          <h2 id="category-heading" className="font-heading text-2xl md:text-3xl text-gray-900 dark:text-white font-bold mb-2">
            Kategori Produk
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            Temukan perangkat IT yang tepat untuk kebutuhan bisnis, pendidikan, atau personal Anda
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              to={cat.href}
              className={`group bg-white dark:bg-[#1a1625] border border-gray-200 dark:border-purple-900/30 rounded-xl p-5 ${cat.border} hover:shadow-md dark:hover:shadow-purple-900/20 transition-all duration-200 animate-fade-in`}
              style={{ animationDelay: `${index * 0.07}s` }}
              aria-label={`${cat.name} — ${cat.count} produk`}
            >
              <div className={`h-12 w-12 rounded-xl ${cat.iconBg} ${cat.hoverBg} flex items-center justify-center mb-4 transition-colors`}>
                <cat.icon className={`h-6 w-6 ${cat.iconColor}`} />
              </div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                {cat.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed mb-3">
                {cat.description}
              </p>
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${cat.badge}`}>
                {cat.count} produk
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
