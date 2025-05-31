"use client";
import Configuration from "@/configuration";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/cacher le mot de passe

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!login.trim()) {
      notify(2, "L'email ne peut pas être vide.");
      return;
    }
    if (!password.trim()) {
      notify(2, "Le mot de passe ne peut pas être vide.");
      return;
    }

    try {
      const response = await fetch(`${Configuration.BACK_BASEURL}auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: login, password }),
      });

      const data = await response.json();

      if (data.message) {
        notify(2, data.message);
      } else {
        localStorage.setItem("x-access-token", data.access_token);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      notify(2, "Une erreur est survenue lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  // Basculer l'affichage du mot de passe
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="modal modalCentered fade form-sign-in modal-part-content" id="login">
      <ToastContainer />
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Connexion</div>
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
          </div>
          <div className="tf-login-form">
            <form className="" acceptCharset="utf-8">
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  name=""
                  required
                  onChange={(e) => setLogin(e.target.value)}
                />
                <label className="tf-field-label" htmlFor="">
                  Email *
                </label>
              </div>
              <div className="tf-field style-1">
                <div className="password-input-wrapper">
                  <input
                    className="tf-field-input tf-input"
                    placeholder=" "
                    type={showPassword ? "text" : "password"}
                    name=""
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <label className="tf-field-label" htmlFor="">
                    Mot de passe *
                  </label>
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
              </div>
              <div>
                <a
                  href="#forgotPassword"
                  data-bs-toggle="modal"
                  className="btn-link link"
                >
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="bottom">
                <div className="w-100">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? "Connexion..." : "Se connecter"}</span>
                  </button>
                </div>
                <div className="w-100">
                  <a
                    href="#register"
                    data-bs-toggle="modal"
                    className="btn-link fw-6 w-100 link"
                  >
                    Nouveau client ? Créez votre compte
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