import Footer2 from "@/components/footers/Footer2";
import Hero from "@/components/homes/home-food/Hero";
import Brands from "@/components/common/Brands";
import Categories from "@/components/homes/home-accessories/Categories";
import Features from "@/components/common/Features";
import ProductsHome from "@/components/ProductsHome";
import Blogs from "@/components/blogs/Blogs";
import Header4 from "@/components/headers/Header4";

export const metadata = {
  title: "Home 1 || test",
  description: "brooklyn-store",
};
export default function Home() {
  return (
    <>
      {/* <Topbar1 />
      <Header0 /> */}
      <Header4 />
      <Hero />
      <Features bgColor="" />
      <Categories />
      {/* correct data product in this project (ProductsHome/fetchByCatagory/detailProduct ...) */}
      {/* modify the logic profile api BE/FE */}
      <ProductsHome />
      <Brands />
      {/* <ShopGram /> */}
      <Blogs />
      <Footer2 />
    </>
  );
}
