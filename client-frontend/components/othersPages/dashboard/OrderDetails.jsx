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
            // Supprimer la classe active de tous les éléments du menu
            titles.forEach((item) => item.classList.remove("active"));
            // Ajouter la classe active à l'élément cliqué
            title.classList.add("active");

            // Supprimer la classe active de tous les éléments de contenu
            const contentItems = widgetTab.querySelectorAll(
              ".widget-content-tab > *"
            );
            contentItems.forEach((content) =>
              content.classList.remove("active")
            );

            // Ajouter la classe active et l'effet fade-in à l'élément de contenu correspondant
            const contentActive = contentItems[index];
            contentActive.classList.add("active");
            contentActive.style.display = "block";
            contentActive.style.opacity = 0;
            setTimeout(() => (contentActive.style.opacity = 1), 0);

            // Masquer tout le contenu des éléments frères
            contentItems.forEach((content, idx) => {
              if (idx !== index) {
                content.style.display = "none";
              }
            });
          });
        });
      });
    };

    // Appeler la fonction pour initialiser les onglets
    tabs();

    // Nettoyer les écouteurs d'événements lorsque le composant est démonté
    return () => {
      document
        .querySelectorAll(".widget-menu-tab .item-title")
        .forEach((title) => {
          title.removeEventListener("click", () => { });
        });
    };
  }, []);

  // Calculer la réduction totale
  const totalDiscount = order.orderItems.reduce(
    (sum, item) => sum + (item.product.discount * item.quantity),
    0
  );

  // Formater la date
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
          <h6 className="mt-8 fw-5">Commande #{order.id.slice(0, 5)}</h6>
        </div>
      </div>
      <div className="tf-grid-layout md-col-2 gap-15">
        <div className="item">
          <div className="text-2 text_black-2">Articles</div>
          <div className="text-2 mt_4 fw-6">{order.orderItems.length} articles</div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Numéro de téléphone</div>
          <div className="text-2 mt_4 fw-6">{order.phoneNumber}</div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Date de commande</div>
          <div className="text-2 mt_4 fw-6">{formattedDate}</div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Adresse</div>
          <div className="text-2 mt_4 fw-6">{order.address}</div>
        </div>
      </div>
      <div className="widget-tabs style-has-border widget-order-tab">
        <ul className="widget-menu-tab">
          <li className="item-title active">
            <span className="inner">Détails des articles</span>
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
                    <span className="fw-6">Prix :</span> {item.price} TND
                  </div>
                  <div className="mt_4">
                    <span className="fw-6">Quantité :</span> {item.quantity}
                  </div>
                  {item.product.discount > 0 && (
                    <div className="mt_4">
                      <span className="fw-6">Réduction :</span> {item.product.discount * item.quantity} TND
                    </div>
                  )}
                </div>
              </div>
            ))}
            <ul>
              {/* <li className="d-flex justify-content-between text-2">
                <span>Sous-total</span>
                <span className="fw-6">{order.total + totalDiscount} TND</span>
              </li>
              {totalDiscount > 0 && (
                <li className="d-flex justify-content-between text-2 mt_4">
                  <span>Réductions totales</span>
                  <span className="fw-6">-{totalDiscount} TND</span>
                </li>
              )}
              <li className="d-flex justify-content-between text-2 mt_4 pb_8 line">
                <span>Livraison</span>
                <span className="fw-6">0 TND</span>
              </li> */}
              <li className="d-flex justify-content-between text-2 mt_8">
                <span>Total de la commande</span>
                <span className="fw-6">{order.total} TND</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}