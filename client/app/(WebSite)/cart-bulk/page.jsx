import Footer2 from "@/components/footers/Footer2";
import Header0 from "@/components/headers/Header0";
import CartBulk from "@/components/othersPages/CartBulk";
import React from "react";

export const metadata = {
  title: "View Cart || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <Header0 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Shopping Cart</div>
        </div>
      </div>

      <CartBulk />
      <Footer2 />
    </>
  );
}
