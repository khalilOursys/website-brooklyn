"use client";
import { useContextElement } from "@/context/Context";
import { products1 } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "swiper/modules";
export default function ShopCart() {
  // Ensure localStorage is only accessed in the browser
  const [token, setToken] = useState(null);
  const { cartProducts, totalPrice, setCartProducts, setQuickViewItem } =
    useContextElement();
  const setQuantity = (id, quantity) => {
    if (quantity >= 1) {
      const item = cartProducts.filter((elm) => elm.id == id)[0];
      const items = [...cartProducts];
      const itemIndex = items.indexOf(item);
      item.quantity = quantity;
      items[itemIndex] = item;
      setCartProducts(items);
    }
  };
  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };

  const addNoteRef = useRef();
  const addGiftRef = useRef();
  const addShipingRef = useRef();
  useEffect(() => {
    // This code will only run on the client side

    let access = localStorage.getItem("x-access-token");
    setToken(access);
    // ... use the data
  }, []);
  return (
    <div className="modal fullRight fade modal-shopping-cart" id="shoppingCart">
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
            {/* <div className="tf-mini-cart-threshold">
              <div className="tf-progress-bar">
                <span style={{ width: "50%" }}>
                  <div className="progress-car">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={21}
                      height={14}
                      viewBox="0 0 21 14"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 0.875C0 0.391751 0.391751 0 0.875 0H13.5625C14.0457 0 14.4375 0.391751 14.4375 0.875V3.0625H17.3125C17.5867 3.0625 17.845 3.19101 18.0104 3.40969L20.8229 7.12844C20.9378 7.2804 21 7.46572 21 7.65625V11.375C21 11.8582 20.6082 12.25 20.125 12.25H17.7881C17.4278 13.2695 16.4554 14 15.3125 14C14.1696 14 13.1972 13.2695 12.8369 12.25H7.72563C7.36527 13.2695 6.39293 14 5.25 14C4.10706 14 3.13473 13.2695 2.77437 12.25H0.875C0.391751 12.25 0 11.8582 0 11.375V0.875ZM2.77437 10.5C3.13473 9.48047 4.10706 8.75 5.25 8.75C6.39293 8.75 7.36527 9.48046 7.72563 10.5H12.6875V1.75H1.75V10.5H2.77437ZM14.4375 8.89937V4.8125H16.8772L19.25 7.94987V10.5H17.7881C17.4278 9.48046 16.4554 8.75 15.3125 8.75C15.0057 8.75 14.7112 8.80264 14.4375 8.89937ZM5.25 10.5C4.76676 10.5 4.375 10.8918 4.375 11.375C4.375 11.8582 4.76676 12.25 5.25 12.25C5.73323 12.25 6.125 11.8582 6.125 11.375C6.125 10.8918 5.73323 10.5 5.25 10.5ZM15.3125 10.5C14.8293 10.5 14.4375 10.8918 14.4375 11.375C14.4375 11.8582 14.8293 12.25 15.3125 12.25C15.7957 12.25 16.1875 11.8582 16.1875 11.375C16.1875 10.8918 15.7957 10.5 15.3125 10.5Z"
                      />
                    </svg>
                  </div>
                </span>
              </div>
              <div className="tf-progress-msg">
                Achetez <span className="price fw-6">75.00 TND</span> de plus pour profiter de la
                <span className="fw-6 mr-1 ms-1">livraison gratuite</span>
              </div>
            </div> */}
            <div className="tf-mini-cart-wrap">
              <div className="tf-mini-cart-main">
                <div className="tf-mini-cart-sroll">
                  <div className="tf-mini-cart-items">
                    {cartProducts.map((elm, i) => (
                      <div key={i} className="tf-mini-cart-item">
                        <div className="tf-mini-cart-image">
                          <Link href={`/product-detail/${elm.id}`}>
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
                            href={`/product-detail/${elm.id}`}
                          >
                            {elm.name}
                          </Link>
                          {/* <div className="meta-variant">Light gray</div> */}
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
                            {/* {parseFloat(elm.price).toFixed(3)} TND */}
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

                    {/* {!cartProducts.length && (
                      <div className="container">
                        <div className="row align-items-center mt-5 mb-5">
                          <div className="col-12 fs-18">
                            Votre panier est vide
                          </div>
                          <div className="col-12 mt-3">
                            <Link
                              href={`/shop-default`}
                              className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                              style={{ width: "fit-content" }}
                            >
                              Explore Products!
                            </Link>
                          </div>
                        </div>
                      </div>
                    )} */}
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
                  {/* <div className="tf-cart-checkbox">
                    <div className="tf-checkbox-wrapp">
                      <input
                        className=""
                        type="checkbox"
                        id="CartDrawer-Form_agree"
                        name="agree_checkbox"
                      />
                      <div>
                        <i className="icon-check" />
                      </div>
                    </div>
                    <label htmlFor="CartDrawer-Form_agree">
                      I agree with the
                      <a href="#" title="Terms of Service">
                        terms and conditions
                      </a>
                    </label>
                  </div> */}
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
