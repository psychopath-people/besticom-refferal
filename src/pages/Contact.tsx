import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat Toko",
    details: ["Plaza Marina Lt. 3 No. 42", "Jl. Margorejo Indah", "Surabaya 60238"],
  },
  {
    icon: Phone,
    title: "Telepon",
    details: ["+62 812-3456-7890", "+62 31-8765-4321"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@besticomputer.id", "sales@besticomputer.id"],
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    details: ["Senin - Jumat: 09:00 - 18:00", "Sabtu: 09:00 - 15:00", "Minggu: Tutup"],
  },
];

export default function Contact() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-custom section-spacing">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl mb-4">
              Hubungi Kami
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Siap membantu kebutuhan IT Anda. Kunjungi toko kami atau hubungi tim BESTI.
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <div className="p-6 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20">
                <h3 className="font-semibold text-foreground mb-2">
                  Respon Cepat via WhatsApp
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Untuk respon tercepat, hubungi kami via WhatsApp.
                </p>
                <Button variant="whatsapp" className="w-full" asChild>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-heading text-2xl text-foreground mb-6">
                  Kirim Pesan
                </h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nama Lengkap
                      </label>
                      <Input placeholder="Nama Anda" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Perusahaan / Instansi
                      </label>
                      <Input placeholder="Nama perusahaan (opsional)" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input type="email" placeholder="email@contoh.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nomor Telepon
                      </label>
                      <Input type="tel" placeholder="+62 812-xxxx-xxxx" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Kategori Kebutuhan
                    </label>
                    <select className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm">
                      <option value="">Pilih kategori</option>
                      <option value="pengadaan">Pengadaan IT</option>
                      <option value="konsultasi">Konsultasi Produk</option>
                      <option value="penawaran">Minta Penawaran</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Pesan
                    </label>
                    <Textarea 
                      placeholder="Jelaskan kebutuhan Anda..." 
                      rows={5}
                    />
                  </div>
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    Kirim Pesan
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="location" className="pb-16">
        <div className="container-custom">
          <h2 className="font-heading text-2xl text-foreground mb-6">
            Lokasi Toko
          </h2>
          <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-muted border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.6193855395!2d112.75!3d-7.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTgnMDAuMCJTIDExMsKwNDUnMDAuMCJF!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BESTI Computer Location"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
