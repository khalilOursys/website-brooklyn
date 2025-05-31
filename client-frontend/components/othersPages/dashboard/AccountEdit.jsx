"use client";
import Configuration from "@/configuration";
import { useContextElement } from "@/context/Context";
import React, { useState, useEffect } from "react";

export default function AccountEdit() {
  const api = Configuration.BACK_BASEURL;

  const { user, setUser } = useContextElement();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Initialiser les données du formulaire quand le contexte utilisateur est disponible
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Préparer les données à envoyer
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password // Inclure le mot de passe uniquement s'il n'est pas vide
      };

      // Appel de l'API
      const response = await fetch(`${api}users/` + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la mise à jour de l’utilisateur');
      }

      var updatedUser = await response.json();
      updatedUser.cart = user.cart;
      // Mettre à jour le contexte avec les nouvelles données utilisateur
      setUser(updatedUser);
      setSuccess(true);

      // Réinitialiser le champ mot de passe après mise à jour
      setFormData(prev => ({ ...prev, password: '' }));

      // Masquer le message de succès après 3 secondes
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-account-content account-edit">
      <div className="">
        <form
          onSubmit={handleSubmit}
          className=""
          id="form-password-change"
          action="#"
        >
          {error && (
            <div className="alert alert-danger mb-3">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success mb-3">
              Profil mis à jour avec succès !
            </div>
          )}

          <div className="tf-field style-1 mb_15">
            <input
              className="tf-field-input tf-input"
              placeholder=" "
              type="text"
              id="property1"
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
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
              type="text"
              id="property1"
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property1"
            >
              Nom
            </label>
          </div>
          <div className="tf-field style-1 mb_15">
            <input
              className="tf-field-input tf-input"
              placeholder=" "
              type="email"
              autoComplete="abc@xyz.com"
              required
              id="property3"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property3"
            >
              Email
            </label>
          </div>
          <h6 className="mb_20">Changement de mot de passe</h6>
          <div className="tf-field style-1 mb_30">
            <input
              className="tf-field-input tf-input"
              placeholder=" "
              type="password"
              autoComplete="current-password"
              id="property4"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property4"
            >
              Mot de passe (laissez vide pour ne pas changer)
            </label>
          </div>
          <div className="mb_20">
            <button
              type="submit"
              className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
              disabled={loading}
            >
              {loading ? 'Mise à jour en cours...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
