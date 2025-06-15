import React from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import Footer2 from "@/components/footers/Footer2";
import Configuration from "@/configuration";
import Header4 from "@/components/headers/Header4";
import DefaultShopDetailsNoZoom from "@/components/shopDetails/DefaultShopDetailsNoZoom";
import RecentProducts from "@/components/shopDetails/RecentProducts";

// Function to fetch product data from the backend
async function getProductById(id) {
  const api = Configuration.BACK_BASEURL;
  try {
    console.log(`${api}productBundles/getProductBundlesById/${id}`);

    const response = await fetch(`${api}productBundles/getProductBundlesById/${id}`); // Replace with your backend URL
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    const product = await response.json();
    const transformedData = {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.discount?.toString() || '0.00',
      createdAt: product.createdAt || new Date().toISOString(),
      expiresAt: product.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      images: [{
        id: `generated-${Math.random().toString(36).substring(2, 9)}`,
        productId: product.id,
        url: product.img || '/default-product-image.jpg',
        isPrimary: true
      }],
      quantity: product.quantity || 1,
      isPacks: 1,
      products: product.products // Added quickAdd flag for consistency
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

                {/* <span className="text">
                  {product.name ? product.name : "Product Name"}
                </span> */}
              </div>
              {/* <ProductSinglePrevNext currentId={product.id} /> */}
            </div>
          </div>
        </div>
        <div className="container">
          <h1>Product not found</h1>
          <Link href="/">Go back to home</Link>
        </div>
        <Footer2 />
      </>
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
      <DefaultShopDetailsNoZoom product={product} />
      <RecentProducts products={product.products} />
      {/* <ShopDetailsTab />
      <Products />
      */}
      <Footer2 />
    </>
  );
}