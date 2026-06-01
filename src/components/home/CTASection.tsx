import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-spacing bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground">
              Butuh Penawaran Khusus?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
              Tim BESTI siap membantu kebutuhan pengadaan IT Anda. 
              Konsultasi gratis untuk instansi, perusahaan, dan sekolah.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="accent" size="xl" asChild>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat WhatsApp
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a href="tel:+6281234567890">
                <Phone className="mr-2 h-5 w-5" />
                Hubungi Kami
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-4">
            <div className="text-center">
              <p className="font-heading text-3xl font-bold text-primary-foreground">1000+</p>
              <p className="text-sm text-primary-foreground/70">Produk Tersedia</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-3xl font-bold text-primary-foreground">500+</p>
              <p className="text-sm text-primary-foreground/70">Klien Puas</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-3xl font-bold text-primary-foreground">10+</p>
              <p className="text-sm text-primary-foreground/70">Tahun Pengalaman</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
