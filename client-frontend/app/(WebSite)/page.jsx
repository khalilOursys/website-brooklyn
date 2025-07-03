import Footer2 from "@/components/footers/Footer2";
import Hero from "@/components/homes/home-food/Hero";
import Brands from "@/components/common/Brands";
import Categories from "@/components/homes/home-accessories/Categories";
import Features from "@/components/common/Features";
import ProductsHome from "@/components/ProductsHome";
import ShopGram from "@/components/homes/home-accessories/ShopGram";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";

export const metadata = {
  title: "brooklyn-store",
  description: "brooklyn-store",
};
export default function Home() {
  return (
    <>
      {/* <Header4 /> */}
      <Topbar1 />
      <Header2 />
      <Hero />
      <Features bgColor="" />
      <Categories />
      <ProductsHome />
      <Brands />
      <ShopGram />
      <Footer2 />
    </>
  );
}
