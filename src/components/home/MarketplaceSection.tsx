const marketplaces = [
  {
    name: "Shopee",
    href: "https://shopee.co.id/besticom",
    logo: "/shopee.png",
  },
  {
    name: "Tokopedia",
    href: "https://www.tokopedia.com/besti-com",
    logo: "/tokopedia.png",
  },
  {
    name: "SIPLah",
    href: null,
    logo: "/siplah.png",
  },
  {
    name: "Mbizmarket",
    href: null,
    logo: "/mbizmarket.png",
  },
  {
    name: "INAPROC",
    href: null,
    logo: "/inaproc.png",
  },
  {
    name: "PaDi UMK",
    href: null,
    logo: "/padi-umkm.png",
  },
];

const cardClass = "flex items-center justify-center w-[calc(50%-8px)] sm:w-44 h-20 bg-white rounded-2xl border border-gray-200 shadow-sm p-4";

export function MarketplaceSection() {
  return (
    <section className="py-12 md:py-16 bg-white" aria-labelledby="marketplace-heading">
      <div className="container-custom">
        <div className="text-center mb-10 space-y-2">
          <span className="inline-block px-4 py-1 rounded-full border border-blue-200 text-blue-600 text-xs font-semibold">
            Marketplace
          </span>
          <h2 id="marketplace-heading" className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
            Belanja di Marketplace Kami
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {marketplaces.map((mp) => {
            const img = (
              <img
                src={mp.logo}
                alt={mp.name}
                className="max-h-10 max-w-full w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const span = document.createElement("span");
                    span.className = "text-sm font-semibold text-gray-600";
                    span.textContent = mp.name;
                    parent.appendChild(span);
                  }
                }}
              />
            );

            return mp.href ? (
              <a
                key={mp.name}
                href={mp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={mp.name}
                className={`${cardClass} hover:shadow-md hover:border-gray-300 transition-all group`}
              >
                {img}
              </a>
            ) : (
              <div key={mp.name} className={`${cardClass} hover:shadow-md hover:border-gray-300 transition-all group`}>
                {img}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
