"use client"; // Mark this as a Client Component
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

      // No token case
      if (!token) {
        router.push("/");
        return;
      }

      try {
        // Step 1: Fetch user profile to get userId
        `${api}auth/profile`
        const profileResponse = await fetch(`${api}auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle unauthorized (401)
        if (profileResponse.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!profileResponse.ok) {
          throw new Error(`Profile fetch failed: ${profileResponse.status}`);
        }

        const profileData = await profileResponse.json();
        const userId = profileData.id;

        // Step 2: Fetch orders using userId
        const ordersResponse = await fetch(`${api}orders/getOrderByIdUser/${userId}`);

        // Handle unauthorized (401) for orders endpoint
        if (ordersResponse.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!ordersResponse.ok) {
          throw new Error(`Orders fetch failed: ${ordersResponse.status}`);
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
        <p>Loading your orders...</p>
      </div>
    );
  }

  /* if (error) {
    return (
      <div className="error-container">
        <h3>Error loading orders</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-btn"
        >
          Try Again
        </button>
      </div>
    );
  } */

  if (!orders.length) {
    return (
      <div className="empty-orders">
        <h3>No orders found</h3>
        <p>You haven't placed any orders yet.</p>
        <Link href="/products" className="shop-btn">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="my-account-content account-order">
      <div className="wrap-account-order">
        <h2>Your Order History</h2>
        <table>
          <thead>
            <tr>
              <th className="fw-6">Order</th>
              <th className="fw-6">Date</th>
              <th className="fw-6">Status</th>
              <th className="fw-6">Total</th>
              <th className="fw-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="tf-order-item">
                <td>#{order.id.slice(0, 8)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString("en-US", {
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
                  {order.total.toFixed(3)} TND for {order.orderItems.length} item
                  {order.orderItems.length !== 1 ? 's' : ''}
                </td>
                <td>
                  <Link
                    href={`/my-account-orders-details/${order.id}`}
                    className="view-btn"
                  >
                    View Details
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