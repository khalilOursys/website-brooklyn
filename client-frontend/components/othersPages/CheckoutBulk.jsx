"use client";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Configuration from "@/configuration";

export default function CheckoutBulk() {
  const api = Configuration.BACK_BASEURL;
  const { user } = useContextElement();
  const [token, setToken] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Form state - initialize with user data if available
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    address: '',
    phoneNumber: user?.phoneNumber || '',
    note: '',
    paymentMethod: 'delivery', // default to cash on delivery
    agreeToTerms: false
  });

  // Fetch cart data
  const fetchCart = async () => {
    if (!user?.id) return;

    try {
      setError(null);
      const response = await fetch(`${api}cart?userId=${user.id}`, {
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
    }
  };

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user?.name?.split(' ')[0] || prev.firstName,
        lastName: user?.name?.split(' ').slice(1).join(' ') || prev.lastName,
        phoneNumber: user?.phoneNumber || prev.phoneNumber
      }));
    }
  }, [user]);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const submitForm = async (event) => {
    if (!user) {
      router.push('/view-cart');
    }
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Check if phone number or address is empty
    if (!formData.phoneNumber || !formData.address) {
      setError("Veuillez fournir le numéro de téléphone et l'adresse");
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare order items from cart products bulkId
      /* const orderItems = cartProducts.map(product => ({
        productId: product.productId,
        bulkId: product.bulkId,
        quantity: product.quantity,
        price: parseFloat(product.bulk.bulkPrice) * parseFloat(product.quantity)
      })); */

      const orderItems = cartProducts.map(product => {
        const discount = parseFloat(product.bulk?.discount);
        const unitPrice = discount && discount !== 0 ? discount : parseFloat(product.bulkPrice);

        return {
          productId: product.productId,
          bulkId: product.bulkId,
          quantity: product.quantity,
          price: unitPrice * parseFloat(product.quantity)
        };
      });

      // Prepare the request body
      const orderData = {
        isBulk: 1,
        userId: user.id,
        address: `${formData.address}, ${formData.firstName} ${formData.lastName}`,
        phoneNumber: formData.phoneNumber,
        total: totalPrice,
        orderItems
      };

      // Send the request to your API
      const response = await fetch(`${api}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      localStorage.removeItem("cartList");
      setSuccess(true);
      /* setTimeout(() => {
        window.location.replace("/");
      }, 1500); */
    } catch (err) {
      console.error("Error submitting order:", err);
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render checkout page if user is not connected
  if (!user) {
    return null;
  }
  /* const totalPrice = cartProducts.reduce(
    (total, item) => total + (item.bulk.bulkPrice * item.quantity),
    0
  ); */
  const totalPrice = cartProducts.reduce((accumulator, product) => {
    console.log(product);

    const quantity = parseFloat(product.quantity) || 0;
    const price = parseFloat(product.bulk.bulkPrice) || 0;
    const discount = parseFloat(product.bulk.discount);

    const unitPrice = !isNaN(discount) && discount !== 0 ? discount : price;

    return accumulator + quantity * unitPrice;
  }, 0);
  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="tf-page-cart-wrap layout-2">
          <div className="tf-page-cart-item">
            <h5 className="fw-5 mb_20">Détails de facturation</h5>
            <form onSubmit={submitForm} className="form-checkout">
              <div className="box grid-2">
                <fieldset className="fieldset">
                  <label htmlFor="first-name">Nom</label>
                  <input
                    required
                    type="text"
                    id="first-name"
                    name="firstName"
                    placeholder="Nom"
                    value={formData.firstName}
                    readOnly
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <label htmlFor="last-name">Prénom</label>
                  <input
                    required
                    type="text"
                    id="last-name"
                    name="lastName"
                    placeholder="Prénom"
                    value={formData.lastName}
                    readOnly
                    onChange={handleInputChange}
                  />
                </fieldset>
              </div>
              <fieldset className="box fieldset">
                <label htmlFor="address">Adresse</label>
                <input
                  required
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Your Adresse"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="phone">Numéro de téléphone</label>
                <input
                  required
                  type="tel"
                  id="phone"
                  name="phoneNumber"
                  placeholder="Numéro de téléphone"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </fieldset>
              {/*  <fieldset className="box fieldset">
                <label htmlFor="note">Order notes (optional)</label>
                <textarea
                  name="note"
                  id="note"
                  placeholder="Notes about your order..."
                  value={formData.note}
                  onChange={handleInputChange}
                />
              </fieldset> */}
            </form>
          </div>
          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
              <h5 className="fw-5 mb_20">Votre commande</h5>
              <form
                onSubmit={submitForm}
                className="tf-page-cart-checkout widget-wrap-checkout"
              >
                <ul className="wrap-checkout-product">
                  {cartProducts.map((elm, i) => (
                    <li key={i} className="checkout-product-item">
                      <figure className="img-product">
                        <Image
                          alt="product"
                          src={elm.product.images[0].url}
                          width={720}
                          height={1005}
                        />
                        <span className="quantity">{elm.quantity}</span>
                      </figure>
                      <div className="content">
                        <div className="info">
                          <p className="name">{elm.name}</p>
                        </div>
                        <span className="price">
                          {elm.bulk.discount > 0 ? (
                            <>
                              <span style={{ textDecoration: 'line-through', marginRight: '5px', color: '#999' }}>
                                {(elm.bulk.bulkPrice * elm.quantity).toFixed(3)} TND
                              </span>
                              {(elm.bulk.discount * elm.quantity).toFixed(3)} TND
                            </>
                          ) : (
                            (elm.bulk.bulkPrice * elm.quantity).toFixed(3) + ' TND'
                          )}
                          {/* {(elm.bulk.bulkPrice * elm.quantity).toFixed(3)} TND */}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                {!cartProducts.length && (
                  <div className="container">
                    <div className="row align-items-center mt-5 mb-5">
                      <div className="col-12 fs-18">
                        Votre panier est vide
                      </div>
                    </div>
                  </div>
                )}
                <div className="coupon-box">
                  <input type="text" placeholder="Discount code" />
                  <a
                    href="#"
                    className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
                  >
                    Apply
                  </a>
                </div>
                <div className="d-flex justify-content-between line pb_20">
                  <h6 className="fw-5">Total</h6>
                  <h6 className="total fw-5">{totalPrice} TND</h6>
                </div>
                <div className="wd-check-payment">
                  <div className="fieldset-radio mb_20">
                    <input
                      required
                      type="radio"
                      name="paymentMethod"
                      id="delivery"
                      className="tf-check"
                      checked={formData.paymentMethod === 'delivery'}
                      onChange={() => setFormData(prev => ({
                        ...prev,
                        paymentMethod: 'delivery'
                      }))}
                    />
                    <label htmlFor="delivery">Paiement à la livraison</label>
                  </div>
                  {/* <p className="text_black-2 mb_20">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our
                    <Link
                      href={`/privacy-policy`}
                      className="text-decoration-underline"
                    >
                      privacy policy
                    </Link>
                    .
                  </p> */}
                  {/* <div className="box-checkbox fieldset-radio mb_20">
                    <input
                      required
                      type="checkbox"
                      id="check-agree"
                      name="agreeToTerms"
                      className="tf-check"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="check-agree" className="text_black-2">
                      I have read and agree to the website
                      <Link
                        href={`/terms-conditions`}
                        className="text-decoration-underline"
                      >
                        terms and conditions
                      </Link>
                      .
                    </label>
                  </div> */}
                </div>

                {error && (
                  <div className="alert alert-danger mb-3">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="alert alert-success mb-3">
                    Commande passée avec succès !
                  </div>
                )}

                <button
                  type="submit"
                  className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center"
                  disabled={isSubmitting || cartProducts.length === 0}
                >
                  {isSubmitting ? "Processing..." : "Passer commande"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}