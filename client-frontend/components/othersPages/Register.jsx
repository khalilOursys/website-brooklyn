"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Configuration from "@/configuration";

export default function Register() {
  const router = useRouter();
  const api = Configuration.BACK_BASEURL;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    telephone: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) return "";

    // Check password strength
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 6) {
      return "Faible";
    } else if (password.length < 8 || !(hasLetters && hasNumbers)) {
      return "Moyen";
    } else if (hasLetters && hasNumbers && hasSpecialChars) {
      return "Fort";
    } else {
      return "Moyen";
    }
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(formData.email)) {
      setError("Veuillez entrer une adresse email valide");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setIsLoading(false);
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
          lastName: formData.lastName,
          telephone: formData.telephone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "L'inscription a échoué");
      }

      router.push("/login");

      // Inscription réussie - connexion automatique
      /* const responseLogin = await fetch(`${api}auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await responseLogin.json();

      if (data.message) {
        setError(data.message);
      } else {
        localStorage.setItem("x-access-token", data.access_token);
        router.push("/login"); // Redirection vers la page d'accueil
      } */
    } catch (err) {
      setError(err instanceof Error ? err.message : "L'inscription a échoué");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "Faible":
        return "text-danger";
      case "Moyen":
        return "text-warning";
      case "Fort":
        return "text-success";
      default:
        return "text-muted";
    }
  };

  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="form-register-wrap">
          <div className="flat-title align-items-start gap-0 mb_30 px-0">
            <h5 className="mb_18">Inscription</h5>
            <p className="text_black-2">
              Inscrivez-vous pour un accès anticipé aux soldes ainsi que pour recevoir les nouveautés, tendances et promotions personnalisées. Pour vous désabonner, cliquez sur désinscrire dans nos emails.
            </p>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className=""
              id="register-form"
              action="#"
              method="post"
              acceptCharset="utf-8"
              data-mailchimp="true"
            >
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="property2"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="property2"
                >
                  Nom
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="property1"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="property1"
                >
                  Prénom
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  autoComplete="email"
                  id="property3"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="property3"
                >
                  Email *
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="property12"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="property12"
                >
                  Téléphone
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <div className="password-input-wrapper">
                  <input
                    className="tf-field-input tf-input"
                    placeholder=" "
                    type={showPassword ? "text" : "password"}
                    id="property4"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    required
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
                {formData.password && (
                  <div className={`mt-2 small ${getPasswordStrengthColor()}`}>
                    Force du mot de passe: {passwordStrength}
                  </div>
                )}
              </div>
              <div className="tf-field style-1 mb_30">
                <div className="password-input-wrapper">
                  <input
                    className="tf-field-input tf-input"
                    placeholder=" "
                    type={showConfirmPassword ? "text" : "password"}
                    id="property5"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    required
                  />
                  <label
                    className="tf-field-label fw-4 text_black-2"
                    htmlFor="property5"
                  >
                    Confirmer le mot de passe *
                  </label>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </button>
                </div>
              </div>

              {error && <div className="alert alert-danger mb_20">{error}</div>}

              <div className="mb_20">
                <button
                  type="submit"
                  className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                  disabled={isLoading}
                >
                  {isLoading ? "Traitement en cours..." : "S'inscrire"}
                </button>
              </div>
              <div className="text-center">
                <Link href={`/login`} className="tf-btn btn-line">
                  Vous avez déjà un compte ? Connectez-vous ici
                  <i className="icon icon-arrow1-top-left" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}