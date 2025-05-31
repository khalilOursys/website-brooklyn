import Footer2 from "@/components/footers/Footer2";
import Header0 from "@/components/headers/Header0";
import Header4 from "@/components/headers/Header4";
import ShopSidebarleft from "@/components/shop/ShopSidebarleft";

export default async function Page() {
  return (
    <>
      <Header4 />

      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">New Arrival</div>
              <p className="text-center text-2 text_black-2 mt_5">
                Shop through our latest selection of bulk product
              </p>
            </div>
          </div>
        </div>
      </div>

      <ShopSidebarleft slug={"bulkproduct"} />
      <Footer2 />
    </>
  );
}
