import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MessageCircle, Phone, Shield, Truck, RotateCcw } from "lucide-react";

type BrandInfo = {
  brand: string;
  category: string;
  categoryLabel: string;
  description: string;
  highlights: string[];
  image: string;
  warranty: string;
};

const brandData: Record<string, BrandInfo> = {
  "lenovo-laptop": { brand: "Lenovo", category: "laptop", categoryLabel: "Laptop", description: "Lenovo dikenal dengan kualitas build yang andal dan lini ThinkPad legendaris untuk profesional. Pilihan tepat untuk produktivitas kantor, mobilitas, dan pengadaan instansi.", highlights: ["Lini bisnis (ThinkPad) & konsumer (IdeaPad, Yoga)", "Garansi resmi nasional", "After-sales luas di Indonesia"], image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1000", warranty: "Garansi Resmi Lenovo Indonesia" },
  "asus-laptop": { brand: "ASUS", category: "laptop", categoryLabel: "Laptop", description: "ASUS menawarkan pilihan terlengkap dari laptop everyday VivoBook, premium ZenBook, hingga gaming ROG/TUF. Ideal untuk berbagai kebutuhan dan budget.", highlights: ["Pilihan luas: VivoBook, ZenBook, ROG, TUF", "Performance per price terbaik di kelasnya", "Garansi resmi nasional"], image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1000", warranty: "Garansi Resmi ASUS Indonesia" },
  "acer-laptop": { brand: "Acer", category: "laptop", categoryLabel: "Laptop", description: "Acer menyediakan laptop dengan harga kompetitif dan spesifikasi mumpuni. Banyak dipilih untuk kebutuhan sekolah, kampus, dan kantor.", highlights: ["Cocok untuk pengadaan sekolah & kampus", "Lini Aspire, Swift, Predator", "Service center tersebar"], image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1000", warranty: "Garansi Resmi Acer Indonesia" },
  "hp-laptop": { brand: "HP", category: "laptop", categoryLabel: "Laptop", description: "HP menawarkan laptop bisnis ProBook & EliteBook yang tangguh untuk korporasi, serta lini Pavilion untuk konsumer.", highlights: ["Lini ProBook, EliteBook, Pavilion", "Standar build kualitas global", "Dukungan enterprise"], image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1000", warranty: "Garansi Resmi HP Indonesia" },
  "dell-laptop": { brand: "Dell", category: "laptop", categoryLabel: "Laptop", description: "Dell terkenal dengan lini Latitude untuk bisnis dan XPS untuk premium. Pilihan tepat untuk korporasi dan profesional kreatif.", highlights: ["Latitude untuk bisnis", "XPS untuk premium & creator", "Pro support nasional"], image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1000", warranty: "Garansi Resmi Dell Indonesia" },
  "msi-laptop": { brand: "MSI", category: "laptop", categoryLabel: "Laptop", description: "MSI fokus pada laptop performa tinggi untuk gaming, content creation, dan workstation profesional.", highlights: ["Spesialis gaming & creator", "Cooling system premium", "Lini Stealth, Raider, Creator"], image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1000", warranty: "Garansi Resmi MSI Indonesia" },

  "acer-pc": { brand: "Acer", category: "desktop", categoryLabel: "Desktop PC", description: "Desktop Acer untuk kebutuhan kantor dan lab komputer sekolah dengan harga ekonomis.", highlights: ["All-in-One & tower PC", "Cocok untuk lab sekolah", "Garansi resmi"], image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1000", warranty: "Garansi Resmi Acer Indonesia" },
  "hp-pc": { brand: "HP", category: "desktop", categoryLabel: "Desktop PC", description: "HP menyediakan desktop ProDesk & EliteDesk untuk lingkungan korporat yang menuntut keandalan.", highlights: ["ProDesk & EliteDesk", "Form factor lengkap (Tower, SFF, Mini)", "Manajemen IT enterprise"], image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=1000", warranty: "Garansi Resmi HP Indonesia" },
  "lenovo-pc": { brand: "Lenovo", category: "desktop", categoryLabel: "Desktop PC", description: "Desktop Lenovo ThinkCentre dirancang untuk produktivitas bisnis jangka panjang.", highlights: ["ThinkCentre untuk korporasi", "Build kualitas tinggi", "Dukungan enterprise"], image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=1000", warranty: "Garansi Resmi Lenovo Indonesia" },

  "hp-printer": { brand: "HP", category: "printer", categoryLabel: "Printer", description: "Printer HP LaserJet & DeskJet menjadi standar di banyak kantor karena kualitas cetak dan keandalannya.", highlights: ["LaserJet untuk kantor", "DeskJet & Smart Tank untuk rumah/UMKM", "Support driver luas"], image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1000", warranty: "Garansi Resmi HP Indonesia" },
  "canon-printer": { brand: "Canon", category: "printer", categoryLabel: "Printer", description: "Canon PIXMA & imageCLASS menawarkan kualitas cetak foto dan dokumen yang tajam, populer untuk rumah dan UMKM.", highlights: ["PIXMA untuk foto & dokumen", "imageCLASS untuk laser kantor", "Tinta original mudah didapat"], image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=1000", warranty: "Garansi Resmi Canon Indonesia" },
  "epson-printer": { brand: "Epson", category: "printer", categoryLabel: "Printer", description: "Epson EcoTank menjadi favorit dengan biaya cetak per lembar paling ekonomis berkat sistem ink tank original.", highlights: ["EcoTank: hemat tinta jangka panjang", "Cocok untuk volume cetak tinggi", "Garansi resmi nasional"], image: "https://images.unsplash.com/photo-1551636898-47668aa61de2?w=1000", warranty: "Garansi Resmi Epson Indonesia" },
  "brother-printer": { brand: "Brother", category: "printer", categoryLabel: "Printer", description: "Brother fokus pada printer multifungsi dan label printer untuk kebutuhan bisnis dan logistik.", highlights: ["Multifungsi (print, scan, copy, fax)", "Label printer untuk logistik", "Support driver enterprise"], image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=1000", warranty: "Garansi Resmi Brother Indonesia" },

  "logitech-acc": { brand: "Logitech", category: "accessories", categoryLabel: "Aksesoris", description: "Logitech menyediakan mouse, keyboard, headset, dan webcam berkualitas untuk produktivitas dan video conference.", highlights: ["Mouse, keyboard, webcam, headset", "Cocok untuk WFH & WFO", "Garansi resmi"], image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=1000", warranty: "Garansi Resmi Logitech" },
  "razer-acc": { brand: "Razer", category: "accessories", categoryLabel: "Aksesoris", description: "Razer adalah pilihan utama untuk gaming peripherals premium dengan build kualitas dan estetika ikonik.", highlights: ["Mouse & keyboard gaming", "Headset audio premium", "Lini lifestyle & gaming"], image: "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?w=1000", warranty: "Garansi Resmi Razer" },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = id ? brandData[id] : null;

  if (!product) {
    return (
      <Layout>
        <div className="container-custom section-spacing text-center">
          <h1 className="font-heading text-2xl mb-4">Brand tidak ditemukan</h1>
          <Button asChild>
            <Link to="/products">Kembali ke Katalog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const waMessage = `Halo BESTI, saya tertarik dengan ${product.categoryLabel} ${product.brand}. Mohon info tipe & penawarannya.`;

  return (
    <Layout>
      <div className="container-custom section-spacing">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/products" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Katalog
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.brand} — {product.categoryLabel}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={`${product.brand} ${product.categoryLabel}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Brand Info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                {product.categoryLabel}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl text-foreground mt-2">
                {product.brand}
              </h1>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Highlights */}
            <ul className="space-y-3">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="text-foreground">{h}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary to-brand-sky/40 border border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Hubungi tim BESTI untuk konsultasi tipe yang sesuai kebutuhan & penawaran terbaik.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="whatsapp" size="lg" className="flex-1" asChild>
                  <a
                    href={`https://wa.me/6285135985189?text=${encodeURIComponent(waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat untuk Penawaran
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="tel:+6285135985189">
                    <Phone className="mr-2 h-5 w-5" />
                    Telepon
                  </a>
                </Button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">Garansi Resmi</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">Free Ongkir*</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">Easy Return</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-sm font-medium text-accent">{product.warranty}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-primary text-primary-foreground text-center">
          <h3 className="font-heading text-2xl mb-3">
            Butuh bantuan memilih tipe yang tepat?
          </h3>
          <p className="text-primary-foreground/70 mb-6 max-w-lg mx-auto">
            Tim BESTI siap membantu konsultasi kebutuhan IT Anda. Hubungi kami untuk penawaran terbaik.
          </p>
          <Button variant="accent" size="lg" asChild>
            <a href="https://wa.me/6285135985189" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat Sekarang
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
