import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandPartners } from "@/components/home/BrandPartners";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandPartners />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseUs />
      <CTASection />
    </Layout>
  );
};

export default Index;
