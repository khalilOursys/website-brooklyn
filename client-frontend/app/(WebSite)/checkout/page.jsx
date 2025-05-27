import Footer1 from "@/components/footers/Footer1";
import Footer2 from "@/components/footers/Footer2";
import Header0 from "@/components/headers/Header0";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";
import Checkout from "@/components/othersPages/Checkout";
import React from "react";

export const metadata = {
  title: "Checkout || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header0 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Check Out</div>
        </div>
      </div>

      <Checkout />
      <Footer2 />
    </>
  );
}
