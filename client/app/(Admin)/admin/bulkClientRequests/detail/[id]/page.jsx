"use client"; // Mark this as a Client Component
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
import { editUser, getUserById } from "@/Redux/usersReduce";
import { getUserWithBulkRequest } from "@/Redux/bulkClientRequestsReduce";

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

  // State declarations
  const [fullname, setFullname] = useState("");
  const [legalDocs, setLegalDocs] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CLIENT");
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(
    async (id) => {
      try {
        setLoading(true);
        const response = await dispatch(getUserWithBulkRequest(id));
        const data = await response.payload;
        setFullname(data.name);
        setEmail(data.email);
        setStoreName(data.bulkRequests?.storeName || "");
        setLegalDocs(data.bulkRequests?.legalDocs || "");
      } catch (error) {
        notify(2, "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id, fetchUser]);

  const listeUser = () => {
    router.push("/admin/bulkClientRequests");
  };

  const handleDownloadDocument = () => {
    if (!legalDocs) {
      notify(2, "No document available to download");
      return;
    }

    try {
      // Assuming legalDocs is a URL to the document
      const link = document.createElement('a');
      link.href = legalDocs;
      link.target = '_blank';
      link.download = `document_${fullname || 'user'}.pdf`; // You can adjust the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      notify(2, "Failed to download document");
    }
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
                                  <label>Store name* </label>
                                  <Form.Control
                                    value={storeName}
                                    placeholder="role"
                                    className="required"
                                    name="role"
                                    readOnly
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                              <Col className="pr-1" md="12">
                                <Form.Group>
                                  <label>Document </label>
                                  <div className="d-flex align-items-center">
                                    {/* <Form.Control
                                      value={legalDocs ? "Document available" : "No document"}
                                      placeholder="Document"
                                      className="required"
                                      readOnly
                                    /> */}
                                    {legalDocs && (
                                      <Button
                                        variant="success"
                                        className="ml-2"
                                        onClick={handleDownloadDocument}
                                        disabled={loading}
                                      >
                                        <i className="fas fa-download"></i> Download
                                      </Button>
                                    )}
                                  </div>
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