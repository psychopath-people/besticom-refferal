import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const features = [
  { icon: Shield, text: "Garansi Resmi" },
  { icon: Truck, text: "Pengiriman Cepat" },
  { icon: Headphones, text: "Konsultasi Gratis" },
];

const slides = [
  {
    badge: "Partner IT Terpercaya",
    title: "Solusi IT Terpercaya untuk",
    highlight: "Bisnis & Pendidikan",
    description:
      "Menyediakan laptop, PC, printer, dan aksesoris IT berkualitas dengan garansi resmi. Dipercaya oleh instansi, perusahaan, dan sekolah di seluruh Indonesia.",
    primaryCta: { label: "Lihat Katalog", href: "/products" },
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1400&q=80",
  },
  {
    badge: "Program Loyalty",
    title: "Belanja, Kumpulkan Poin,",
    highlight: "Tukar Hadiah",
    description:
      "Setiap transaksi di BESTI Computer memberikan poin loyalty yang bisa Anda redeem kapan saja. Cek poin Anda hanya dengan nomor telepon.",
    primaryCta: { label: "Cek Poin Saya", href: "/points" },
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80",
  },
  {
    badge: "Untuk Instansi & Sekolah",
    title: "Pengadaan IT Skala Besar,",
    highlight: "Mudah & Profesional",
    description:
      "Kami melayani pengadaan untuk instansi pemerintah, perusahaan, kampus, dan sekolah. Penawaran khusus, dokumentasi lengkap, after-sales terjamin.",
    primaryCta: { label: "Minta Penawaran", href: "/contact" },
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
  },
];

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[active];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24 lg:py-28">
          {/* Content (animated per slide) */}
          <div key={`copy-${active}`} className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium">
                {slide.badge}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight">
                {slide.title}{" "}
                <span className="text-accent">{slide.highlight}</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
                {slide.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="accent" size="xl" asChild>
                <Link to={slide.primaryCta.href}>
                  {slide.primaryCta.label}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat WhatsApp
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              {features.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-primary-foreground/70"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual carousel */}
          <div className="relative lg:pl-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-primary-foreground/10 shadow-elevated">
              {slides.map((s, i) => (
                <img
                  key={i}
                  src={s.image}
                  alt={s.highlight}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                    i === active ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

              {/* Slide controls */}
              <button
                type="button"
                onClick={() =>
                  setActive((i) => (i - 1 + slides.length) % slides.length)
                }
                aria-label="Sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                type="button"
                onClick={() => setActive((i) => (i + 1) % slides.length)}
                aria-label="Berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === active
                        ? "w-8 bg-accent"
                        : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/70"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
