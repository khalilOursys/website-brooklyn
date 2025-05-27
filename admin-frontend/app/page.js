"use client"; // Mark this as a Client Component

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import Image from "next/image"; // Use Next.js Image component
import { loginFetch } from "@/Redux/usersReduce";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export default function Home() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [cardClasses, setCardClasses] = useState("card-hidden");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    i18n.changeLanguage("en");
    setTimeout(() => {
      setCardClasses("");
    }, 1000);
  }, []);

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!login.trim()) {
      notifyErr(t("loginPage.email") + " " + t("loginPage.error"));
      return;
    }
    if (!password.trim()) {
      notifyErr(t("loginPage.password") + " " + t("loginPage.error"));
      return;
    }

    setIsLoading(true);

    try {
      const result = await dispatch(
        loginFetch({ email: login, password: password })
      );
      const data = result.payload;

      if (data.message) {
        notifyErr(data.message);
      } else {
        localStorage.setItem("x-access-token", data.access_token);
        localStorage.setItem("user", data.user);
        window.location.replace("/users");
      }
    } catch (error) {
      notifyErr(t("loginPage.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-page full-gray section-image" data-color="black">
        <Row>
          <Col className="hiddenMobile" lg="3" md="4" sm="4" xs="3">
            <div className="img-log">
              <Image
                src="/images/logo.png"
                alt="oursys"
                width={150}
                height={50}
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
                        <h3 className="header text-center">
                          {t("loginPage.title")}
                        </h3>
                        <br />
                        <p className="header text-center">
                          {t("loginPage.title")}
                        </p>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group>
                          <label>{t("loginPage.email")}</label>
                          <Form.Control
                            placeholder={t("loginPage.email")}
                            type="text"
                            value={login}
                            onChange={handleLoginChange}
                            onKeyPress={handleEnterKeyPress}
                          />
                        </Form.Group>
                        <Form.Group>
                          <label>{t("loginPage.password")}</label>
                          <Form.Control
                            placeholder={t("loginPage.password")}
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            onKeyPress={handleEnterKeyPress}
                          />
                        </Form.Group>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <Button
                          className="btn-wd"
                          type="button"
                          variant="success"
                          onClick={handleSubmit}
                          disabled={isLoading}
                        >
                          {isLoading
                            ? t("loginPage.loading")
                            : t("loginPage.submit")}
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
