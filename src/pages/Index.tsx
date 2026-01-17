import Header from '@/components/layout/Header';
import HeroBento from '@/components/home/HeroBento';
import CategoryBubbles from '@/components/home/CategoryBubbles';
import FlashSale from '@/components/home/FlashSale';
import ProductGrid from '@/components/home/ProductGrid';
import PromoSection from '@/components/home/PromoSection';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBento />
        <CategoryBubbles />
        <FlashSale />
        <ProductGrid />
        <PromoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
