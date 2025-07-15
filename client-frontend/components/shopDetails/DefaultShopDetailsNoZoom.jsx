"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { openCartModal } from "@/utlis/openCartModal";
import {
  colors,
  sizeOptions,
} from "@/data/singleProductOptions";
import StickyItem from "./StickyItem";
import Quantity from "./Quantity";
import { toast, ToastContainer } from "react-toastify";

import { useContextElement } from "@/context/Context";

export default function DefaultShopDetailsNoZoom({ product }) {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizeOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const {
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  const isOutOfStock = product.stock <= 0;
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };


  useEffect(() => {
    if (product && quantity > product.stock) {
      setQuantity(product.stock);
      notify(2, `Quantité insuffisante : vous ne pouvez pas dépasser ${product.stock}.`);
    }
  }, [quantity, product]);
  return (
    <section
      className="flat-spacing-4 pt_0"
      style={{ maxWidth: "100vw", overflow: "clip" }}
    >
      <div className="tf-main-product section-image-zoom">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider">
                  <Image
                    className="lazyload"
                    data-src={product.images[0].url}
                    alt={""}
                    src={product.images[0].url} // Optional fallback for non-lazy loading
                    width={460}
                    height={460}
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
                      {product.name}
                    </h5>
                  </div>
                  <div className="tf-product-info-price">
                    <div className="price-on-sale">
                      {parseFloat(product.price).toFixed(3)} TND
                    </div>
                  </div>
                  <div className="tf-product-info-liveview">
                    <p>{product.description ? product.description : ""}</p>
                  </div>

                  {isOutOfStock ? (
                    <div className="out-of-stock-message">
                      <span className="tf-btn justify-content-center fw-6 fs-16 flex-grow-1" style={{ backgroundColor: '#ccc', cursor: 'not-allowed', color: 'white' }}>
                        En rupture de stock
                      </span>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StickyItem />
    </section>
  );
}
