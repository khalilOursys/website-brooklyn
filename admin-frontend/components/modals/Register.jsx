"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Configuration from "@/configuration";

export default function Register() {
  const router = useRouter();
  const api = Configuration.BACK_BASEURL;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${api}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Registration successful - redirect or show success message
      //router.push("/users");

      const responseLogin = await fetch(`${api}auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await responseLogin.json(); // <-- you forgot to parse the response!

      if (data.message) {
        // notify(2, data.message); // Show error message (added 2 as level like your other notify calls)
      } else {
        localStorage.setItem("x-access-token", data.access_token); // Save token
        setTimeout(() => {
          window.location.reload(); // Updated navigation
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal modalCentered fade form-sign-in modal-part-content" id="register">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Register</div>
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
          </div>
          <div className="tf-login-form">
            <form onSubmit={handleSubmit}>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <label className="tf-field-label">First name</label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <label className="tf-field-label">Last name</label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label className="tf-field-label">Email *</label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label className="tf-field-label">Password *</label>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Register"}
                  </button>
                </div>
                <div className="w-100">
                  <a
                    href="#login"
                    data-bs-toggle="modal"
                    className="btn-link fw-6 w-100 link"
                  >
                    Already have an account? Log in here
                    <i className="icon icon-arrow1-top-left" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}