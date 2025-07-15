"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Quantity from "../shopDetails/Quantity";
import { useContextElement } from "@/context/Context";
import { toast, ToastContainer } from "react-toastify";

export default function QuickAdd() {
  const {
    quickAddItem,
    addProductToCart,
    isAddedToCartProducts,
    isPacks
  } = useContextElement();

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isOutOfStock, setIsOutOfStock] = useState(1);

  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };

  useEffect(() => {
    setQuantity(1);
    if (quickAddItem) {
      setIsOutOfStock(quickAddItem.stock <= 0);
      setItem({
        id: quickAddItem.id,
        name: quickAddItem.name,
        description: quickAddItem.description || "No description available",
        price: parseFloat(quickAddItem.price).toFixed(2),
        stock: quickAddItem.stock || 1,
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
        quantity: 1,
        isPacks: quickAddItem.isPacks ? 1 : 0
      });
    }
  }, [quickAddItem]);
  useEffect(() => {
    if (item && quantity > item.stock) {
      setQuantity(item.stock);
      notify(2, `Quantité insuffisante : vous ne pouvez pas dépasser ${item.stock}.`);
    }
  }, [quantity, item]);
  return (
    <div className="modal fade modalDemo" id="quick_add">
      <ToastContainer />
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
            {isOutOfStock ? (
              <div className="out-of-stock-message">
                <span className="tf-btn justify-content-center fw-6 fs-16 flex-grow-1" style={{ backgroundColor: '#ccc', cursor: 'not-allowed', color: 'white' }}>
                  En rupture de stock
                </span>
              </div>
            ) : (
              <>
                <div className="tf-product-info-quantity mb_15">
                  <div className="quantity-title fw-6">Quantity</div>
                  <Quantity setQuantity={setQuantity} quantity={quantity} />
                </div>
                <div className="tf-product-info-buy-button">
                  <form onSubmit={(e) => e.preventDefault()} className="">
                    <a
                      href="#"
                      className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                      onClick={() => addProductToCart(item, quantity)}
                    >
                      <span>
                        {isAddedToCartProducts(item?.id) ? "Déjà ajouté " : "Ajouter au panier"}
                      </span>
                      {/* <span className="tf-qty-price">{item?.price} TND</span> */}
                    </a>
                  </form>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
