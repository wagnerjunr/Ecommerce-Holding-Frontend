import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";
import { ProductBanner } from "@/components/Product/ProductBanner";
import { ProductCarousel } from "@/components/Product/ProductCarousel";
import { ProductList } from "@/components/Product/ProductList";

export const HomePage = () => {
  return(
    <PageLayout>
      <div className="space-y-8">
        <ProductBanner />
        <ProductCarousel/>
        <ProductList/>
      </div>
    </PageLayout>
  )
};