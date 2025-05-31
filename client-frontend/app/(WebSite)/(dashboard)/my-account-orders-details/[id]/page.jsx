"use client"; // Mark this as a Client Component

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import Footer2 from "@/components/footers/Footer2";
import Header22 from "@/components/headers/Header22";
import Header2 from "@/components/headers/Header2";
import Footer1 from "@/components/footers/Footer1";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import OrderDetails from "@/components/othersPages/dashboard/OrderDetails";
import { useParams } from "next/navigation";
import Configuration from "@/configuration";
import Header4 from "@/components/headers/Header4";

export default function OrderPage() {
  const { id } = useParams(); // Use `useParams` if you're using dynamic routes
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = Configuration.BACK_BASEURL;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        `${api}orders/getOrderById/${id}`
        const response = await fetch(`${api}orders/getOrderById/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch order: ${response.statusText}`);
        }

        const orderData = await response.json();
        setOrder(orderData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <Header2 />
        <div className="tf-page-title">
          <div className="container-full">
            <div className="heading text-center">Loading Order...</div>
          </div>
        </div>
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer1 />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Header2 />
        <div className="tf-page-title">
          <div className="container-full">
            <div className="heading text-center">Error Loading Order</div>
          </div>
        </div>
        <div className="container py-5 text-center">
          <div className="alert alert-danger">{error}</div>
          <Link href="/" className="btn btn-primary">
            Go back to home
          </Link>
        </div>
        <Footer1 />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container">
        <Header2 />
        <div className="tf-page-title">
          <div className="container-full">
            <div className="heading text-center">Order Not Found</div>
          </div>
        </div>
        <div className="container py-5 text-center">
          <p>The requested order could not be found.</p>
          <Link href="/" className="btn btn-primary">
            Go back to home
          </Link>
        </div>
        <Footer1 />
      </div>
    );
  }

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
              <OrderDetails order={order} />
            </div>
          </div>
        </div>
      </section>
      <Footer2 />
    </>
  );
}