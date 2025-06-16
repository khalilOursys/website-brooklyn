"use client"; // Mark this as a Client Component
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation'; // Updated import for Next.js 14
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { getHeroBannerById } from "@/Redux/heroBannerReduce";

export default function Page() {
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i> {msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i> {msg}</strong>);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams(); // Use `useParams` if you're using dynamic routes

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null); // Single image preview

  const fetchBrand = useCallback(
    async (id) => {
      const response = await dispatch(getHeroBannerById(id));
      const data = response.payload;
      setName(data?.name);
      setDescription(data.description != null ? data.description : "");
      setImage(data.img != null ? data.img : "");
      setPreview(data.img != null ? data.img : "");
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      fetchBrand(id);
    }
  }, [id, fetchBrand]);
  return (
    <>
      <div className="wrapper">
        <Sidebar brands={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar brands={null} />
          <div className="content">
            <Container fluid>
              <ToastContainer />
              <div className="section-image">
                <Container>
                  <Row>
                    <Col md="12">
                      <Button onClick={() => router.push("/brands")} variant="info">
                        <i className="fas fa-list"></i> Back to Brand List
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">Add Brand</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col md="6">
                                <Form.Group>
                                  <label>Brand Name* </label>
                                  <Form.Control
                                    value={name}
                                    placeholder="Brand Name"
                                    name="name"
                                    className="required"
                                    type="text"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group>
                                  <label>Description* </label>
                                  <Form.Control
                                    value={description}
                                    placeholder="Description"
                                    name="description"
                                    className="required"
                                    type="text"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <Form.Group>
                                  {preview && (
                                    <div className="mt-4 text-center">
                                      <img
                                        src={preview}
                                        alt="Preview"
                                        className="img-fluid rounded"
                                        style={{ height: '200px' }}
                                      />
                                    </div>
                                  )}
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
        </div>
      </div>
    </>
  );
}
