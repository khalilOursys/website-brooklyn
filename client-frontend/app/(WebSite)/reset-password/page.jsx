// app/reset-password/page.jsx
'use client'; // Mark as a Client Component

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Footer2 from '@/components/footers/Footer2';
import Header4 from '@/components/headers/Header4';
import Configuration from '@/configuration';

export default function ResetPasswordPage() {
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
  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      /* setError({ text: 'Missing reset token', type: 'error' }); */
      setError("Jeton de réinitialisation manquant");
      return;
    }

    if (password !== confirmPassword) {
      /* setError({ text: 'Passwords do not match', type: 'error' }); */
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(`${api}auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          /* text: 'Réinitialisation du mot de passe réussie ! Redirection vers la connexion...', */
          text: data.message,
          type: 'success'
        });
        // Redirect to login after 3 seconds
        /* setTimeout(() => {
          router.push('/login');
        }, 3000); */
      } else {
        setMessage({
          text: data.message || 'Error resetting password',
          type: 'error'
        });
      }
    } catch (error) {

      setError(error instanceof Error ? error.message : "L'inscription a échoué");
      /* setMessage({
        text: 'An error occurred. Please try again.',
        type: 'error'
      }); */
    } finally {
      setIsLoading(false);
    }
  };


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);
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
    <>
      <Header4 />
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Reset Your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please enter your new password
            </p>
          </div>

          {message.text && (
            <div className={`p-4 rounded-md ${message.type === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
              }`}>
              {message.text}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="password" className="sr-only">New Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !token}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading || !token ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div> */}

      <section className="flat-spacing-10">
        <div className="container">
          <div className="form-register-wrap">
            <div className="flat-title align-items-start gap-0 mb_30 px-0">
              <h5 className="mb_18">Réinitialiser le mot de passe</h5>
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
                  <div className="password-input-wrapper">
                    <input
                      className="tf-field-input tf-input"
                      placeholder=" "
                      type={showPassword ? "text" : "password"}
                      id="property4"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      placeholder=" "
                      type={showConfirmPassword ? "text" : "password"}
                      id="property5"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                {message.text && (
                  <div className="alert alert-success mb_20">{message.text}</div>
                )}
                <div className="mb_20">
                  <button
                    type="submit"
                    className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                    disabled={isLoading}
                  >
                    {isLoading ? "Traitement en cours..." : "Réinitialiser le mot de passe"}
                  </button>
                </div>
                <div className="text-center">
                  <Link href={`/login`} className="tf-btn btn-line">
                    Retour à la connexion
                    <i className="icon icon-arrow1-top-left" />
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