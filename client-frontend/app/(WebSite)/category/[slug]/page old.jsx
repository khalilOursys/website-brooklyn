import Footer1 from "@/components/footers/Footer1";
import Footer2 from "@/components/footers/Footer2";
import Header0 from "@/components/headers/Header0";
import Header2 from "@/components/headers/Header2";
import Header22 from "@/components/headers/Header22";
import Topbar1 from "@/components/headers/Topbar1";
import ShopSidebarleft from "@/components/shop/ShopSidebarleft";

// ✅ Server-Side Fetch Function
async function fetchCategory(slug) {
  try {
    const res = await fetch(`https://your-api.com/categories/${slug}`, {
      cache: "no-store", // Disable caching for fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch category: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null; // Return null if fetch fails
  }
}

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
  /* const category = await fetchCategory(params.slug); */
  const param = await params;
  const slug = param.slug;
  const category = null;
  return (
    <>
      <Header0 />

      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">New Arrival</div>
              <p className="text-center text-2 text_black-2 mt_5">
                Shop through our latest selection of {slug}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ShopSidebarleft slug={slug} />
      <Footer2 />
    </>
  );
}
