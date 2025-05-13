"use client"; // Mark this as a Client Component
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation'; // Updated import for Next.js 14
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
import { editUser, getUserById } from "@/Redux/usersReduce";

export default function Page() {
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };

  const dispatch = useDispatch();
  const router = useRouter(); // Updated hook
  const { id } = useParams(); // Use `useParams` if you're using dynamic routes

  // State declarations
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENT");
  const [options, setOptions] = useState([{ value: "", label: "CLIENT", isDisabled: true }]);

  const fetchUser = useCallback(
    async (id) => {
      const response = await dispatch(getUserById(id));
      const data = response.payload;

      setEmail(data.email);
      setRole(data.role);
      if (data?.name != null) {
        setFullname(data.name);
      } else {
        setFullname(""); // Set a default value (e.g., empty string) if fullname is null or undefined
      }
      /* setRole({ value: data.role.id, label: data.role.name, role: data.role }); */
    },
    [dispatch]
  );

  useEffect(() => {
    fetchUser(id);
  }, [id, fetchUser]);

  // Helper function to validate email

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
                            <Card.Title as="h4">{id ? "Détail utilisateur" : "Ajouter utilisateur"}</Card.Title>
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
                                    readOnly
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
                                    readOnly
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Role* </label>
                                  <Form.Control
                                    value={role}
                                    placeholder="role"
                                    className="required"
                                    name="role"
                                    readOnly
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                            </Row>
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
