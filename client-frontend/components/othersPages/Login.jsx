"use client";
import React, { useState } from "react";
import Link from "next/link";
import Configuration from "@/configuration";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!login.trim()) {
      notify(2, "L'email ne peut pas être vide.");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      notify(2, "Le mot de passe ne peut pas être vide.");
      setIsLoading(false);
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
          window.location.replace("/");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      notify(2, "Une erreur est survenue lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="flat-spacing-10">
      <ToastContainer />
      <div className="container">
        <div className="tf-grid-layout lg-col-2 tf-login-wrap">
          <div className="tf-login-form">
            <div id="recover">
              <h5 className="mb_24">Réinitialiser votre mot de passe</h5>
              <p className="mb_30">
                Nous vous enverrons un email pour réinitialiser votre mot de passe
              </p>
              <div>
                <form onSubmit={(e) => e.preventDefault()} className="">
                  <div className="tf-field style-1 mb_15">
                    <input
                      className="tf-field-input tf-input"
                      placeholder=""
                      required
                      type="email"
                      autoComplete="abc@xyz.com"
                      id="property3"
                      name="email"
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property3"
                    >
                      Email *
                    </label>
                  </div>
                  <div className="mb_20">
                    <a href="#login" className="tf-btn btn-line">
                      Annuler
                    </a>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                    >
                      Réinitialiser le mot de passe
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div id="login">
              <h5 className="mb_36">Connexion</h5>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="tf-field style-1 mb_15">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=""
                      type="email"
                      autoComplete="abc@xyz.com"
                      id="property3"
                      name="email"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property3"
                    >
                      Email *
                    </label>
                  </div>
                  <div className="tf-field style-1 mb_30">
                    <div className="password-input-wrapper">
                      <input
                        required
                        className="tf-field-input tf-input"
                        placeholder=""
                        type={showPassword ? "text" : "password"}
                        id="property4"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label
                        className="tf-field-label fw-4 text_black-2"
                        htmlFor="property4"
                      >
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
                  <div className="mb_20">
                    <a href="#recover" className="tf-btn btn-line">
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                      disabled={isLoading}
                    >
                      {isLoading ? "Connexion..." : "Se connecter"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="tf-login-content">
            <h5 className="mb_36">Je suis nouveau ici</h5>
            <p className="mb_20">
              Inscrivez-vous pour un accès anticipé aux soldes ainsi qu'à des nouvelles arrivées, tendances
              et promotions personnalisées. Pour vous désinscrire, cliquez sur le lien dans nos emails.
            </p>
            <Link href={`/register`} className="tf-btn btn-line">
              S'inscrire
              <i className="icon icon-arrow1-top-left" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}