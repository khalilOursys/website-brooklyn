"use client"; // Mark this as a Client Component
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

  // State declarations matching the DTO
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("MANAGER");

  const submitForm = async (event) => {
    // Validation conditions matching DTO
    if (!email || !validateEmail(email)) {
      notify(2, "Please enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      notify(2, "Password must be at least 6 characters long");
      return;
    }

    // Prepare user data according to DTO
    const userData = {
      email,
      password,
      firstName: firstName || "",
      lastName: lastName || "",
      role: role || "MANAGER",
    };

    dispatch(
      addUser(userData)
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "User created successfully");
        setTimeout(() => {
          router.push("/users");
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "An error occurred");
      }
    });
  };

  // Helper function to validate email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const listeUser = () => {
    router.push("/users");
  };

  // Define role options (you might want to import these from your prisma client)
  const roleOptions = ["MANAGER", "ADMIN"];

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
                        <i className="fas fa-list"></i> Back to list
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">{"Add User"}</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>First Name</label>
                                  <Form.Control
                                    value={firstName}
                                    placeholder="First Name"
                                    name="firstName"
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Last Name</label>
                                  <Form.Control
                                    value={lastName}
                                    placeholder="Last Name"
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
                                  <label>Password*</label>
                                  <Form.Control
                                    value={password}
                                    placeholder="Password (min 6 chars)"
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
                                  <label>Role</label>
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
                              Save
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