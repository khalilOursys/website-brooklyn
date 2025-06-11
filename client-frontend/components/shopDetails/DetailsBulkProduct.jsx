"use client";
import React, { useState } from "react";

import {
  colors,
  sizeOptions,
} from "@/data/singleProductOptions";
import Quantity from "./Quantity";

import Slider1ZoomOuter from "./sliders/Slider1ZoomOuter";
import { allProducts } from "@/data/products";
import { useContextElement } from "@/context/Context";
import Configuration from "@/configuration";

export default function DetailsBulkProduct({ product = allProducts[0] }) {
  const api = Configuration.BACK_BASEURL;


  const { user } = useContextElement();
  var cartId = user?.cart.id;
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [error, setError] = useState(null);

  const handleColor = (color) => {
    const updatedColor = colors.filter(
      (elm) => elm.value.toLowerCase() == color.toLowerCase()
    )[0];
    if (updatedColor) {
      setCurrentColor(updatedColor);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      setError("Please log in to add items to cart");
      return;
    }

    setIsAddingToCart(true);
    setError(null);

    try {
      const cartItem = {
        cartId: cartId, // or whatever your user ID field is
        productId: product.product.id,
        bulkId: product.id,
        quantity: quantity,
        /* price: product.discount || product.bulkPrice, */
      };

      // Direct API call to add item to cart

      const response = await fetch(`${api}cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cartItem)
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      //const result = await response.json();
      window.location.reload();
      // Optionally refresh the cart in your context/state
      // You might want to add a success message here
    } catch (err) {
      setError(err.message || "Failed to add item to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

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
                    images={product.product.images}
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
                    {product.bulkPrice && (
                      <>
                        {product.discount ? (
                          <>
                            <div className="price-on-sale">
                              {parseFloat(product.discount).toFixed(3)} TND
                            </div>
                            <div className="compare-at-price">
                              {product.bulkPrice.toFixed(2)} TND
                            </div>
                            <div className="badges-on-sale">
                              <span>{((product.bulkPrice - product.discount) / product.bulkPrice * 100).toFixed(0)}</span>% OFF
                            </div>
                          </>
                        ) : (
                          <div className="price-on-sale">
                            {product.bulkPrice.toFixed(2)} TND
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="tf-product-info-liveview">
                    <p>{product.description ? product.description : ""}</p>
                  </div>
                  {/* Add this attributes section */}
                  {product.product.attributes && product.product.attributes.length > 0 && (
                    <div className="tf-product-info-attributes">
                      <h6 className="attributes-title">Specifications:</h6>
                      <ul className="attributes-list">
                        {product.product.attributes.map((attr) => (
                          <li key={attr.id} className="attribute-item">
                            <span className="attribute-key">{attr.key}:</span>
                            <span className="attribute-value">{attr.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="tf-product-info-quantity">
                    <div className="quantity-title fw-6">Quantity</div>
                    <Quantity setQuantity={setQuantity} quantity={quantity} />
                  </div>
                  <div className="tf-product-info-buy-button">
                    <form onSubmit={(e) => e.preventDefault()} className="">
                      <a
                        onClick={handleAddToCart}
                        className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                        disabled={isAddingToCart}
                      >
                        {isAddingToCart ? (
                          <span>Déjà ajouté...</span>
                        ) : (
                          <span className="tf-qty-price">
                            Ajouter au panier {/* {(product.discount || product.bulkPrice * quantity).toFixed(2)} TND */}
                          </span>
                        )}
                      </a>
                    </form>
                    {error && <div className="text-danger mt-2">{error}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}