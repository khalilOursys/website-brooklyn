import React from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import Footer2 from "@/components/footers/Footer2";

import Header4 from "@/components/headers/Header4";
import Topbar1 from "@/components/headers/Topbar1";
import Header2 from "@/components/headers/Header2";
import Products from "@/components/shopDetails/Products";

// Function to fetch product data from the backend
async function getProductById(id) {
  const api = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${api}product-variants/getVariantWithProduct/${id}`); // Replace with your backend URL
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    const product = await response.json();

    const transformedData = {
      id: product.id,
      name: product.name,
      description: product.product.description || '',
      price: product.product.price,
      discount: product.product.discount,
      createdAt: product.createdAt || new Date().toISOString(),
      expiresAt: product.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      images: product.images,
      quantity: product.quantity || 1,
      idProduct: product.product.id,
      attributes: product.product.attributes,
      variants: product.product.variants,
      stock: product.stock,
      color: product.product.color,
      product: product.product,
      colorVar: product.color
    };
    return transformedData;
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
      <Topbar1 />
      <Header2 />
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
      <DetailsOuterZoom product={product} />
      <Products variants={product.variants} product={product.product} />
      {/* <ShopDetailsTab />
      <Products />
      <RecentProducts /> */}
      <Footer2 />
    </>
  );
}