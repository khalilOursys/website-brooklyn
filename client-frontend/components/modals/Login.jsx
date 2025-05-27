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

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsLoading(true);

    if (!login.trim()) {
      notify(2, "Email cannot be empty."); // Show error message
      return;
    }
    if (!password.trim()) {
      notify(2, "Password cannot be empty."); // Show error message
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

      const data = await response.json(); // <-- you forgot to parse the response!

      if (data.message) {
        notify(2, data.message); // Show error message (added 2 as level like your other notify calls)
      } else {
        localStorage.setItem("x-access-token", data.access_token); // Save token
        setTimeout(() => {
          /* if (data.user.role === "ADMIN")
            window.location.replace("/admin/users");
          else */
          window.location.reload(); // Updated navigation
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      notify(2, "An error occurred during login."); // Handle unexpected errors
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login input change
  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="login"
    >
      <ToastContainer />
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Log in</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="tf-login-form">
            <form
              className=""
              acceptCharset="utf-8"
            >
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  name=""
                  required
                  onChange={handleLoginChange}
                />
                <label className="tf-field-label" htmlFor="">
                  Email *
                </label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  name=""
                  required
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                />
                <label className="tf-field-label" htmlFor="">
                  Password *
                </label>
              </div>
              <div>
                <a
                  href="#forgotPassword"
                  data-bs-toggle="modal"
                  className="btn-link link"
                >
                  Forgot your password?
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
                    <span>Log in</span>
                  </button>
                </div>
                <div className="w-100">
                  <a
                    href="#register"
                    data-bs-toggle="modal"
                    className="btn-link fw-6 w-100 link"
                  >
                    New customer? Create your account
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
