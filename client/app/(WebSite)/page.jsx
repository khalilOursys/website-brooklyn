import Footer2 from "@/components/footers/Footer2";
import Hero from "@/components/homes/home-food/Hero";
import Brands from "@/components/common/Brands";
import ShopGram from "@/components/homes/home-accessories/ShopGram";
import Categories from "@/components/homes/home-accessories/Categories";
import Features from "@/components/common/Features";
import Header0 from "@/components/headers/Header0";
import Topbar1 from "@/components/headers/Topbar1";
import ProductsHome from "@/components/ProductsHome";

export const metadata = {
  title: "Home 1 || test",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function Home() {
  return (
    <>
      <Topbar1 />
      <Header0 />
      <Hero />
      <Features bgColor="" />
      <Categories />
      {/* correct data product in this project (ProductsHome/fetchByCatagory/detailProduct ...) */}
      {/* modify the logic profile api BE/FE */}
      <ProductsHome />
      <Brands />
      <ShopGram />
      <Footer2 />
    </>
  );
}
