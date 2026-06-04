import { Link } from "react-router-dom";
import { Star, ShieldCheck, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const perks = [
  { icon: Star, title: "Kumpulkan Poin", desc: "Setiap transaksi menghasilkan poin yang bisa ditukar diskon." },
  { icon: ShieldCheck, title: "Harga Member", desc: "Akses harga khusus dan penawaran eksklusif untuk member." },
  { icon: Gift, title: "Bonus Selamat Datang", desc: "Poin bonus langsung setelah mendaftar sebagai member." },
];

export function MemberBanner() {
  return (
    <section className="py-10 md:py-14" aria-labelledby="member-heading">
      <div className="container-custom">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0B1E35 0%, #0c2a4a 60%, #0a3d5c 100%)" }}
        >
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Left */}
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold border border-white/15">
                  <Star className="h-3 w-3 text-yellow-400" />
                  Program Loyalitas
                </span>
                <h2 id="member-heading" className="font-heading text-2xl md:text-3xl text-white font-extrabold leading-snug">
                  Daftar Member,{" "}
                  <span className="text-teal-400">Dapatkan Keuntungan Lebih</span>
                </h2>
                <p className="text-white/65 text-sm leading-relaxed max-w-md">
                  Bergabunglah sebagai member BESTI Computer dan nikmati program poin loyalitas — setiap pembelian membawa kamu lebih dekat ke diskon berikutnya.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button className="bg-[#22C55E] hover:bg-green-600 text-white font-bold px-6 h-auto py-2.5 rounded-lg" asChild>
                  <Link to="/member">
                    Daftar Gratis Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-white/25 text-white hover:bg-white/10 px-6 h-auto py-2.5 rounded-lg" asChild>
                  <Link to="/points">Cek Poin Saya</Link>
                </Button>
              </div>
            </div>

            {/* Right */}
            <div className="bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 p-8 md:p-12 flex flex-col justify-center gap-5">
              {perks.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{title}</p>
                    <p className="text-white/55 text-xs leading-relaxed mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
