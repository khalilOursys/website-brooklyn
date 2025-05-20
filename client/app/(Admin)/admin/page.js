"use client"; // Mark this as a Client Component

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import Image from "next/image"; // Use Next.js Image component
import { loginFetch } from "@/Redux/usersReduce";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const dispatch = useDispatch();
  const [cardClasses, setCardClasses] = useState("card-hidden");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Show error notification
  /* const notifyErr = (msg) =>
    toast.error(
      <strong>
        <i className="fas fa-exclamation-circle"></i>
        {msg}
      </strong>
    ); */
  const notifyErr = (msg) => {
    toast.error(
      <strong>
        <i className="fas fa-exclamation-circle"></i>
        {msg}
      </strong>
    );
  };

  // Animate card appearance
  useEffect(() => {
    setTimeout(() => {
      setCardClasses("");
    }, 1000);
  }, []);

  // Handle login input change
  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle Enter key press
  const handleEnterKeyPress = (event) => {
    if (event.charCode === 13) {
      event.preventDefault(); // Prevent form submission
      handleSubmit();
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault(); // Prevent default form submission
    }

    // Check if login (email) or password is empty
    if (!login.trim()) {
      notifyErr("Email cannot be empty."); // Show error message
      return;
    }
    if (!password.trim()) {
      notifyErr("Password cannot be empty."); // Show error message
      return;
    }

    window.location.replace("/admin/users"); // Redirect to profile page
    /* try {
      const result = await dispatch(
        loginFetch({ email: login, password: password })
      );
      const data = result.payload;

      if (data.message) {
        notifyErr(data.message); // Show error message
      } else {
        localStorage.setItem("x-access-token", data.access_token); // Save token to localStorage
        localStorage.setItem("user", data.user); // Save token to localStorage
        window.location.replace("/admin/users"); // Redirect to profile page
      }
    } catch (error) {
      notifyErr("An error occurred during login."); // Handle unexpected errors
    } */
  };

  return (
    <>
      <ToastContainer />
      <div className="login-page full-gray section-image" data-color="black">
        <Row>
          <Col className="hiddenMobile" lg="3" md="4" sm="4" xs="3">
            <div className="img-log">
              <Image
                src="/img/logo.png" // Use absolute path for images in the public folder
                alt="oursys"
                width={150} // Set appropriate width
                height={50} // Set appropriate height
              />
            </div>
          </Col>
          <Col lg="9">
            <div className="block-log">
              <Row>
                <Col className="mx-auto" lg="5" md="8" sm="10" xs="8">
                  <Form className="form">
                    <Card className={`card-login ${cardClasses}`}>
                      <Card.Header>
                        <h3 className="header text-center">Connectez-vous</h3>
                        <br />
                        <p className="header text-center">
                          Connectez-vous pour accéder à votre espace
                        </p>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group>
                          <label>Login</label>
                          <Form.Control
                            placeholder="Login"
                            type="text"
                            value={login}
                            onChange={handleLoginChange}
                            onKeyPress={handleEnterKeyPress}
                          />
                        </Form.Group>
                        <Form.Group>
                          <label>Mot de passe</label>
                          <Form.Control
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            onKeyPress={handleEnterKeyPress}
                          />
                        </Form.Group>
                      </Card.Body>
                      <Card.Footer className="ml-auto mr-auto">
                        <Button
                          className="btn-wd"
                          type="button"
                          variant="success"
                          onClick={handleSubmit}
                        >
                          Connexion
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
