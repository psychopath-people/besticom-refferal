import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "1000+", label: "Produk Tersedia" },
  { value: "500+", label: "Klien Puas" },
  { value: "10+", label: "Tahun Pengalaman" },
  { value: "50+", label: "Instansi Partner" },
];

const benefits = [
  "Garansi resmi dari distributor resmi",
  "Konsultasi kebutuhan IT secara gratis",
  "Pengiriman aman ke seluruh Indonesia",
  "Program poin & referral eksklusif member",
];

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-[#0B1E35] dark:bg-[#0d0b16]" aria-labelledby="cta-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 id="cta-heading" className="font-heading text-3xl md:text-4xl text-white font-bold leading-tight">
                Butuh Solusi IT untuk<br />
                <span className="text-teal-400 dark:text-purple-400">Bisnis Anda?</span>
              </h2>
              <p className="text-white/70 text-base max-w-lg">
                Tim BESTI siap membantu kebutuhan pengadaan IT. Penawaran khusus untuk instansi pemerintah, perusahaan, kampus & sekolah.
              </p>
            </div>

            <ul className="space-y-2.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                  <span className="text-white/80 text-sm">{b}</span>
                </li>
              ))}
            </ul>

            {/* Single WA button — one clear CTA */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                className="bg-[#22C55E] hover:bg-green-600 text-white font-bold px-6 py-2.5 h-auto rounded-lg"
                asChild
              >
                <a href="https://wa.me/6285135985189?text=Halo%20BESTI,%20saya%20ingin%20konsultasi%20kebutuhan%20IT" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Konsultasi via WhatsApp
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10 px-6 py-2.5 h-auto rounded-lg"
                asChild
              >
                <a href="tel:+6285135985189">
                  <Phone className="mr-2 h-4 w-4" />
                  Telepon Kami
                </a>
              </Button>
            </div>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/8 dark:bg-purple-900/20 border border-white/10 dark:border-purple-900/40 rounded-xl p-5 text-center"
              >
                <p className="font-heading text-3xl font-extrabold text-white tabular mb-1">
                  {stat.value}
                </p>
                <p className="text-white/55 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
