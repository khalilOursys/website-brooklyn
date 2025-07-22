// app/reset-password/ResetPasswordClient.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Configuration from '@/configuration';
import Footer2 from '@/components/footers/Footer2';
import Header2 from '@/components/headers/Header2';
import Topbar1 from '@/components/headers/Topbar1';

export default function ResetPasswordClient() {
  const api = Configuration.BACK_BASEURL;
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('Jeton de réinitialisation manquant');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const response = await fetch(`${api}auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: data.message, type: 'success' });
      } else {
        setMessage({ text: data.message || 'Erreur inconnue', type: 'error' });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "L'inscription a échoué");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const checkPasswordStrength = (password) => {
    if (password.length === 0) return '';
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 6) return 'Faible';
    else if (password.length < 8 || !(hasLetters && hasNumbers)) return 'Moyen';
    else if (hasLetters && hasNumbers && hasSpecialChars) return 'Fort';
    else return 'Moyen';
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'Faible':
        return 'text-danger';
      case 'Moyen':
        return 'text-warning';
      case 'Fort':
        return 'text-success';
      default:
        return 'text-muted';
    }
  };

  return (
    <>
      <Topbar1 />
      <Header2 />

      <section className="flat-spacing-10">
        <div className="container">
          <div className="form-register-wrap">
            <div className="flat-title align-items-start gap-0 mb_30 px-0">
              <h5 className="mb_18">Réinitialiser le mot de passe</h5>
            </div>
            <div>
              <form onSubmit={handleSubmit} id="register-form" method="post">
                <div className="tf-field style-1 mb_15">
                  <div className="password-input-wrapper">
                    <input
                      className="tf-field-input tf-input"
                      type={showPassword ? 'text' : 'password'}
                      id="property4"
                      name="password"
                      placeholder=" "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <label htmlFor="property4" className="tf-field-label fw-4 text_black-2">
                      Mot de passe *
                    </label>
                    <button type="button" className="password-toggle" onClick={toggleShowPassword}>
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {password && (
                    <div className={`mt-2 small ${getPasswordStrengthColor()}`}>
                      Force du mot de passe: {passwordStrength}
                    </div>
                  )}
                </div>

                <div className="tf-field style-1 mb_30">
                  <div className="password-input-wrapper">
                    <input
                      className="tf-field-input tf-input"
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="property5"
                      name="confirmPassword"
                      placeholder=" "
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <label htmlFor="property5" className="tf-field-label fw-4 text_black-2">
                      Confirmer le mot de passe *
                    </label>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={toggleShowConfirmPassword}
                    >
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                {error && <div className="alert alert-danger mb_20">{error}</div>}
                {message.text && (
                  <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb_20`}>
                    {message.text}
                  </div>
                )}

                <div className="mb_20">
                  <button
                    type="submit"
                    className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Traitement en cours...' : 'Réinitialiser le mot de passe'}
                  </button>
                </div>

                <div className="text-center">
                  <Link href="/login" className="tf-btn btn-line">
                    Retour à la connexion <i className="icon icon-arrow1-top-left" />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer2 />
    </>
  );
}
