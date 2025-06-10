"use client";
import React, { useState } from "react";

import Image from "next/image";
import CountdownComponent from "../common/Countdown";
import {
  colors,
  paymentImages,
  sizeOptions,
} from "@/data/singleProductOptions";
import StickyItem from "./StickyItem";
import Quantity from "./Quantity";

import Slider1ZoomOuter from "./sliders/Slider1ZoomOuter";
import { allProducts } from "@/data/products";
import { useContextElement } from "@/context/Context";
import { openCartModal } from "@/utlis/openCartModal";

export default function DetailsOuterZoom({ product = allProducts[0] }) {

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizeOptions[1]);
  const [quantity, setQuantity] = useState(1);

  const handleColor = (color) => {
    const updatedColor = colors.filter(
      (elm) => elm.value.toLowerCase() == color.toLowerCase()
    )[0];
    if (updatedColor) {
      setCurrentColor(updatedColor);
    }
  };

  const {
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    isAddedtoCompareItem,
    addToWishlist,
    isAddedtoWishlist,
  } = useContextElement();
  return (
    <section
      className="flat-spacing-4 pt_0"
      style={{ maxWidth: "100vw", overflow: "clip" }}
    >
      <div
        className="tf-main-product section-image-zoom"
        style={{ maxWidth: "100vw", overflow: "clip" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider">
                  <Slider1ZoomOuter
                    handleColor={handleColor}
                    currentColor={currentColor.value}
                    images={product.images}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-title">
                    <h5>
                      {product.name ? product.name : ""}
                    </h5>
                  </div>
                  <div className="tf-product-info-price">
                    {/* <div className="price-on-sale">
                      {parseFloat(product.price).toFixed(3)} TND
                    </div> */}

                    {product.price && (
                      <>
                        {product.discount ? (
                          <>
                            <div className="price-on-sale">
                              {parseFloat(product.discount).toFixed(3)} TND
                            </div>
                            <div className="compare-at-price">
                              {product.price.toFixed(2)} TND
                            </div>
                            <div className="badges-on-sale">
                              <span>{((product.price - product.discount) / product.price * 100).toFixed(0)}</span>% OFF
                            </div>
                          </>
                        ) : (
                          <div className="price-on-sale">
                            {product.price.toFixed(2)} TND
                          </div>
                        )}
                      </>
                    )}

                  </div>
                  <div className="tf-product-info-liveview">
                    <p>{product.description ? product.description : ""}</p>
                  </div>
                  {/* Add this attributes section */}
                  {product.attributes && product.attributes.length > 0 && (
                    <div className="tf-product-info-attributes">
                      <h6 className="attributes-title">Specifications:</h6>
                      <ul className="attributes-list">
                        {product.attributes.map((attr) => (
                          <li key={attr.id} className="attribute-item">
                            <span className="attribute-key">{attr.key}:</span>
                            <span className="attribute-value">{attr.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* <div className="tf-product-info-variant-picker">
                    <div className="variant-picker-item">
                      <div className="variant-picker-label">
                        Color:
                        <span className="fw-6 variant-picker-label-value">
                          {currentColor.value}
                        </span>
                      </div>
                      <form className="variant-picker-values">
                        {colors.map((color) => (
                          <React.Fragment key={color.id}>
                            <input
                              id={color.id}
                              type="radio"
                              name="color1"
                              readOnly
                              checked={currentColor == color}
                            />
                            <label
                              onClick={() => setCurrentColor(color)}
                              className="hover-tooltip radius-60"
                              htmlFor={color.id}
                              data-value={color.value}
                            >
                              <span
                                className={`btn-checkbox ${color.className}`}
                              />
                              <span className="tooltip">{color.value}</span>
                            </label>
                          </React.Fragment>
                        ))}
                      </form>
                    </div>
                  </div> */}
                  <div className="tf-product-info-quantity">
                    <div className="quantity-title fw-6">Quantity</div>
                    <Quantity setQuantity={setQuantity} quantity={quantity} />
                  </div>
                  <div className="tf-product-info-buy-button">
                    <form onSubmit={(e) => e.preventDefault()} className="">
                      <a
                        onClick={() => {
                          openCartModal();
                          addProductToCart(product, quantity ? quantity : 1);
                        }}
                        className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                      >
                        <span>
                          {isAddedToCartProducts(product.id)
                            ? "Déjà ajouté"
                            : "Ajouter au panier"}

                        </span>
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <StickyItem /> */}
    </section>
  );
}
