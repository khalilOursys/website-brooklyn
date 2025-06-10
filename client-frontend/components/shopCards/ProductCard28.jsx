"use client";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Shopcard28({ product }) {

  const [currentImage, setCurrentImage] = useState(product.imgSrc);
  const { setQuickViewItem } = useContextElement();
  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    addProductToCart,
    isAddedToCartProducts,
    setQuickAddItem
  } = useContextElement();
  useEffect(() => {
    setCurrentImage(product.imgSrc);
  }, [product]);
  return (
    <div className="card-product style-8">
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          {/* <Image
            width={360}
            height={360}
            className="lazyload img-product"
            data-src={product.primaryImage}
            src={product.primaryImage}
            alt="image-product"
          />
          <Image
            width={360}
            height={360}
            className="lazyload img-hover"
            data-src={product.images && product.images.length > 0 ? product.images[0] : product.primaryImage}
            src={product.images && product.images.length > 0 ? product.images[0] : product.primaryImage}
            alt="image-product 1"
          /> */}
          <Image
            className="lazyload img-product"
            data-src={product.images.find(img => img.isPrimary)?.url || product.images[0]?.url}
            src={currentImage || product.images.find(img => img.isPrimary)?.url || product.images[0]?.url}
            alt={product.name}
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            data-src={
              product.images.length > 1
                ? product.images.find(img => !img.isPrimary)?.url || product.images[1]?.url
                : product.images[0]?.url
            }
            src={
              product.images.length > 1
                ? product.images.find(img => !img.isPrimary)?.url || product.images[1]?.url
                : product.images[0]?.url
            }
            alt={product.name}
            width={720}
            height={1005}
          />
        </Link>
        <div className="list-product-btn absolute-2">
          <a
            href="#quick_add"
            onClick={() => setQuickAddItem(product)}
            data-bs-toggle="modal"
            className="box-icon bg_white quick-add tf-btn-loading"
          >
            <span className="icon icon-bag" />
            <span className="tooltip">Quick Add</span>
          </a>
          {/* <a
            onClick={() => addToWishlist(product.id)}
            className="box-icon bg_white wishlist btn-icon-action"
          >
            <span
              className={`icon icon-heart ${isAddedtoWishlist(product.id) ? "added" : ""
                }`}
            />
            <span className="tooltip">
              {isAddedtoWishlist(product.id)
                ? "Already Wishlisted"
                : "Add to Wishlist"}
            </span>
            <span className="icon icon-delete" />
          </a>
          <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="offcanvasLeft"
            onClick={() => addToCompareItem(product.id)}
            className="box-icon bg_white compare btn-icon-action"
          >
            <span
              className={`icon icon-compare ${isAddedtoCompareItem(product.id) ? "added" : ""
                }`}
            />
            <span className="tooltip">
              {" "}
              {isAddedtoCompareItem(product.id)
                ? "Already Compared"
                : "Add to Compare"}
            </span>
            <span className="icon icon-check" />
          </a> */}
          <a
            href="#quick_view"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon bg_white quickview tf-btn-loading"
          >
            <span className="icon icon-view" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>
        {product.discount ? (
          <div className="on-sale-wrap text-end">
            <div className="on-sale-item">
              -
              {Math.round(
                ((product.price - product.discount) / product.price) * 100
              )}
              %
            </div>
          </div>
        ) : (
          ""
        )}
        {/* {product.preOrder && (
          <div className="on-sale-wrap text-end">
            <div className="on-sale-item pre-order">Pre-Order</div>
          </div>
        )} */}
      </div>
      <div className="card-product-info text-center">
        <Link href={`/product-detail/${product.id}`} className="title link">
          {product.name}
        </Link>
        {product.discount ? (
          <span className="price">
            <span className="fw-4 text-sale">
              {product.discount.toFixed(3)} TND
            </span>{" "}
            <span className="text_primary">{product.price.toFixed(3)} TND</span>
          </span>
        ) : (
          <span className="price">{product.price.toFixed(3)} TND</span>
        )}
        {/* <span className="price">{parseFloat(product.price).toFixed(3)} TND</span> */}
        {/* {product.colors ? (
          <ul className="list-color-product justify-content-center">
            {product.colors.map((color, index) => (
              <li
                className={`list-color-item color-swatch ${currentImage == color.imgSrc ? "active" : ""
                  }`}
                onMouseOver={() => setCurrentImage(color.imgSrc)}
                key={index}
              >
                <span className="tooltip">{color.name}</span>
                <span className={`swatch-value ${color.colorClass}`} />
                <Image
                  width={360}
                  height={360}
                  className="lazyload"
                  data-src={color.imgSrc}
                  src={color.imgSrc}
                  alt="image-product"
                />
              </li>
            ))}
          </ul>
        ) : (
          ""
        )} */}
        {/* <a
          className="tf-btn tf-btn-loading"
          onClick={() => addProductToCart(product.id)}
        >
          {isAddedToCartProducts(product.id) ? "Déjà ajouté" : "Ajouter au panier"}
        </a> */}
      </div>
    </div>
  );
}
