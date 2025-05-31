import Footer2 from "@/components/footers/Footer2";
import Header0 from "@/components/headers/Header0";
import Header4 from "@/components/headers/Header4";
import PromotionSidebarleft from "@/components/shop/PromotionSidebarleft";
import ShopSidebarleft from "@/components/shop/ShopSidebarleft";

// ✅ Server-Side SEO Metadata
export async function generateMetadata({ params }) {
  const param = await params;
  const slug = param.slug;
  const title = `${slug} - Shop Now`;
  const description = `Browse our latest selection of ${slug}. Discover amazing deals and new arrivals.`;

  return {
    title,
    description,
  };
}

export default async function Page() {
  return (
    <>
      <Header4 />

      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">Nouveautés</div>
              <p className="text-center text-2 text_black-2 mt_5">
                Page des promotions
              </p>
            </div>
          </div>
        </div>
      </div>

      <PromotionSidebarleft />
      <Footer2 />
    </>
  );
}
