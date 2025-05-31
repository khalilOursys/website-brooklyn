import React from "react";
import Link from "next/link";
import Footer2 from "@/components/footers/Footer2";
import Header22 from "@/components/headers/Header22";
import DetailsBulkProduct from "@/components/shopDetails/DetailsBulkProduct";
import Configuration from "@/configuration";
import Header4 from "@/components/headers/Header4";

// Function to fetch product data from the backend
async function getProductById(id) {
  const api = Configuration.BACK_BASEURL;
  try {
    const response = await fetch(`${api}bulkProducts/getBulkProductById/${id}`); // Replace with your backend URL
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Generate dynamic metadata based on the product data
export async function generateMetadata({ params }) {
  const { id } = await params;

  // Fetch the product data from the backend
  const product = await getProductById(id);

  // If the product is not found, return default metadata
  if (!product) {
    return {
      title: "Product Not Found || brooklyn-store",
      description: "brooklyn-store",
    };
  }

  // Return dynamic metadata based on the product's name and description
  return {
    title: `${product.name} || brooklyn-store`,
    description: product.description || "brooklyn-store",
  };
}

export default async function page({ params }) {
  const { id } = await params;

  // Fetch the product data from the backend
  const product = await getProductById(id);

  // If the product is not found, display a fallback or redirect
  if (!product) {
    return (
      <div className="container">
        <h1>Product not found</h1>
        <Link href="/">Go back to home</Link>
      </div>
    );
  }

  return (
    <>
      <Header4 />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">

                Accueil
              </Link>
              <i className="icon icon-arrow-right" />

              <span className="text">
                {product.name ? product.name : "Product Name"}
              </span>
            </div>
            {/* <ProductSinglePrevNext currentId={product.id} /> */}
          </div>
        </div>
      </div>
      <DetailsBulkProduct product={product} />
      {/* <ShopDetailsTab />
      <Products />
      <RecentProducts /> */}
      <Footer2 />
    </>
  );
}