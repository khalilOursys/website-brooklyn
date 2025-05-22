import { products1 } from "@/data/products";
import React from "react";
import { ProductCard } from "../shopCards/ProductCard";
import Productcard23 from "../shopCards/Productcard23";
import { ProductBulkCard } from "../shopCards/ProductBulkCard";
import ProductBulkListCard from "../shopCards/ProductBulkListCard";
export default function ProductGrid({
  gridItems = 4,
  allproducts = products1,
  slug
}) {

  return (
    <>
      <div
        style={{
          width: "fit-content",
          margin: "0  auto",
          fontSize: "17px",
          marginBottom: "24px",
        }}
      >
        {allproducts.length} product(s) found
      </div>
      {gridItems == 1 ? (
        <div className="grid-layout" data-grid="grid-list">
          {/* card product 1 */}
          {/* add new card for bulk product */}
          {allproducts.map((elm, i) => (
            slug === "bulkproduct" ? (
              <ProductBulkListCard product={elm} key={i} slug={slug} />
            ) : (
              <Productcard23 product={elm} key={i} slug={slug} />
            )
          ))}
          {/* card product 2 */}
        </div>
      ) : (
        <div
          className="grid-layout wrapper-shop"
          data-grid={`grid-${gridItems}`}
        >
          {/* card product 1 */}
          {/* add new card for bulk product */}
          {allproducts.map((elm, i) => (
            slug === "bulkproduct" ? (
              <ProductBulkCard product={elm} key={i} slug={slug} />
            ) : (
              <ProductCard product={elm} key={i} slug={slug} />
            )
          ))}
        </div>
      )}
    </>
  );
}