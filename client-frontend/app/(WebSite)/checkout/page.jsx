import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Header4 from "@/components/headers/Header4";
import Topbar1 from "@/components/headers/Topbar1";
import Checkout from "@/components/othersPages/Checkout";
import React from "react";

export const metadata = {
  title: "Checkout || brooklyn-store",
  description: "brooklyn-store",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Commander</div>
        </div>
      </div>

      <Checkout />
      <Footer2 />
    </>
  );
}
