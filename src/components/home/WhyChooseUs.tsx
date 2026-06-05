import { Shield, Users, Clock, Award, Headphones, Truck } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Garansi Resmi",
    description: "Semua produk bergaransi resmi dari distributor. Klaim garansi mudah dan cepat langsung di toko.",
    lightColor: "bg-blue-50 text-blue-600",
    darkColor: "dark:bg-green-900/25 dark:text-green-400",
    stat: "100%",
    statLabel: "Produk Original",
  },
  {
    icon: Users,
    title: "Partner Pengadaan",
    description: "Dipercaya sebagai partner pengadaan IT oleh instansi pemerintah, perusahaan, dan sekolah.",
    lightColor: "bg-violet-50 text-violet-600",
    darkColor: "dark:bg-purple-900/30 dark:text-purple-400",
    stat: "50+",
    statLabel: "Klien Instansi",
  },
  {
    icon: Clock,
    title: "Respons Cepat",
    description: "Respons dalam 24 jam. Tim kami siap membantu konsultasi kebutuhan IT Anda.",
    lightColor: "bg-cyan-50 text-cyan-600",
    darkColor: "dark:bg-green-900/25 dark:text-green-400",
    stat: "<24 jam",
    statLabel: "Waktu Respons",
  },
  {
    icon: Award,
    title: "Produk Berkualitas",
    description: "Hanya menjual produk original dari brand terpercaya. Tidak ada produk KW atau rekondisi.",
    lightColor: "bg-green-50 text-green-600",
    darkColor: "dark:bg-green-900/25 dark:text-green-400",
    stat: "10+",
    statLabel: "Tahun Berpengalaman",
  },
  {
    icon: Headphones,
    title: "Support Teknis",
    description: "Dukungan teknis profesional: instalasi, troubleshooting, dan maintenance untuk klien.",
    lightColor: "bg-green-50 text-green-600",
    darkColor: "dark:bg-purple-900/30 dark:text-purple-400",
    stat: "Free",
    statLabel: "Konsultasi",
  },
  {
    icon: Truck,
    title: "Pengiriman Aman",
    description: "Pengiriman ke seluruh Indonesia dengan packaging khusus dan asuransi barang.",
    lightColor: "bg-blue-50 text-blue-600",
    darkColor: "dark:bg-purple-900/30 dark:text-purple-400",
    stat: "Gratis",
    statLabel: "Ongkir Surabaya",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-14 md:py-20 bg-white dark:bg-[#0f0b1a]" aria-labelledby="why-heading">
      <div className="container-custom">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-purple-900/40 dark:text-purple-300 text-xs font-bold tracking-wide uppercase mb-3">
            Keunggulan Kami
          </span>
          <h2 id="why-heading" className="font-heading text-3xl md:text-4xl text-gray-900 dark:text-white mb-3">
            Mengapa Memilih <span className="text-green-500 dark:text-purple-400">BESTI?</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            Toko baru, tim berpengalaman — hadir sejak 2025 dengan lebih dari 10 tahun keahlian di industri IT
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-white dark:bg-[#1a1625] border border-gray-100 dark:border-purple-900/30 hover:shadow-md dark:hover:shadow-purple-900/20 hover:border-green-200 dark:hover:border-purple-700/50 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`shrink-0 h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-200 ${feature.lightColor} ${feature.darkColor}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <div className="text-right shrink-0">
                      <p className="font-heading font-extrabold text-sm text-green-600 dark:text-purple-400">{feature.stat}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">{feature.statLabel}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
