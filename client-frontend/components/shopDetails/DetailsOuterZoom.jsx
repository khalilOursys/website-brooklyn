"use client";
import React, { useEffect, useState, useCallback } from "react";

import Quantity from "./Quantity";
import Slider1ZoomOuter from "./sliders/Slider1ZoomOuter";
import { allProducts } from "@/data/products";
import { useContextElement } from "@/context/Context";
import { openCartModal } from "@/utlis/openCartModal";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Slider1 from "./sliders/Slider1";

export default function DetailsOuterZoom({ product = allProducts[0] }) {
  const params = useParams();
  const router = useRouter();
  const [currentColor, setCurrentColor] = useState({});
  const [colors, setColors] = useState([]);
  const [quantity, setQuantity] = useState(1); // Start with 1 instead of 0
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleColor = useCallback((color) => {
    const updatedColor = colors.find(
      (elm) => elm.value.toLowerCase() === color.toLowerCase()
    );
    if (updatedColor) {
      setCurrentColor(updatedColor);
    }
  }, [colors]);

  const {
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  // Check if product is out of stock
  const isOutOfStock = product.stock <= 0;

  const notify = useCallback((type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  }, []);

  // Initialize colors
  useEffect(() => {
    const colorInfo = [];

    colorInfo.push({
      id: product.idProduct ? product.idProduct : product.id,
      type: 'parent',
      value: product.color
    });
    setCurrentColor({
      id: product.id,
      type: 'parent',
      value: product.colorVar ? product.colorVar : product.color
    })
    // Store the variant colors
    product.variants.forEach(variant => {
      colorInfo.push({
        id: variant.id,
        type: 'variant',
        value: variant.color
      });
    });

    setColors(colorInfo);
  }, [product]);

  // Quantity validation
  useEffect(() => {
    if (product && product.stock > 0) {
      if (quantity > product.stock) {
        setQuantity(product.stock);
        notify(2, `Quantité insuffisante : vous ne pouvez pas dépasser ${product.stock}.`);
      }
      if (quantity < 1) {
        setQuantity(1);
      }
    }
  }, [quantity, product, notify]);

  // Handle color selection with navigation
  const handleColorSelect = useCallback((color) => {
    if (color.type === "parent") {
      router.push(`/product-detail/${color.id}`);
    } else {
      router.push(`/variant-detail/${color.id}`);
    }
  }, [router]);

  // Handle add to cart
  const handleAddToCart = useCallback(() => {
    if (isOutOfStock) return;

    openCartModal();
    addProductToCart(product, Math.max(1, quantity));

    // Show success notification
    notify(1, "Produit ajouté au panier !");
  }, [isOutOfStock, product, quantity, addProductToCart, notify]);

  // Handle quantity change with mobile-optimized touch events
  const handleQuantityChange = useCallback((newQuantity) => {
    if (isOutOfStock) return;

    if (newQuantity > product.stock) {
      setQuantity(product.stock);
      notify(2, `Stock limité à ${product.stock} unités.`);
    } else if (newQuantity < 1) {
      setQuantity(1);
    } else {
      setQuantity(newQuantity);
    }
  }, [isOutOfStock, product.stock, notify]);

  return (
    <section
      className="flat-spacing-4 pt_0"
      style={{ maxWidth: "100vw", overflow: "hidden" }}
    >
      <div
        className="tf-main-product section-image-zoom"
        style={{ maxWidth: "100vw", overflow: "hidden" }}
      >
        <ToastContainer
          position={isMobile ? "bottom-center" : "top-right"}
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider">
                  {/* Conditional rendering based on screen size */}
                  {isMobile ? (
                    <Slider1
                      handleColor={handleColor}
                      currentColor={currentColor.value}
                      images={product.images}
                      isMobile={isMobile}
                    />
                  ) : (
                    <Slider1ZoomOuter
                      handleColor={handleColor}
                      currentColor={currentColor.value}
                      images={product.images}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-title">
                    <h5>{product.name || ""}</h5>
                  </div>
                  <div className="tf-product-info-price">
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
                    <p>{product.description || ""}</p>
                  </div>

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

                  <div className="tf-product-info-variant-picker">
                    <div className="variant-picker-item">
                      <form className="variant-picker-values">
                        <h6 className="attributes-title">Color:</h6>
                        <div className="color-picker-container">
                          {colors.map((color) => (
                            <React.Fragment key={color.id}>
                              <input
                                id={color.id}
                                type="radio"
                                name="color"
                                readOnly
                                checked={currentColor.value === color.value}
                                className="color-radio-input"
                              />
                              <label
                                onClick={() => handleColorSelect(color)}
                                className="hover-tooltip radius-60 color-label"
                                htmlFor={color.id}
                                data-value={color.value}
                                aria-label={`Select color: ${color.value}`}
                              >
                                <span
                                  className="btn-checkbox"
                                  style={{ backgroundColor: color.value }}
                                />
                                <span className="tooltip">{color.value}</span>
                              </label>
                            </React.Fragment>
                          ))}
                        </div>
                      </form>
                    </div>
                  </div>

                  {isOutOfStock ? (
                    <div className="out-of-stock-message">
                      <span
                        className="tf-btn justify-content-center fw-6 fs-16 flex-grow-1"
                        style={{
                          backgroundColor: '#ccc',
                          cursor: 'not-allowed',
                          color: 'white',
                          padding: isMobile ? '12px 16px' : '15px 30px'
                        }}
                      >
                        En rupture de stock
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="tf-product-info-quantity">
                        <div className="quantity-title fw-6">Quantity</div>
                        <Quantity
                          setQuantity={handleQuantityChange}
                          quantity={quantity}
                          maxQuantity={product.stock}
                          disabled={isOutOfStock}
                          isMobile={isMobile}
                        />
                      </div>
                      <div className="tf-product-info-buy-button">
                        <button
                          onClick={handleAddToCart}
                          className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                          style={{
                            padding: isMobile ? '12px 16px' : '15px 30px',
                            width: '100%'
                          }}
                          disabled={isOutOfStock || quantity < 1}
                        >
                          <span>
                            {isAddedToCartProducts(product.id)
                              ? "Déjà ajouté"
                              : "Ajouter au panier"}
                          </span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}