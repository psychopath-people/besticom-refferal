import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat Toko",
    details: ["Mall IT Plasa Marina Lt.2 Blok G3-4", "Jl. Margorejo Indah, Sidosermo", "Kec. Wonocolo, Surabaya 60238"],
  },
  {
    icon: Phone,
    title: "Telepon / WhatsApp",
    details: ["0851-3598-5189"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["bestimarinasby@gmail.com"],
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    details: ["Senin – Minggu: 10.00 – 21.00 WIB", "Tersedia di Shopee: shopee.co.id/besticom"],
  },
];

const WA_NUMBER = "6285135985189";

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", category: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryLabels: Record<string, string> = {
      pengadaan: "Pengadaan IT",
      konsultasi: "Konsultasi Produk",
      penawaran: "Minta Penawaran",
      lainnya: "Lainnya",
    };
    const lines = [
      `Halo BESTI Computer, saya ingin menghubungi tim Anda.`,
      ``,
      `*Nama:* ${form.name || "-"}`,
      form.company ? `*Instansi:* ${form.company}` : null,
      `*Email:* ${form.email || "-"}`,
      `*Telepon:* ${form.phone || "-"}`,
      form.category ? `*Kebutuhan:* ${categoryLabels[form.category] || form.category}` : null,
      form.message ? `\n*Pesan:*\n${form.message}` : null,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-[#0B1E35] dark:bg-[#0d0b16] text-white">
        <div className="container-custom py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-green-400 dark:text-purple-300 text-xs font-semibold mb-4">
              Kontak
            </span>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">
              Hubungi Kami
            </h1>
            <p className="text-lg text-white/70">
              Siap membantu kebutuhan IT Anda. Kunjungi toko kami atau hubungi tim BESTI.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white dark:bg-[#0f0b1a]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-gray-500 dark:text-gray-400 text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <div className="p-6 rounded-xl bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-800/40">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Respon Cepat via WhatsApp
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Untuk respon tercepat, hubungi kami via WhatsApp.
                </p>
                <Button variant="whatsapp" className="w-full" asChild>
                  <a href="https://wa.me/6285135985189" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-[#1a1625] rounded-2xl border border-gray-100 dark:border-purple-900/30 p-8">
                <h2 className="font-heading text-2xl text-gray-900 dark:text-white mb-6">
                  Kirim Pesan
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nama Lengkap *
                      </label>
                      <Input
                        placeholder="Nama Anda"
                        required
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Perusahaan / Instansi
                      </label>
                      <Input
                        placeholder="Nama perusahaan (opsional)"
                        value={form.company}
                        onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="email@contoh.com"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nomor WhatsApp *
                      </label>
                      <Input
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        required
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Kategori Kebutuhan
                    </label>
                    <select
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-purple-900/40 bg-white dark:bg-[#13111c] text-gray-800 dark:text-gray-200 text-sm"
                      value={form.category}
                      onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    >
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
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    />
                  </div>
                  <Button type="submit" variant="whatsapp" size="lg" className="w-full sm:w-auto">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Kirim via WhatsApp
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foto Toko + Map */}
      <section id="location" className="pb-16">
        <div className="container-custom space-y-8">
          {/* Foto suasana toko */}
          <div>
            <h2 className="font-heading text-2xl text-gray-900 dark:text-white mb-6">
              Suasana Toko
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: "/foto-toko-depan.jpeg", label: "Tampak Depan", pos: "object-center" },
                { src: "/foto-toko-suasana.jpeg", label: "Suasana Toko", pos: "object-top" },
                { src: "/foto-pelanggan-2.jpeg", label: "Pelanggan Puas", pos: "object-top" },
                { src: "/foto-toko-dalam-2.jpeg", label: "Area Produk", pos: "object-top" },
              ].map((item) => (
                <div key={item.src} className="rounded-xl overflow-hidden border border-gray-200 dark:border-purple-900/30 shadow-sm">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={item.src} alt={item.label} className={`w-full h-full object-cover ${item.pos} hover:scale-105 transition-transform duration-500`} />
                  </div>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 py-2 px-1 bg-white dark:bg-[#1a1625]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="font-heading text-2xl text-gray-900 dark:text-white mb-6">
              Lokasi Toko
            </h2>
            <div className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=besticom%20plaza%20marina&maptype=roadmap"
                width="100%"
                height="650px"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi BESTI Computer - Plasa Marina Surabaya"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
