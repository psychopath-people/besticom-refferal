import { Shield, Users, Clock, Award, Headphones, Truck } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Garansi Resmi",
    description: "Semua produk bergaransi resmi dari distributor. Klaim garansi mudah dan cepat.",
  },
  {
    icon: Users,
    title: "Partner Pengadaan",
    description: "Dipercaya sebagai partner pengadaan IT oleh instansi pemerintah, perusahaan, dan sekolah.",
  },
  {
    icon: Clock,
    title: "Layanan Cepat",
    description: "Respons cepat dalam 24 jam. Tim kami siap membantu konsultasi dan penawaran.",
  },
  {
    icon: Award,
    title: "Produk Berkualitas",
    description: "Hanya menjual produk original dari brand terpercaya dengan kualitas terjamin.",
  },
  {
    icon: Headphones,
    title: "Support Teknis",
    description: "Dukungan teknis profesional untuk instalasi, troubleshooting, dan maintenance.",
  },
  {
    icon: Truck,
    title: "Pengiriman Aman",
    description: "Pengiriman aman ke seluruh Indonesia dengan asuransi dan packaging khusus.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Mengapa Memilih BESTI?
          </h2>
          <p className="text-muted-foreground text-lg">
            Komitmen kami untuk memberikan solusi IT terbaik dengan layanan profesional
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="shrink-0">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
