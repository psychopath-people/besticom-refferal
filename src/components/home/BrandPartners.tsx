const brands = [
  { name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/2560px-Lenovo_logo_2015.svg.png" },
  { name: "ASUS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png" },
  { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png" },
  { name: "Acer", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/2560px-Acer_2011.svg.png" },
  { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/2048px-Dell_Logo.svg.png" },
];

export function BrandPartners() {
  return (
    <section className="py-12 bg-muted/30 border-y border-border">
      <div className="container-custom">
        <div className="flex flex-col items-center gap-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Dipercaya sebagai Partner Resmi
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {brands.map((brand) => (
              <div 
                key={brand.name} 
                className="flex items-center justify-center h-10 transition-all duration-200 grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-6 md:h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
