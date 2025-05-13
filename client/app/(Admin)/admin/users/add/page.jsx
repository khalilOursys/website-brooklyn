"use client"; // Mark this as a Client Component
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation'; // Updated import for Next.js 14
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { addUser } from "@/Redux/usersReduce";

export default function Page() {
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };

  const dispatch = useDispatch();
  const router = useRouter(); // Updated hook

  // State declarations
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENT");

  const submitForm = async (event) => {

    // Validation conditions
    if (!fullname || fullname.trim() === "") {
      notify(2, "Fullname is required");
      return;
    }

    if (!email || !validateEmail(email)) {
      notify(2, "Please enter a valid email address");
      return;
    }

    if (!password || password.length < 8) {
      notify(2, "Password must be at least 8 characters long");
      return;
    }

    // If all validations pass, proceed with form submission
    dispatch(
      addUser({
        name: fullname,
        email,
        password,
        role,
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Insertion avec succes");
        setTimeout(() => {
          router.push("/admin/users"); // Updated navigation
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "Une erreur est survenue");
      }
    });
  };

  // Helper function to validate email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const listeUser = () => {
    router.push("/admin/users"); // Updated navigation
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar users={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar users={null} />

          <div className="content">
            <Container fluid>
              <ToastContainer />
              <div className="section-image">
                <Container>
                  <Row>
                    <Col md="12">
                      <Button onClick={listeUser} variant="info">
                        <i className="fas fa-list"></i> Retour à la liste
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">{"Ajouter utilisateur"}</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Nom et Prenom* </label>
                                  <Form.Control
                                    value={fullname}
                                    placeholder="fullname"
                                    name="fullname"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setFullname(e.target.value)}
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>E-mail* </label>
                                  <Form.Control
                                    value={email}
                                    placeholder="E-mail"
                                    name="Email"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Password* </label>
                                  <Form.Control
                                    value={password}
                                    placeholder="Password"
                                    className="required"
                                    name="Password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Button className="btn-fill pull-right" type="button" variant="info" onClick={submitForm}>
                              Enregistrer
                            </Button>
                            <div className="clearfix"></div>
                          </Card.Body>
                        </Card>
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Container>
          </div>
          <Footer />
          <div
            className="close-layer"
            onClick={() =>
              document.documentElement.classList.toggle("nav-open")
            }
          />
        </div>
      </div>
    </>
  );
}