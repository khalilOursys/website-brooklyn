import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";
import CartBulk from "@/components/othersPages/CartBulk";
import React from "react";

export const metadata = {
  title: "Voir le panier || brooklyn-store",
  description: "brooklyn-store",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header2 />
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
