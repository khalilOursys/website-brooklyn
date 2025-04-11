import React from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import Footer2 from "@/components/footers/Footer2";
import Header22 from "@/components/headers/Header22";

// Function to fetch product data from the backend
async function getProductById(id) {
  try {
    const response = await fetch(`http://localhost:3001/products/getProductById/${id}`); // Replace with your backend URL
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
      title: "Product Not Found || Ecomus - Ultimate Nextjs Ecommerce Template",
      description: "Ecomus - Ultimate Nextjs Ecommerce Template",
    };
  }

  // Return dynamic metadata based on the product's name and description
  return {
    title: `${product.name} || Ecomus - Ultimate Nextjs Ecommerce Template`,
    description: product.description || "Ecomus - Ultimate Nextjs Ecommerce Template",
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
      <Header22 />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
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
      <DetailsOuterZoom product={product} />
      {/* <ShopDetailsTab />
      <Products />
      <RecentProducts /> */}
      <Footer2 />
    </>
  );
}