"use client";
import Configuration from "@/configuration";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartBulk() {
  const { user } = useContextElement();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [note, setNote] = useState("");
  const [cartProducts, setCartProducts] = useState([]); // Added missing state
  const router = useRouter();
  const API_BASE_URL = Configuration.BACK_BASEURL;

  // Fetch cart data
  const fetchCart = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}cart?userId=${user.id}`, {
        headers: {
          /* Authorization: `Bearer ${token}`, */
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();
      setCartProducts(data.items || []);
    } catch (err) {
      setError(err.message);
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update quantity
  const setQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}cart/items/${id}`, {
        method: "PUT",
        headers: {
          /* Authorization: `Bearer ${token}`, */
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedItem = await response.json();
      setCartProducts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: updatedItem.quantity } : item
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Quantity update error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Remove item
  const removeItem = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}cart/items/${id}`, {
        method: "DELETE",
        /* headers: {
          Authorization: `Bearer ${token}`,
        }, */
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      setCartProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Remove item error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!token) {
      router.push("/login");
      return;
    }

    // Save cart note if needed
    if (note.trim()) {
      localStorage.setItem("cart-note", note);
    }

    router.push("/checkout");
  };

  // Calculate total price
  const totalPrice = cartProducts.reduce(
    (total, item) => total + (item.bulk.bulkPrice * item.quantity),
    0
  );

  // Calculate total quantity
  const totalQuantity = cartProducts.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Initialize component
  useEffect(() => {
    const savedToken = localStorage.getItem("x-access-token");
    const savedNote = localStorage.getItem("cart-note");

    setToken(savedToken);
    if (savedNote) setNote(savedNote);

    if (savedToken && user?.id) {
      fetchCart();
    }
  }, [user?.id]);

  return (
    <section className="flat-spacing-11">
      <div className="container">
        {loading && (
          <div className="loading-overlay">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
            <button
              type="button"
              className="btn-close float-end"
              onClick={() => setError(null)}
            ></button>
          </div>
        )}

        <div className="tf-cart-countdown">
          <div className="title-left">
            <svg
              className="d-inline-block"
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={24}
              viewBox="0 0 16 24"
              fill="rgb(219 18 21)"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0899 24C11.3119 22.1928 11.4245 20.2409 10.4277 18.1443C10.1505 19.2691 9.64344 19.9518 8.90645 20.1924C9.59084 18.2379 9.01896 16.1263 7.19079 13.8576C7.15133 16.2007 6.58824 17.9076 5.50148 18.9782C4.00436 20.4517 4.02197 22.1146 5.55428 23.9669C-0.806588 20.5819 -1.70399 16.0418 2.86196 10.347C3.14516 11.7228 3.83141 12.5674 4.92082 12.8809C3.73335 7.84186 4.98274 3.54821 8.66895 0C8.6916 7.87426 11.1062 8.57414 14.1592 12.089C17.4554 16.3071 15.5184 21.1748 10.0899 24Z"
              />
            </svg>
            <p>These products are limited, checkout within</p>
          </div>
          <div
            className="js-countdown timer-count"
            data-timer={600}
            data-labels="d:,h:,m:,s"
          />
        </div>

        <div className="tf-page-cart-wrap">
          <div className="tf-page-cart-item">
            <form onSubmit={(e) => e.preventDefault()}>
              <table className="tf-table-page-cart">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((elm, i) => (
                    <tr key={i} className="tf-cart-item file-delete">
                      <td className="tf-cart-item_product">
                        <Link
                          href={`/product-detail/${elm.id}`}
                          className="img-box"
                        >
                          <Image
                            alt="img-product"
                            src={elm.product.images[0].url}
                            width={668}
                            height={932}
                          />
                        </Link>
                        <div className="cart-info">
                          <Link
                            href={`/product-detail/${elm.id}`}
                            className="cart-title link"
                          >
                            {elm.bulk.name}
                          </Link>
                          <span
                            className="remove-cart link remove"
                            onClick={() => removeItem(elm.id)}
                          >
                            Remove
                          </span>
                        </div>
                      </td>
                      <td
                        className="tf-cart-item_price"
                        cart-data-title="Price"
                      >
                        <div className="cart-price">
                          {parseFloat(elm.bulk.bulkPrice).toFixed(3)} TND
                        </div>
                      </td>
                      <td
                        className="tf-cart-item_quantity"
                        cart-data-title="Quantity"
                      >
                        <div className="cart-quantity">
                          <div className="wg-quantity">
                            <span
                              className="btn-quantity minus-btn"
                              onClick={() =>
                                setQuantity(elm.id, elm.quantity - 1)
                              }
                            >
                              <svg
                                className="d-inline-block"
                                width={9}
                                height={1}
                                viewBox="0 0 9 1"
                                fill="currentColor"
                              >
                                <path d="M9 1H5.14286H3.85714H0V1.50201e-05H3.85714L5.14286 0L9 1.50201e-05V1Z" />
                              </svg>
                            </span>
                            <input
                              type="text"
                              name="number"
                              value={elm.quantity}
                              min={1}
                              onChange={(e) =>
                                setQuantity(elm.id, parseInt(e.target.value) || 1)
                              }
                            />
                            <span
                              className="btn-quantity plus-btn"
                              onClick={() =>
                                setQuantity(elm.id, elm.quantity + 1)
                              }
                            >
                              <svg
                                className="d-inline-block"
                                width={9}
                                height={9}
                                viewBox="0 0 9 9"
                                fill="currentColor"
                              >
                                <path d="M9 5.14286H5.14286V9H3.85714V5.14286H0V3.85714H3.85714V0H5.14286V3.85714H9V5.14286Z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        className="tf-cart-item_total"
                        cart-data-title="Total"
                      >
                        <div
                          className="cart-total"
                          style={{ minWidth: "60px" }}
                        >
                          {(elm.bulk.bulkPrice * elm.quantity).toFixed(3)} TND
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="text-end fw-bold">Total Items:</td>
                    <td className="fw-bold">{totalQuantity}</td>
                    <td className="fw-bold">{totalPrice.toFixed(3)} TND</td>
                  </tr>
                </tfoot>
              </table>

              <div className="tf-page-cart-note">
                <label htmlFor="cart-note">Add Order Note</label>
                <textarea
                  name="note"
                  id="cart-note"
                  placeholder="How can we help you?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
              <div className="tf-free-shipping-bar">
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
                  Buy <span className="price fw-6">75.00 TND</span> more to enjoy{" "}
                  <span className="fw-6">Free Shipping</span>
                </div>
              </div>

              <div className="tf-page-cart-checkout">
                <div className="tf-cart-totals-discounts">
                  <h3>Subtotal</h3>
                  <span className="total-value">
                    {totalPrice.toFixed(3)} TND
                  </span>
                </div>
                <p className="tf-cart-tax">
                  Taxes and <Link href={`/shipping-delivery`}>shipping</Link> calculated
                  at checkout
                </p>
                <div className="cart-checkbox">
                  <input
                    type="checkbox"
                    className="tf-check"
                    id="check-agree"
                    required
                  />
                  <label htmlFor="check-agree" className="fw-4">
                    I agree with the terms and conditions
                  </label>
                </div>
                <div className="cart-checkout-btn">
                  <Link
                    href={"/checkout-bulk"}
                    className="tf-btn w-100 btn-fill animate-hover-btn radius-3 justify-content-center"
                  >
                    <span>Proceed to Checkout</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}