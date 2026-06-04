import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Staff IT",
    company: "PT. Maju Bersama Surabaya",
    initials: "MI",
    rating: 5,
    text: "Pelayanan cepat, produk original, harga bersaing. Sudah 3 tahun berlangganan untuk pengadaan IT kantor.",
  },
  {
    name: "Kepala Lab Komputer",
    company: "SMKN 5 Surabaya",
    initials: "KL",
    rating: 5,
    text: "Pengadaan 30 unit PC untuk lab berjalan lancar. Dokumentasi SPK lengkap, garansi resmi, dan after-sales sangat responsif.",
  },
  {
    name: "Procurement Manager",
    company: "CV. Karya Mandiri",
    initials: "PM",
    rating: 5,
    text: "Sudah beberapa kali order laptop untuk karyawan baru. Prosesnya mudah, harga kompetitif, dan barang selalu sampai tepat waktu.",
  },
];

export function TestimonialSection() {
  return (
    <section className="py-12 md:py-16 bg-[#f5f7fa] dark:bg-[#0d0b16]" aria-labelledby="testimonial-heading">
      <div className="container-custom">

        <div className="text-center mb-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-purple-900/40 dark:text-purple-300 text-xs font-semibold">
            <Star className="h-3 w-3 fill-green-600 text-green-600 dark:fill-purple-400 dark:text-purple-400" />
            Dipercaya Pelanggan
          </span>
          <h2 id="testimonial-heading" className="font-heading text-2xl md:text-3xl font-bold text-[#0B1E35] dark:text-white">
            Kata Mereka tentang BESTI
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            Instansi, perusahaan, dan sekolah di Surabaya telah mempercayakan kebutuhan IT mereka kepada kami.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.company}
              className="bg-white dark:bg-[#1a1625] rounded-2xl border border-gray-100 dark:border-purple-900/30 shadow-sm hover:shadow-md dark:hover:shadow-purple-900/20 p-6 flex flex-col gap-4 transition-shadow"
            >
              <Quote className="h-6 w-6 text-teal-400 dark:text-purple-400 fill-teal-50 dark:fill-purple-900/20" />

              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-1">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-purple-900/30">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg, #0B1E35, #0EA5E9)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{t.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
