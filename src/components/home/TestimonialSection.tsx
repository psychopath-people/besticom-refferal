import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sela Seli",
    company: "Google Maps · 6 bulan lalu",
    photo: "/foto-pelanggan-1.jpeg",
    rating: 5,
    text: "Pertama kali beli laptop disini, pelayanan sangat memuaskan, harga juga terjangkau.",
  },
  {
    name: "Stania Rizki",
    company: "Google Maps · 6 bulan lalu",
    photo: "/foto-pelanggan-2.jpeg",
    rating: 5,
    text: "Toko laptop terbaik yang pernah ada dengan harga yang terjangkau dan pelayanan yang sangat baik, sangat rekomended buat kalian yang lagi bingung mau nyari laptop dimana.",
  },
  {
    name: "Jefri Umbo",
    company: "Google Maps · 9 bulan lalu",
    photo: "/foto-pelanggan-3.jpeg",
    rating: 5,
    text: "Pertama kali beli laptop disini, pelayanan terbaik memuaskan harga juga sangat terjangkau.",
  },
];

export function TestimonialSection() {
  return (
    <section className="py-12 md:py-16 bg-[#f5f7fa] dark:bg-[#0d0b16]" aria-labelledby="testimonial-heading">
      <div className="container-custom">

        <div className="text-center mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
            <Star className="h-3 w-3 fill-green-600 text-green-600" />
            Dipercaya Pelanggan
          </span>
          <h2 id="testimonial-heading" className="font-heading text-2xl md:text-3xl font-bold text-[#0B1E35]">
            Kata Mereka tentang BESTI
          </h2>
          {/* Google Maps rating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Maps_icon.svg" alt="Google Maps" className="h-4 w-4" />
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <span className="text-sm font-bold text-gray-800">5.0</span>
            <span className="text-xs text-gray-400">· 50 ulasan di Google Maps</span>
          </div>
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
