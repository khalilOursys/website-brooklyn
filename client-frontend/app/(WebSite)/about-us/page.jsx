import About from "@/components/othersPages/about/About";
import FlatTitle from "@/components/othersPages/about/FlatTitle";
import ShopGram from "@/components/homes/home-accessories/ShopGram";
import React from "react";
import Footer2 from "@/components/footers/Footer2";
import Topbar1 from "@/components/headers/Topbar1";
import Header2 from "@/components/headers/Header2";

export const metadata = {
  title: "About Us || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header2 />
      <FlatTitle />
      <div className="container">
        <div className="line"></div>
      </div>
      <About />
      {/* <Features />
      <Testimonials /> */}
      <div className="container">
        <div className="line"></div>
      </div>
      <ShopGram />
      <Footer2 />
    </>
  );
}
