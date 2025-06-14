import Footer2 from "@/components/footers/Footer2";
import Hero from "@/components/homes/home-food/Hero";
import Brands from "@/components/common/Brands";
import Categories from "@/components/homes/home-accessories/Categories";
import Features from "@/components/common/Features";
import ProductsHome from "@/components/ProductsHome";
import Blogs from "@/components/blogs/Blogs";
import Header4 from "@/components/headers/Header4";
import ShopGram from "@/components/homes/home-accessories/ShopGram";

export const metadata = {
  title: "Home 1 || test",
  description: "brooklyn-store",
};
export default function Home() {
  return (
    <>
      <Header4 />
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
