import Footer2 from "@/components/footers/Footer2";
import Header4 from "@/components/headers/Header4";
import Cart from "@/components/othersPages/Cart";
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

      <Cart />
      <Footer2 />
    </>
  );
}
