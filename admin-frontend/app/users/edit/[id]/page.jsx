"use client"; // Composant client
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { editUser, getUserById } from "@/Redux/usersReduce";

export default function Page() {
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("MANAGER");

  const fetchUser = useCallback(
    async (id) => {
      const response = await dispatch(getUserById(id));
      const data = response.payload;

      setEmail(data.email);
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setRole(data.role || "MANAGER");
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id, fetchUser]);

  const submitForm = async () => {
    if (!email || !validateEmail(email)) {
      notify(2, "Veuillez entrer une adresse e-mail valide");
      return;
    }

    if (password && password.length < 6) {
      notify(2, "Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    const userData = {
      id,
      email,
      password: password || "",
      firstName: firstName || "",
      lastName: lastName || "",
      role: role || "MANAGER",
    };

    dispatch(
      editUser(userData)
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Utilisateur modifié avec succès");
        setTimeout(() => {
          router.push("/users");
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "Une erreur s'est produite");
      }
    });
  };

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
                            <Card.Title as="h4">Modifier l'utilisateur</Card.Title>
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
                                  <label>E-mail*</label>
                                  <Form.Control
                                    value={email}
                                    placeholder="E-mail"
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
                                  <label>Mot de passe</label>
                                  <Form.Control
                                    value={password}
                                    placeholder="Mot de passe (laisser vide pour ne pas le changer)"
                                    name="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
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
