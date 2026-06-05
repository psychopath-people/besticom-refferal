const brands = [
  { name: "Lenovo — Partner Resmi BESTI Computer Surabaya", logo: "/Lenovo_Global_Corporate_Logo.png" },
  { name: "ASUS — Laptop & PC Resmi di BESTI Computer Surabaya", logo: "/asus-6630-logo-png-transparent.png" },
  { name: "HP — Printer & Laptop Resmi di BESTI Computer Surabaya", logo: "/HP_logo_2012.svg.png" },
  { name: "Acer — Partner Resmi BESTI Computer Surabaya", logo: "/Logo_Acer.png" },
  { name: "Dell — Partner Resmi BESTI Computer Surabaya", logo: "/Dell_Logo.svg.png" },
  { name: "MSI — Gaming & Laptop Resmi di BESTI Computer Surabaya", logo: "/png-clipart-laptop-msi-logo-video-game-laptop-electronics-computer-thumbnail.png" },
  { name: "Intel — Prosesor Resmi di BESTI Computer Surabaya", logo: "/Intel_logo_(2006-2020).svg" },
  { name: "AMD — Prosesor & GPU Resmi di BESTI Computer Surabaya", logo: "/AMD_Logo.png" },
  { name: "Axioo — Laptop Lokal Resmi di BESTI Computer Surabaya", logo: "/Logo_Axioo_Baru.png" },
  { name: "Zyrex — Laptop Lokal Resmi di BESTI Computer Surabaya", logo: "/lg-6603c25487b89-Zyrex.webp" },
];

export function BrandPartners() {
  return (
    <section className="py-10 bg-gray-50 dark:bg-[#0d0b16] border-y border-gray-200 dark:border-purple-900/20 overflow-hidden" aria-label="Brand partner kami">
      <div className="container-custom mb-5">
        <p className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Partner Resmi Brand Terpercaya
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 dark:from-[#0d0b16] to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 dark:from-[#0d0b16] to-transparent z-10 pointer-events-none" aria-hidden="true" />

        <div className="overflow-hidden">
          <div className="marquee-track" aria-hidden="true">
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="flex items-center justify-center shrink-0 px-6"
              >
                <div className="w-24 h-10 flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-8 max-w-[88px] w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
