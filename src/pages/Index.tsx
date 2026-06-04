import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandPartners } from "@/components/home/BrandPartners";
import { CategorySection } from "@/components/home/CategorySection";
import { MemberBanner } from "@/components/home/MemberBanner";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { CTASection } from "@/components/home/CTASection";
import { PoinFloatingWidget } from "@/components/poin/PoinFloatingWidget";

const SITE_URL = "https://besticomputer.id";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>BESTI Computer | Toko Laptop & IT Terpercaya Plaza Marina Surabaya</title>
        <meta
          name="description"
          content="BESTI Computer – toko laptop, PC, printer & aksesoris IT terlengkap di Plaza Marina Surabaya. Produk original bergaransi resmi. Program poin loyalitas & referral. Melayani instansi & perusahaan."
        />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="BESTI Computer | Laptop, PC & IT Solution Surabaya" />
        <meta
          property="og:description"
          content="Toko komputer terpercaya di Plaza Marina Surabaya. Laptop, PC, printer, aksesoris original bergaransi. Program poin loyalitas & sistem referral."
        />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "BESTI Computer – Beranda",
          "url": SITE_URL,
          "description": "Toko komputer & IT solution terpercaya di Plaza Marina Surabaya",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Beranda", "item": SITE_URL }]
          }
        })}</script>
      </Helmet>

      <Layout>
        <HeroSection />
        <BrandPartners />
        <CategorySection />
        <MemberBanner />
        <WhyChooseUs />
        <TestimonialSection />
        <CTASection />
      </Layout>

      <PoinFloatingWidget />
    </>
  );
};

export default Index;
