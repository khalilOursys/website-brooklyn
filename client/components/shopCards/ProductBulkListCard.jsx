"use client";
import React from "react";
import Image from "next/image";
export default function ProductBulkListCard({ product }) {
  return (
    <div className="card-product list-layout">
      <div className="card-product-wrapper">
        <a href={`/product-bulk-detail/${product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            alt="image-product"
            src={product.product.images[0].url}
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            alt="image-product"
            src={
              product.product.images[1] ? product.product.images[1].url : product.product.images[0].url
            }
            width={720}
            height={1005}
          />
        </a>
      </div>
      <div className="card-product-info">
        <a href={`/product-bulk-detail/${product.id}`} className="title link">
          {product.name}
        </a>
        <span className="price">{product.bulkPrice.toFixed(3)} TND</span>
        <p className="description">
          {product.description}
        </p>
      </div>
    </div>
  );
}
