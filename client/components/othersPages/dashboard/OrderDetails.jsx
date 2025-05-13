"use client";
import React, { useEffect } from "react";
import Image from "next/image";

export default function OrderDetails({ order }) {
  useEffect(() => {
    const tabs = () => {
      document.querySelectorAll(".widget-tabs").forEach((widgetTab) => {
        const titles = widgetTab.querySelectorAll(
          ".widget-menu-tab .item-title"
        );

        titles.forEach((title, index) => {
          title.addEventListener("click", () => {
            // Remove active class from all menu items
            titles.forEach((item) => item.classList.remove("active"));
            // Add active class to the clicked item
            title.classList.add("active");

            // Remove active class from all content items
            const contentItems = widgetTab.querySelectorAll(
              ".widget-content-tab > *"
            );
            contentItems.forEach((content) =>
              content.classList.remove("active")
            );

            // Add active class and fade-in effect to the matching content item
            const contentActive = contentItems[index];
            contentActive.classList.add("active");
            contentActive.style.display = "block";
            contentActive.style.opacity = 0;
            setTimeout(() => (contentActive.style.opacity = 1), 0);

            // Hide all siblings' content
            contentItems.forEach((content, idx) => {
              if (idx !== index) {
                content.style.display = "none";
              }
            });
          });
        });
      });
    };

    // Call the function to initialize the tabs
    tabs();

    // Clean up event listeners when the component unmounts
    return () => {
      document
        .querySelectorAll(".widget-menu-tab .item-title")
        .forEach((title) => {
          title.removeEventListener("click", () => { });
        });
    };
  }, []);

  // Calculate total discount
  const totalDiscount = order.orderItems.reduce(
    (sum, item) => sum + (item.product.discount * item.quantity),
    0
  );

  // Format date
  const formattedDate = new Date(order.createdAt).toLocaleString();

  return (
    <div className="wd-form-order">
      <div className="order-head">
        <figure className="img-product">
          <Image
            alt="product"
            src="/images/products/brown.jpg"
            width="720"
            height="1005"
          />
        </figure>
        <div className="content">
          <div className="badge">{order.status}</div>
          <h6 className="mt-8 fw-5">Order #{order.id.slice(0, 5)}</h6>
        </div>
      </div>
      <div className="tf-grid-layout md-col-2 gap-15">
        <div className="item">
          <div className="text-2 text_black-2">Items</div>
          <div className="text-2 mt_4 fw-6">{order.orderItems.length} items</div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Phone Number</div>
          <div className="text-2 mt_4 fw-6">{order.phoneNumber}</div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Order Date</div>
          <div className="text-2 mt_4 fw-6">{formattedDate}</div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Address</div>
          <div className="text-2 mt_4 fw-6">{order.address}</div>
        </div>
      </div>
      <div className="widget-tabs style-has-border widget-order-tab">
        <ul className="widget-menu-tab">
          <li className="item-title active">
            <span className="inner">Item Details</span>
          </li>
        </ul>
        <div className="widget-content-tab">
          <div className="widget-content-inner active">
            {order.orderItems.map((item) => (
              <div key={item.id} className="order-head mb-4">
                <figure className="img-product">
                  <Image
                    alt="product"
                    src={item.product.images[0].url}
                    width="720"
                    height="1005"
                  />
                </figure>
                <div className="content">
                  <div className="text-2 fw-6">{item.product.name}</div>
                  <div className="mt_4">
                    <span className="fw-6">Price :</span> {item.price} TND
                  </div>
                  <div className="mt_4">
                    <span className="fw-6">Quantity :</span> {item.quantity}
                  </div>
                  {item.product.discount > 0 && (
                    <div className="mt_4">
                      <span className="fw-6">Discount :</span> {item.product.discount * item.quantity} TND
                    </div>
                  )}
                </div>
              </div>
            ))}
            <ul>
              <li className="d-flex justify-content-between text-2">
                <span>Subtotal</span>
                <span className="fw-6">{order.total + totalDiscount} TND</span>
              </li>
              {totalDiscount > 0 && (
                <li className="d-flex justify-content-between text-2 mt_4">
                  <span>Total Discounts</span>
                  <span className="fw-6">-{totalDiscount} TND</span>
                </li>
              )}
              <li className="d-flex justify-content-between text-2 mt_4 pb_8 line">
                <span>Shipping</span>
                <span className="fw-6">0 TND</span>
              </li>
              <li className="d-flex justify-content-between text-2 mt_8">
                <span>Order Total</span>
                <span className="fw-6">{order.total} TND</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}