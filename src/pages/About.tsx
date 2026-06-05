import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Users, Award, Building2, MessageCircle } from "lucide-react";

const stats = [
  { value: "2025", label: "Tahun Berdiri" },
  { value: "10+", label: "Tahun Pengalaman Tim" },
  { value: "1000+", label: "Produk Tersedia" },
  { value: "50+", label: "Klien Instansi" },
];

const values = [
  {
    icon: Award,
    title: "Kualitas Terjamin",
    description: "Kami hanya menjual produk original dengan garansi resmi dari distributor terpercaya.",
    light: "bg-green-50 text-green-600",
    dark: "dark:bg-green-900/25 dark:text-green-400",
  },
  {
    icon: Users,
    title: "Layanan Personal",
    description: "Tim profesional siap membantu konsultasi kebutuhan IT Anda secara personal.",
    light: "bg-violet-50 text-violet-600",
    dark: "dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    icon: Building2,
    title: "Partner Terpercaya",
    description: "Dipercaya sebagai partner pengadaan IT oleh instansi pemerintah dan swasta.",
    light: "bg-green-50 text-green-600",
    dark: "dark:bg-green-900/25 dark:text-green-400",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[#0B1E35] dark:bg-[#0d0b16] text-white">
        <div className="container-custom py-14 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-green-400 dark:text-purple-300 text-xs font-semibold mb-4">
              Tentang Kami
            </span>
            <h1 className="font-heading text-4xl md:text-5xl mb-6">
              Tentang BESTI Computer
            </h1>
            <p className="text-lg text-white/75 leading-relaxed">
              BESTI Computer adalah toko IT di Plasa Marina Surabaya yang hadir sejak 2025 —
              dijalankan oleh tim berpengalaman lebih dari 10 tahun di industri komputer dan teknologi.
              Kami menghadirkan produk original bergaransi resmi dengan layanan konsultasi profesional untuk kebutuhan personal, bisnis, dan instansi.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50 dark:bg-[#0d0b16] border-b border-gray-200 dark:border-purple-900/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl font-bold text-green-500 dark:text-purple-400">{stat.value}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 md:py-20 bg-white dark:bg-[#0f0b1a]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl text-gray-900 dark:text-white mb-6">
                Cerita Kami
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  BESTI Computer lahir dari semangat tim yang sudah lebih dari 10 tahun berkecimpung
                  di industri komputer dan IT. Kami hadir di Plasa Marina Surabaya sejak 2025 dengan
                  satu visi: memberikan layanan IT terbaik yang selama ini hanya bisa dirasakan dari
                  toko besar — tapi dengan sentuhan personal.
                </p>
                <p>
                  Meski toko kami baru berdiri, pengalaman tim kami bukan hal baru. Kami sudah menangani
                  pengadaan IT untuk instansi pemerintah, perusahaan swasta, sekolah, dan kampus —
                  dan kini membawa semua pengalaman itu ke BESTI Computer.
                </p>
                <p>
                  Kami bekerja sama langsung dengan distributor resmi brand-brand ternama seperti
                  Lenovo, ASUS, HP, Acer, Axioo, dan Dell untuk memastikan setiap produk yang dijual
                  adalah original dan bergaransi resmi.
                </p>
              </div>
            </div>
            <div className="relative h-[380px] md:h-[460px] rounded-2xl overflow-hidden border border-gray-200 shadow-md">
              <img
                src="/foto-toko-suasana.jpeg"
                alt="Toko BESTI Computer Plaza Marina Surabaya"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-sm">BESTI Computer</p>
                <p className="text-white/70 text-xs">Plaza Marina Lt.2, Surabaya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 md:py-20 bg-gray-50 dark:bg-[#0d0b16]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl text-gray-900 dark:text-white mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Prinsip yang kami pegang teguh dalam melayani setiap pelanggan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white dark:bg-[#1a1625] rounded-xl p-6 border border-gray-100 dark:border-purple-900/30 hover:shadow-md dark:hover:shadow-purple-900/20 transition-shadow">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${value.light} ${value.dark}`}>
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tim Kami */}
      <section className="py-14 md:py-20 bg-white dark:bg-[#0f0b1a]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl text-gray-900 dark:text-white mb-4">
              Tim Kami
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Tim kami mungkin baru memulai BESTI, tapi pengalaman di industri IT sudah lebih dari 10 tahun
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-purple-900/30 shadow-sm">
              <img src="/foto-tim-4.jpeg" alt="Tim BESTI Computer" className="w-full h-96 object-cover object-top" />
              <div className="p-4 bg-white dark:bg-[#1a1625]">
                <p className="font-semibold text-gray-900 dark:text-white">Tim Sales & Konsultasi</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Berpengalaman 10+ tahun di industri IT</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-purple-900/30 shadow-sm">
              <img src="/foto-tim-1.jpeg" alt="Tim BESTI Computer" className="w-full h-96 object-cover object-top" />
              <div className="p-4 bg-white dark:bg-[#1a1625]">
                <p className="font-semibold text-gray-900 dark:text-white">Tim Teknis & After-Sales</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Garansi & servis produk terjamin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners / Instansi */}
      <section className="py-14 md:py-20 bg-gray-50 dark:bg-[#0d0b16]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl text-gray-900 dark:text-white mb-4">
              Dipercaya Instansi & Perusahaan
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Rekam jejak pengadaan IT untuk berbagai sektor
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {["Instansi Pemerintah", "Perusahaan Swasta", "Sekolah & Kampus", "UMKM & Startup"].map((type) => (
              <div key={type} className="p-5 rounded-xl bg-white dark:bg-[#1a1625] border border-gray-100 dark:border-purple-900/30 text-center shadow-sm">
                <Building2 className="h-8 w-8 text-green-500 dark:text-purple-400 mx-auto mb-3" />
                <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{type}</p>
              </div>
            ))}
          </div>
          {/* Event photos grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: "/foto-event-2.jpeg", label: "EduTalk by BESTI", pos: "object-top" },
              { src: "/foto-event-3.jpeg", label: "Workshop Robotik", pos: "object-center" },
              { src: "/foto-produk-axioo.jpeg", label: "Pengadaan Axioo AIO PC", pos: "object-center" },
              { src: "/foto-pengiriman.jpeg", label: "Pengiriman Bulk Order", pos: "object-center" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={item.src} alt={item.label} className={`w-full h-full object-cover ${item.pos} hover:scale-105 transition-transform duration-500`} />
                </div>
                <p className="text-[11px] text-center text-gray-500 py-1.5 px-1 bg-white">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Dokumentasi kegiatan EduTalk, penandatanganan MoU, dan kerja sama instansi mitra BESTI Computer
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-[#0B1E35] dark:bg-[#0d0b16]">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl text-white mb-4">
            Siap Bekerja Sama?
          </h2>
          <p className="text-white/65 mb-8 max-w-lg mx-auto">
            Hubungi tim BESTI untuk konsultasi kebutuhan IT Anda.
            Kami siap memberikan penawaran terbaik.
          </p>
          <Button className="bg-green-500 dark:bg-purple-600 hover:bg-green-600 dark:hover:bg-purple-700 text-white font-bold px-8 py-3 h-auto rounded-lg" asChild>
            <a href="https://wa.me/6285135985189" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Hubungi Kami
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
