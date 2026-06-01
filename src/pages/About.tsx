import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Award, Building2, MessageCircle } from "lucide-react";

const stats = [
  { value: "10+", label: "Tahun Pengalaman" },
  { value: "500+", label: "Klien Puas" },
  { value: "1000+", label: "Produk Tersedia" },
  { value: "50+", label: "Partner Instansi" },
];

const values = [
  {
    icon: Award,
    title: "Kualitas Terjamin",
    description: "Kami hanya menjual produk original dengan garansi resmi dari distributor terpercaya.",
  },
  {
    icon: Users,
    title: "Layanan Personal",
    description: "Tim profesional siap membantu konsultasi kebutuhan IT Anda secara personal.",
  },
  {
    icon: Building2,
    title: "Partner Terpercaya",
    description: "Dipercaya sebagai partner pengadaan IT oleh instansi pemerintah dan swasta.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-custom section-spacing">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl mb-6">
              Tentang BESTI Computer
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              BESTI Computer adalah partner IT terpercaya yang menyediakan solusi lengkap untuk kebutuhan perangkat teknologi informasi. 
              Berdiri sejak 2014, kami berkomitmen memberikan produk berkualitas dan layanan terbaik untuk bisnis, 
              pendidikan, dan kebutuhan personal.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl font-bold text-accent">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl text-foreground mb-6">
                Cerita Kami
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  BESTI Computer didirikan dengan visi sederhana: membantu setiap orang dan organisasi 
                  mendapatkan perangkat IT yang tepat dengan harga terjangkau dan layanan profesional.
                </p>
                <p>
                  Berawal dari toko kecil di Plaza Marina Surabaya, kini BESTI telah menjadi partner 
                  pengadaan IT yang dipercaya oleh berbagai instansi pemerintah, perusahaan swasta, 
                  sekolah, dan universitas di seluruh Indonesia.
                </p>
                <p>
                  Kami bekerja sama langsung dengan distributor resmi brand-brand ternama seperti 
                  Lenovo, ASUS, HP, Acer, dan Dell untuk memastikan setiap produk yang dijual adalah 
                  original dan bergaransi resmi.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-primary/10">
                <div className="text-center p-8">
                  <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                  <p className="font-heading text-xl text-foreground">Plaza Marina Surabaya</p>
                  <p className="text-muted-foreground text-sm">Toko Fisik Kami</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-muted/30">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl text-foreground mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-muted-foreground">
              Prinsip yang kami pegang teguh dalam melayani setiap pelanggan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-xl p-6 border border-border card-hover">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl text-foreground mb-4">
              Partner Kami
            </h2>
            <p className="text-muted-foreground">
              Kami bekerja sama dengan instansi dan perusahaan terkemuka
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Instansi Pemerintah", "Perusahaan Swasta", "Sekolah & Kampus", "UMKM & Startup"].map((type) => (
              <div key={type} className="p-6 rounded-xl bg-muted/50 text-center">
                <Building2 className="h-8 w-8 text-accent mx-auto mb-3" />
                <p className="font-medium text-foreground">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl text-primary-foreground mb-4">
            Siap Bekerja Sama?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Hubungi tim BESTI untuk konsultasi kebutuhan IT Anda. 
            Kami siap memberikan penawaran terbaik.
          </p>
          <Button variant="accent" size="xl" asChild>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Hubungi Kami
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
