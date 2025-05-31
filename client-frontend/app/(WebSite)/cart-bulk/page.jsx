import Footer2 from "@/components/footers/Footer2";
import Header0 from "@/components/headers/Header0";
import Header4 from "@/components/headers/Header4";
import CartBulk from "@/components/othersPages/CartBulk";
import React from "react";

export const metadata = {
  title: "Voir le panier || brooklyn-store",
  description: "brooklyn-store",
};
export default function page() {
  return (
    <>
      <Header4 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Panier</div>
        </div>
      </div>

      <CartBulk />
      <Footer2 />
    </>
  );
}
