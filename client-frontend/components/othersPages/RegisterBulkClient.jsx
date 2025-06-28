"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Configuration from "@/configuration";

export default function RegisterBulkClient() {
  const api = Configuration.BACK_BASEURL;
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    storeName: "",
    telephone: "",
    taxNumber: "",
    rib: "",
  });
  const [legalDoc, setLegalDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [fileName, setFileName] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

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

    if (name === "email") {
      if (!validateEmail(value) && value.length > 0) {
        setEmailError("Veuillez entrer une adresse email valide");
      } else {
        setEmailError("");
      }
    }

    if (name === "telephone") {
      // Allow only numbers and optional + at start
      const cleanedValue = value.replace(/[^0-9+]/g, '');
      if (cleanedValue !== value) {
        // If we had to clean the value, update it
        e.target.value = cleanedValue;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLegalDoc(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Veuillez entrer une adresse email valide");
      setError("Veuillez entrer une adresse email valide");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    if (!legalDoc) {
      setError("Veuillez télécharger un document légal");
      return;
    }

    if (!formData.telephone) {
      setError("Veuillez entrer un numéro de téléphone");
      return;
    }

    if (!formData.taxNumber) {
      setError("Veuillez entrer un matricule fiscale");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("name", `${formData.firstName} ${formData.lastName}`);
      formDataToSend.append("firstName", `${formData.firstName}`);
      formDataToSend.append("lastName", `${formData.lastName}`);
      formDataToSend.append("storeName", formData.storeName);
      formDataToSend.append("telephone", formData.telephone);
      formDataToSend.append("taxNumber", formData.taxNumber);
      formDataToSend.append("rib", formData.rib);
      formDataToSend.append("legalDocs", "");
      formDataToSend.append("file", legalDoc);

      const response = await fetch(`${api}bulkClientRequests/bulk-signup`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de l'inscription");
      }
      setTimeout(() => {
        window.location.replace("/login");
      }, 1500);
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
        // notify(2, data.message);
      } else {
        localStorage.setItem("x-access-token", data.access_token);
        setTimeout(() => {
          window.location.replace("/");
        }, 1500);
      } */
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'inscription");
    } finally {
      setIsLoading(false);
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
                  className={`tf-field-input tf-input ${emailError ? 'is-invalid' : ''}`}
                  placeholder=" "
                  type="email"
                  id="property3"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="property3"
                >
                  Email *
                </label>
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="telephone"
                >
                  Téléphone *
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="taxNumber"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleInputChange}
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="taxNumber"
                >
                  matricule fiscale *
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="rib"
                  name="rib"
                  value={formData.rib}
                  onChange={handleInputChange}
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="rib"
                >
                  RIB (optionnel)
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
              <div className="tf-field style-1 mb_15">
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
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                />
                <label className="tf-field-label">Nom du magasin *</label>
              </div>
              <div className="tf-field style-1 mb_30">
                <div className="file-upload-wrapper">
                  <label className="file-upload-label">
                    <span>Téléverser le RNE et le CIN dans un seul fichier PDF</span>
                    <div className="file-input-grid">
                      <div className="file-upload-button-col">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="file-upload-input"
                        />
                        <div className="file-upload-button">Choisire un fichier</div>
                      </div>
                      <div className="file-name-col">
                        {fileName && <span className="file-name-display">{fileName}</span>}
                      </div>
                    </div>
                  </label>
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