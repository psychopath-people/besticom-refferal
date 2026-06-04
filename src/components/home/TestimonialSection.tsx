import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rizal & Keluarga",
    company: "Pelanggan Setia BESTI",
    photo: "/foto-pelanggan-2.jpeg",
    rating: 5,
    text: "Pelayanannya ramah banget, staff-nya sabar jelasin produk. Beli laptop buat anak sekolah, dikasih bonus tas BESTI juga. Puas banget!",
  },
  {
    name: "Andika & Teman",
    company: "Mahasiswa Surabaya",
    photo: "/foto-pelanggan-1.jpeg",
    rating: 5,
    text: "Harga bersaing, barang original dan bergaransi resmi. Sudah rekomendasiin BESTI ke banyak teman kampus. Wajib kesini!",
  },
  {
    name: "Budi & Tim",
    company: "Pengadaan IT Instansi",
    photo: "/foto-pelanggan-3.jpeg",
    rating: 5,
    text: "Pengadaan laptop untuk kantor berjalan lancar. Dokumentasi lengkap, after-sales responsif. BESTI jadi mitra IT terpercaya kami.",
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
                <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 border-2 border-green-200">
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover object-top" />
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
