import Footer2 from "@/components/footers/Footer2";
import Header4 from "@/components/headers/Header4";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import Orders from "@/components/othersPages/dashboard/Orders";
import React from "react";

export const metadata = {
  title: "My Account Orders || brooklyn-store",
  description: "brooklyn-store",
};
export default function page() {
  return (
    <>
      <Header4 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Mes commandes</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <Orders />
            </div>
          </div>
        </div>
      </section>
      <Footer2 />
    </>
  );
}
