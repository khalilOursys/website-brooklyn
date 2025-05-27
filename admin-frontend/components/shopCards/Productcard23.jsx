"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
export default function Productcard23({ product }) {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);
  const { setQuickViewItem } = useContextElement();
  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();
  return (
    <div className="card-product list-layout">
      <div className="card-product-wrapper">
        <a href="#" className="product-img">
          <Image
            className="lazyload img-product"
            alt="image-product"
            src={product.images[0].url}
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            alt="image-product"
            src={
              product.images[1] ? product.images[1].url : product.images[0].url
            }
            width={720}
            height={1005}
          />
        </a>
      </div>
      <div className="card-product-info">
        <a href="#" className="title link">
          {product.name}
        </a>
        <span className="price">{product.price.toFixed(3)} TND</span>
        <p className="description">
          {product.description}
        </p>
        {/* {product.colors && (
          <ul className="list-color-product">
            {product.colors.map((color) => (
              <li
                className={`list-color-item color-swatch ${currentImage == color.imgSrc ? "active" : ""
                  } `}
                onMouseOver={() => setCurrentImage(color.imgSrc)}
                key={color.name}
              >
                <span className="tooltip">{color.name}</span>
                <span className={`swatch-value ${color.colorClass}`} />
                <Image
                  className="lazyload"
                  data-src={color.imgSrc}
                  src={color.imgSrc}
                  alt="image-product"
                  width={720}
                  height={1005}
                />
              </li>
            ))}
          </ul>
        )} */}
        <div className="list-product-btn">
          <a
            href="#quick_add"
            onClick={() => setQuickAddItem(product)}
            data-bs-toggle="modal"
            className="box-icon quick-add style-3 hover-tooltip"
          >
            <span className="icon icon-bag" />
            <span className="tooltip">Quick add</span>
          </a>
          <a
            href="#quick_view"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon quickview style-3 hover-tooltip"
          >
            <span className="icon icon-view" />
            <span className="tooltip">Quick view</span>
          </a>
        </div>
      </div>
    </div>
  );
}
