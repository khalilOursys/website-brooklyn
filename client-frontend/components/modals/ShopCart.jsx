"use client";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ShopCart() {
  const [token, setToken] = useState(null);
  const { cartProducts, totalPrice, setCartProducts } = useContextElement();
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (type, msg) => {
    toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };

  const setQuantity = (id, quantity) => {
    if (quantity >= 1) {
      const item = cartProducts.filter((elm) => elm.id == id)[0];
      const items = [...cartProducts];
      const itemIndex = items.indexOf(item);

      if (items[itemIndex] && quantity > items[itemIndex].stock) {
        setErrorMessage(`Quantité insuffisante : vous ne pouvez pas dépasser ${items[itemIndex].stock}.`);

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);

        setQuantity(id, items[itemIndex].stock);
      } else {
        item.quantity = quantity;
        items[itemIndex] = item;
        setCartProducts(items);
      }
    }
  };

  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };

  useEffect(() => {
    let access = localStorage.getItem("x-access-token");
    setToken(access);
  }, []);

  return (
    <div className="modal fullRight fade modal-shopping-cart" id="shoppingCart">

      {/* Error Message Display */}
      {errorMessage && (
        <div className="error-message" style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ffebee',
          color: '#d32f2f',
          padding: '10px 20px',
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <i className="fas fa-exclamation-circle"></i>
          <strong>{errorMessage}</strong>
        </div>
      )}

      <div className="modal-dialog">
        <div className="modal-content">
          <div className="header">
            <div className="title fw-5">Votre Panier</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-mini-cart-wrap">
              <div className="tf-mini-cart-main">
                <div className="tf-mini-cart-sroll">
                  <div className="tf-mini-cart-items">
                    {cartProducts.map((elm, i) => (
                      <div key={i} className="tf-mini-cart-item">
                        <div className="tf-mini-cart-image">
                          <Link href={elm.isPacks === 1 ? `/pack-detail/${elm.id}` : elm.idProduct ? `/variant-detail/${elm.id}` : `/product-detail/${elm.id}`}>
                            <Image
                              alt="image"
                              src={elm.images.find(image => image.isPrimary)?.url || "default-image-url"}
                              width={668}
                              height={932}
                              style={{ objectFit: "cover" }}
                            />
                          </Link>
                        </div>
                        <div className="tf-mini-cart-info">
                          <Link
                            className="title link"
                            href={elm.isPacks === 1 ? `/pack-detail/${elm.id}` : elm.idProduct ? `/variant-detail/${elm.id}` : `/product-detail/${elm.id}`}
                          >
                            {elm.name}
                          </Link>
                          <div className="price fw-6">
                            {elm.discount > 0 ? (
                              <>
                                <span style={{ textDecoration: 'line-through', marginRight: '5px', color: '#999' }}>
                                  {parseFloat(elm.price).toFixed(3)} TND
                                </span>
                                {parseFloat(elm.discount).toFixed(3)} TND
                              </>
                            ) : (
                              parseFloat(elm.price).toFixed(3) + ' TND'
                            )}
                          </div>
                          <div className="tf-mini-cart-btns">
                            <div className="wg-quantity small">
                              <span
                                className="btn-quantity minus-btn"
                                onClick={() =>
                                  setQuantity(elm.id, elm.quantity - 1)
                                }
                              >
                                -
                              </span>
                              <input
                                type="text"
                                name="number"
                                value={elm.quantity}
                                min={1}
                                onChange={(e) =>
                                  setQuantity(elm.id, e.target.value / 1)
                                }
                              />
                              <span
                                className="btn-quantity plus-btn"
                                onClick={() =>
                                  setQuantity(elm.id, elm.quantity + 1)
                                }
                              >
                                +
                              </span>
                            </div>
                            <div
                              className="tf-mini-cart-remove"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeItem(elm.id)}
                            >
                              Retirer
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="tf-mini-cart-bottom">
                <div className="tf-mini-cart-bottom-wrap">
                  <div className="tf-cart-totals-discounts">
                    <div className="tf-cart-total">Total</div>
                    <div className="tf-totals-total-value fw-6">
                      {totalPrice.toFixed(2)} TND
                    </div>
                  </div>
                  <div className="tf-cart-tax">
                    Taxes et frais de port calculés au moment du paiement
                  </div>
                  <div className="tf-mini-cart-line" />
                  <div className="tf-mini-cart-view-checkout">
                    <Link
                      href={`/view-cart`}
                      className="tf-btn btn-outline radius-3 link w-100 justify-content-center"
                    >
                      Voir le panier
                    </Link>
                    <Link
                      href={token ? `/checkout` : `/login`}
                      className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                    >
                      <span>Commander</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}