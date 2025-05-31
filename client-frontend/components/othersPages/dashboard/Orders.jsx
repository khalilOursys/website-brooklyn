"use client"; // Marque ce composant comme un Client Component
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Configuration from "@/configuration";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const api = Configuration.BACK_BASEURL;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("x-access-token");

      // Cas où il n'y a pas de token
      if (!token) {
        router.push("/");
        return;
      }

      try {
        // Étape 1 : Récupérer le profil utilisateur pour obtenir l'userId
        `${api}auth/profile`
        const profileResponse = await fetch(`${api}auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Gérer le cas non autorisé (401)
        if (profileResponse.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!profileResponse.ok) {
          throw new Error(`Échec de la récupération du profil : ${profileResponse.status}`);
        }

        const profileData = await profileResponse.json();
        const userId = profileData.id;

        // Étape 2 : Récupérer les commandes avec l'userId
        const ordersResponse = await fetch(`${api}orders/getOrderByIdUser/${userId}`);

        // Gérer le cas non autorisé (401) pour l'endpoint des commandes
        if (ordersResponse.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!ordersResponse.ok) {
          throw new Error(`Échec de la récupération des commandes : ${ordersResponse.status}`);
        }

        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const handleUnauthorized = () => {
      localStorage.removeItem("x-access-token");
      router.push("/");
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement de vos commandes...</p>
      </div>
    );
  }

  /* if (error) {
    return (
      <div className="error-container">
        <h3>Erreur lors du chargement des commandes</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-btn"
        >
          Réessayer
        </button>
      </div>
    );
  } */

  if (!orders.length) {
    return (
      <div className="empty-orders">
        <h3>Aucune commande trouvée</h3>
        <p>Vous n'avez passé aucune commande pour le moment.</p>
        <Link href="/products" className="shop-btn">
          Commencer vos achats
        </Link>
      </div>
    );
  }

  return (
    <div className="my-account-content account-order">
      <div className="wrap-account-order">
        <h2>Votre historique de commandes</h2>
        <table>
          <thead>
            <tr>
              <th className="fw-6">Commande</th>
              <th className="fw-6">Date</th>
              <th className="fw-6">Statut</th>
              <th className="fw-6">Total</th>
              <th className="fw-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="tf-order-item">
                <td>#{order.id.slice(0, 8)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString("fr-FR", {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.total.toFixed(3)} TND pour {order.orderItems.length} article
                  {order.orderItems.length !== 1 ? 's' : ''}
                </td>
                <td>
                  <Link
                    href={`/my-account-orders-details/${order.id}`}
                    className="view-btn"
                  >
                    Voir les détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}