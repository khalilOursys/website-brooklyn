import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Header4 from "@/components/headers/Header4";
import Topbar1 from "@/components/headers/Topbar1";
import RegisterBulkClient from "@/components/othersPages/RegisterBulkClient";
import React from "react";

export const metadata = {
  title: "Register || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Register</div>
        </div>
      </div>

      <RegisterBulkClient />
      <Footer2 />
    </>
  );
}
