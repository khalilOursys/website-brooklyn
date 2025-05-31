"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Quantity from "../shopDetails/Quantity";
import { useContextElement } from "@/context/Context";

export default function QuickAdd() {
  const {
    quickAddItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
    if (quickAddItem) {
      setItem({
        id: quickAddItem.id,
        name: quickAddItem.name,
        description: quickAddItem.description || "No description available",
        price: parseFloat(quickAddItem.price).toFixed(2),
        stock: quickAddItem.stock || 0,
        isBulk: quickAddItem.isBulk || false,
        discount: quickAddItem.discount || 0,
        isFeatured: quickAddItem.isFeatured || false,
        specs: quickAddItem.specs || {},
        categoryId: quickAddItem.category?.id || null,
        brandId: quickAddItem.brand?.id || null,
        averageRating: quickAddItem.averageRating || 0,
        ratingCount: quickAddItem.ratingCount || 0,
        createdAt: quickAddItem.createdAt || new Date().toISOString(),
        updatedAt: quickAddItem.updatedAt || new Date().toISOString(),
        category: quickAddItem.category || {},
        brand: quickAddItem.brand || {},
        images: quickAddItem.images || [],
        quantity: 1
      });
    }
  }, [quickAddItem]);

  return (
    <div className="modal fade modalDemo" id="quick_add">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
          </div>
          <div className="wrap">
            <div className="tf-product-info-item">
              <div className="image">
                {item?.images.length > 0 && (
                  <Image
                    alt={item.name}
                    style={{ objectFit: "contain" }}
                    src={item.images.find(img => img.isPrimary)?.url || item.images[0].url}
                    width={720}
                    height={1005}
                  />
                )}
              </div>
              <div className="content">
                <Link href={`/product-detail/${item?.id}`}>{item?.name}</Link>
                <div className="tf-product-info-price">
                  <div className="price">{item?.price} TND</div>
                </div>
              </div>
            </div>
            <div className="tf-product-info-quantity mb_15">
              <div className="quantity-title fw-6">Quantity</div>
              <Quantity setQuantity={setQuantity} quantity={quantity} />
            </div>
            <div className="tf-product-info-buy-button">
              <form onSubmit={(e) => e.preventDefault()} className="">
                <a
                  className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                  onClick={() => addProductToCart(item, quantity)}
                >
                  <span>
                    {isAddedToCartProducts(item?.id) ? "Déjà ajouté - " : "Ajouter au panier - "}
                  </span>
                  <span className="tf-qty-price">{item?.price} TND</span>
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
