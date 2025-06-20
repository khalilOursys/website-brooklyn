"use client"; // Marquer ce composant comme un composant client
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation';
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
  const router = useRouter();

  // États correspondant au DTO
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("MANAGER");

  const submitForm = async (event) => {
    // Validation selon les champs du DTO
    if (!email || !validateEmail(email)) {
      notify(2, "Veuillez entrer une adresse e-mail valide");
      return;
    }

    if (!password || password.length < 6) {
      notify(2, "Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    // Préparer les données utilisateur
    const userData = {
      email,
      password,
      firstName: firstName || "",
      lastName: lastName || "",
      telephone: telephone || "",
      role: role || "MANAGER",
    };

    dispatch(
      addUser(userData)
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Utilisateur créé avec succès");
        setTimeout(() => {
          router.push("/users");
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "Une erreur s'est produite");
      }
    });
  };

  // Fonction utilitaire de validation email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const listeUser = () => {
    router.push("/users");
  };

  const roleOptions = ["MANAGER", "ADMIN", "CLIENT"];

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
                            <Card.Title as="h4">Ajouter un utilisateur</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Prénom</label>
                                  <Form.Control
                                    value={firstName}
                                    placeholder="Prénom"
                                    name="firstName"
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Nom</label>
                                  <Form.Control
                                    value={lastName}
                                    placeholder="Nom"
                                    name="lastName"
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Email*</label>
                                  <Form.Control
                                    value={email}
                                    placeholder="Adresse e-mail"
                                    name="email"
                                    className="required"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Mot de passe*</label>
                                  <Form.Control
                                    value={password}
                                    placeholder="Mot de passe (min 6 caractères)"
                                    className="required"
                                    name="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Rôle</label>
                                  <Form.Select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                  >
                                    {roleOptions.map((roleValue) => (
                                      <option key={roleValue} value={roleValue}>
                                        {roleValue}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Téléphone</label>
                                  <Form.Control
                                    value={telephone}
                                    placeholder="Téléphone"
                                    name="telephone"
                                    type="text"
                                    onChange={(e) => setTelephone(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Button
                              className="btn-fill pull-right"
                              type="button"
                              variant="info"
                              onClick={submitForm}
                            >
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
