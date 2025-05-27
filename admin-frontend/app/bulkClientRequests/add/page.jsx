"use client"; // Mark this as a Client Component
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import Configuration from "@/configuration";

export default function Page() {
  const api = Configuration.BACK_BASEURL;
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef(null);

  // State declarations matching the DTO
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [legalDocs, setLegalDocs] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validation conditions matching DTO
    if (!email || !validateEmail(email)) {
      notify(2, "Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    if (!password || password.length < 6) {
      notify(2, "Password must be at least 6 characters long");
      setIsSubmitting(false);
      return;
    }

    if (!storeName) {
      notify(2, "Store name is required");
      setIsSubmitting(false);
      return;
    }

    if (!legalDocs) {
      notify(2, "Legal documents are required");
      setIsSubmitting(false);
      return;
    }

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('storeName', storeName);
    formData.append("legalDocs", "");
    formData.append("file", legalDocs);
    if (firstName) formData.append('firstName', firstName);
    if (lastName) formData.append('lastName', lastName);
    const response = await fetch(`${api}bulkClientRequests/bulk-signup`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      notify(2, errorData.message || "An error occurred");
      throw new Error(errorData.message || "An error occurred");
    } else {
      notify(1, "Bulk client created successfully");
      setTimeout(() => {
        router.push("/bulkClientRequests");
      }, 1500);
    }

    /* try {
      const action = await dispatch(addUser(formData));

      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Bulk client created successfully");
        setTimeout(() => {
          router.push("/users");
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "An error occurred");
      }
    } catch (error) {
      notify(2, error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    } */
  };

  // Helper function to validate email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLegalDocs(file);
    }
  };

  const listeUser = () => {
    router.push("/users");
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
                        <i className="fas fa-list"></i> Back to list
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">{"Add Bulk Client"}</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Store Name*</label>
                                  <Form.Control
                                    value={storeName}
                                    placeholder="Store Name"
                                    name="storeName"
                                    type="text"
                                    onChange={(e) => setStoreName(e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
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
                            </Row>
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
                              <Col className="pr-1" md="12">
                                <Form.Group>
                                  <label>Legal Documents*</label>
                                  <Form.Control
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    required
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                  />
                                  <Form.Text className="text-muted">
                                    Upload legal documents (PDF, DOC, JPG, PNG)
                                  </Form.Text>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Button
                              className="btn-fill pull-right"
                              type="button"
                              variant="info"
                              onClick={submitForm}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                  <span className="sr-only">Saving...</span>
                                </>
                              ) : (
                                "Save"
                              )}
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