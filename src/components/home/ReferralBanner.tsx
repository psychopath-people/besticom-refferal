import { Link } from "react-router-dom";
import { Gift, Share2, Star, ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ReferralBanner() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("BESTI-DEMO1234");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-10 md:py-14" aria-labelledby="referral-heading">
      <div className="container-custom">
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1E35 0%, #0a3a5e 50%, #0EA5E9 100%)" }}>
          <div className="grid lg:grid-cols-5 gap-0">

            {/* Left content — 3 cols */}
            <div className="lg:col-span-3 p-8 md:p-10 space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-teal-400" />
                </div>
                <h2 id="referral-heading" className="font-heading text-xl md:text-2xl text-white font-extrabold">
                  Ajak Teman, Kita Berdua Dapat Poin!
                </h2>
              </div>

              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                Bagikan kode referral unikmu ke teman. Setiap teman yang mendaftar sebagai member:
              </p>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 bg-white/8 rounded-lg px-4 py-2.5">
                  <Star className="h-4 w-4 text-yellow-400 shrink-0" />
                  <span className="text-white/90 text-sm">
                    Kamu dapat <strong className="text-yellow-300">+50 poin</strong> bonus
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/8 rounded-lg px-4 py-2.5">
                  <Star className="h-4 w-4 text-yellow-400 shrink-0" />
                  <span className="text-white/90 text-sm">
                    Temanmu dapat <strong className="text-yellow-300">+25 poin</strong> selamat datang
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/8 rounded-lg px-4 py-2.5">
                  <Share2 className="h-4 w-4 text-green-400 shrink-0" />
                  <span className="text-white/90 text-sm">
                    Share lewat WhatsApp, IG, atau langsung bagikan kode
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <Button
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/points">
                    Pelajari Sistem Poin
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: referral card — 2 cols */}
            <div className="lg:col-span-2 bg-white/6 border-t lg:border-t-0 lg:border-l border-white/10 p-8 md:p-10 flex flex-col justify-center space-y-4">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">Kode Referral Kamu</p>

              <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 shrink-0" />
                  <span className="font-heading font-bold text-white text-lg tracking-wider">BESTI-DEMO1234</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
                  aria-label={copied ? "Disalin!" : "Salin kode"}
                >
                  {copied
                    ? <Check className="h-4 w-4 text-green-400" />
                    : <Copy className="h-4 w-4 text-white/70" />
                  }
                </button>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <Button className="w-full bg-[#22C55E] hover:bg-green-600 text-white font-bold" asChild>
                  <a
                    href="https://wa.me/?text=Halo!%20Daftar%20di%20BESTI%20Computer%20Surabaya%20pakai%20kode%20referralku%20BESTI-DEMO1234%20dan%20dapat%20+25%20poin%20bonus!"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share ke WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to="/member">
                    Belum punya kode? Daftar gratis
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
