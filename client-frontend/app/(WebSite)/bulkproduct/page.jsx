import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";
import ShopSidebarleft from "@/components/shop/ShopSidebarleft";

export default async function Page() {
  return (
    <>
      <Topbar1 />
      <Header2 />

      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">Nouveautés</div>
              <p className="text-center text-2 text_black-2 mt_5">
                Découvrez notre dernière sélection produit en gros
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
