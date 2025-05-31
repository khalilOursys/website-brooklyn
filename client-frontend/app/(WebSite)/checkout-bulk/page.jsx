import Footer2 from "@/components/footers/Footer2";
import Header4 from "@/components/headers/Header4";
import CheckoutBulk from "@/components/othersPages/CheckoutBulk";
import React from "react";

export const metadata = {
  title: "Checkout || brooklyn-store",
  description: "brooklyn-store",
};
export default function page() {
  return (
    <>
      <Header4 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Commander</div>
        </div>
      </div>

      <CheckoutBulk />
      <Footer2 />
    </>
  );
}
