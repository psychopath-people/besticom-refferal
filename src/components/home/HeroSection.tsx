import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, Headphones, ChevronLeft, ChevronRight, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const trustBadges = [
  { icon: Shield, text: "Garansi Resmi" },
  { icon: Truck, text: "Pengiriman Cepat" },
  { icon: Headphones, text: "Konsultasi Gratis" },
  { icon: Star, text: "Program Poin" },
];

const slides = [
  {
    badge: "Partner IT Terpercaya",
    title: "Solusi IT Terpercaya",
    highlight: "Bisnis & Pendidikan",
    description:
      "Laptop, PC, printer & aksesoris IT original bergaransi resmi. Dipercaya instansi, perusahaan, dan sekolah di Surabaya.",
    primaryCta: { label: "Lihat Produk", href: "/products" },
    secondaryCta: { label: "Tentang Kami", href: "/about" },
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1400&q=80",
  },
  {
    badge: "Program Loyalty Poin",
    title: "Belanja, Kumpulkan Poin,",
    highlight: "Tukar Diskon",
    description:
      "Setiap transaksi memberikan poin yang bisa ditukar diskon. Cek poin hanya dengan nomor telepon — tanpa aplikasi.",
    primaryCta: { label: "Cek Poin Saya", href: "/points" },
    secondaryCta: { label: "Daftar Member", href: "/member" },
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80",
  },
  {
    badge: "Sistem Referral",
    title: "Ajak Teman,",
    highlight: "Kita Berdua Dapat Poin",
    description:
      "Bagikan kode referral unikmu. Setiap teman yang daftar — kamu dapat bonus poin, temanmu dapat poin selamat datang.",
    primaryCta: { label: "Daftar & Dapat Kode", href: "/member" },
    secondaryCta: { label: "Pelajari Cara Kerja", href: "/points" },
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80",
  },
  {
    badge: "Pengadaan Instansi",
    title: "Pengadaan IT Skala Besar,",
    highlight: "Mudah & Terdokumentasi",
    description:
      "Melayani pengadaan untuk instansi pemerintah, kampus, dan perusahaan. SPK, dokumentasi lengkap, after-sales terjamin.",
    primaryCta: { label: "Minta Penawaran", href: "/contact" },
    secondaryCta: { label: "Lihat Layanan", href: "/about" },
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
  },
  {
    badge: "Flash Sale Mingguan",
    title: "Harga Spesial Tiap",
    highlight: "Rabu & Jumat",
    description:
      "Diskon produk pilihan setiap hari Rabu dan Jumat. Laptop, printer, dan aksesoris dengan harga terbaik. Stok terbatas.",
    primaryCta: { label: "Lihat Promo", href: "/products" },
    secondaryCta: { label: "Daftar Notifikasi", href: "/member" },
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80",
  },
];

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, [isPaused]);

  const slide = slides[active];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0B1E35 0%, #0c2a4a 60%, #0a3d5c 100%)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative py-12 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left: content */}
          <div key={`copy-${active}`} className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold border border-white/15">
                <Zap className="h-3 w-3 text-teal-400" />
                {slide.badge}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-[1.15]">
                {slide.title}{" "}
                <span className="text-teal-400">{slide.highlight}</span>
              </h1>
              <p className="text-white/70 text-base leading-relaxed max-w-lg">
                {slide.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-[#22C55E] hover:bg-green-600 text-white font-bold px-6 py-2.5 h-auto rounded-lg shadow"
                asChild
              >
                <Link to={slide.primaryCta.href}>
                  {slide.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10 px-6 py-2.5 h-auto rounded-lg"
                asChild
              >
                <Link to={slide.secondaryCta.href}>
                  {slide.secondaryCta.label}
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 border-t border-white/10">
              {trustBadges.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-white/55">
                  <Icon className="h-3.5 w-3.5 text-teal-400" />
                  <span className="text-xs font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === active ? "w-6 bg-green-400" : "w-1.5 bg-white/25 hover:bg-white/50"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/10]">
              {slides.map((s, i) => (
                <img
                  key={i}
                  src={s.image}
                  alt={s.highlight}
                  width={800}
                  height={500}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                    i === active ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E35]/60 via-transparent to-transparent" />

              <button
                type="button"
                onClick={() => setActive((i) => (i - 1 + slides.length) % slides.length)}
                aria-label="Slide sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow"
              >
                <ChevronLeft className="h-4 w-4 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => setActive((i) => (i + 1) % slides.length)}
                aria-label="Slide berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow"
              >
                <ChevronRight className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
