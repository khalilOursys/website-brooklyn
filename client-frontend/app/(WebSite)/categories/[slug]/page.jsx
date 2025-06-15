// app/shop/[slug]/page.tsx
import Footer2 from "@/components/footers/Footer2";
import Header4 from "@/components/headers/Header4";
import ParentSidebarleft from "@/components/shop/ParentSidebarleft";
import ShopSidebarleft from "@/components/shop/ShopSidebarleft";
import Configuration from "@/configuration";


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

export default async function Page({ params }) {
  const param = await params;
  const slug = param.slug;

  const api = Configuration.BACK_BASEURL;
  const res = await fetch(`${api}categories/getCategoryBySlug/${slug}`, {
    cache: "no-store", // so it fetches fresh data each time
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category data");
  }

  const category = await res.json();
  const backgroundImage = category?.bgUrl; // example field name, adjust if it's different

  return (
    <>
      <Header4 />

      <div
        className="tf-page-title cat-page"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          /*  backgroundSize: "cover",
           backgroundPosition: "center", */
        }}
      >
        <div className="cat-title">
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <div className="heading text-center">Nouveautés</div>
                <p className="text-center text-2 text_black-2 mt_5">
                  Découvrez notre dernière sélection de {slug}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ParentSidebarleft slug={slug} />
      <Footer2 />
    </>
  );
}
