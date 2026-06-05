const brands = [
  { name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/2560px-Lenovo_logo_2015.svg.png" },
  { name: "ASUS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png" },
  { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png" },
  { name: "Acer", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/2560px-Acer_2011.svg.png" },
  { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/2048px-Dell_Logo.svg.png" },
  { name: "MSI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/MSI_Logo.svg/2560px-MSI_Logo.svg.png" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Intel_logo_2023.svg/1200px-Intel_logo_2023.svg.png" },
  { name: "AMD", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/1200px-AMD_Logo.svg.png" },
  { name: "Axioo", logo: "https://axioo.com/wp-content/uploads/2021/03/axioo-logo.png" },
  { name: "Zyrex", logo: "https://zyrex.com/wp-content/uploads/2020/09/logo-zyrex.png" },
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
                className="flex items-center justify-center h-12 shrink-0 px-4"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-7 md:h-9 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  width={120}
                  height={36}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
