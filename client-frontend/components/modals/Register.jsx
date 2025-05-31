"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Configuration from "@/configuration";

export default function Register() {
  const router = useRouter();
  const api = Configuration.BACK_BASEURL;
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateEmail(formData.email)) {
      setEmailError("Veuillez entrer une adresse email valide");
      return;
    }

    // Validation combinée du mot de passe en une seule condition
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(formData.password)) {
      setError("Le mot de passe doit contenir au moins 8 caractères avec majuscule, minuscule, chiffre et caractère spécial");
      return;
    }

    if (!legalDoc) {
      setError("Veuillez télécharger un document légal");
      return;
    }
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
          firstName: formData.firstName,
          lastName: formData.lastName
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de l'inscription");
      }

      // Inscription réussie - redirection ou affichage d'un message de succès
      const responseLogin = await fetch(`${api}auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await responseLogin.json();

      if (data.message) {
        // notify(2, data.message);
      } else {
        localStorage.setItem("x-access-token", data.access_token);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal modalCentered fade form-sign-in modal-part-content" id="register">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Inscription</div>
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
                <label className="tf-field-label">Nom</label>
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
                <label className="tf-field-label">Prénom</label>
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
                <div className="password-input-wrapper">
                  <input
                    className="tf-field-input tf-input"
                    placeholder=" "
                    type={showPassword ? "text" : "password"}
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <label className="tf-field-label">Mot de passe *</label>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </button>
                </div>
                <div className="password-requirements">
                  <p>Le mot de passe doit contenir :</p>
                  <ul>
                    <li className={formData.password.length >= 8 ? "valid" : ""}>Au moins 8 caractères</li>
                    <li className={/[A-Z]/.test(formData.password) ? "valid" : ""}>Une lettre majuscule</li>
                    <li className={/[a-z]/.test(formData.password) ? "valid" : ""}>Une lettre minuscule</li>
                    <li className={/[0-9]/.test(formData.password) ? "valid" : ""}>Un chiffre</li>
                    <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? "valid" : ""}>Un caractère spécial</li>
                  </ul>
                </div>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                    disabled={isLoading}
                  >
                    {isLoading ? "Traitement..." : "S'inscrire"}
                  </button>
                </div>
                <div className="w-100">
                  <a
                    href="#login"
                    data-bs-toggle="modal"
                    className="btn-link fw-6 w-100 link"
                  >
                    Vous avez déjà un compte ? Connectez-vous ici
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