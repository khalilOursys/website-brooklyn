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
import { getBulkProductById } from "@/Redux/bulkProductsReduce";
import dynamic from "next/dynamic";

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
  const [name, setName] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [bulkPrice, setBulkPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [productId, setProductId] = useState(""); // Use null for react-select
  const listeBulkProduct = () => {
    router.push("/bulkProducts"); // Updated navigation
  };

  const fetchBulk = useCallback(
    async (id) => {
      const response = await dispatch(getBulkProductById(id));
      const data = response.payload;

      setBulkPrice(data.bulkPrice);
      setName(data.name);
      setDiscount(data.discount);
      setMinQuantity(data.minQuantity)
      setProductId(data.product.name)
    },
    [dispatch]
  );

  useEffect(() => {
    fetchBulk(id);
  }, []);

  return (
    <>
      <div className="wrapper">
        <Sidebar bulkProducts={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar bulkProducts={null} />

          <div className="content">
            <Container fluid>
              <ToastContainer />
              <div className="section-image">
                <Container>
                  <Row>
                    <Col md="12">
                      <Button onClick={listeBulkProduct} variant="info">
                        <i className="fas fa-list"></i> Retour à la liste
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">{"Ajouter bulk Products"}</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Name* </label>
                                  <Form.Control
                                    value={name}
                                    placeholder="name"
                                    name="name"
                                    className="required"
                                    type="text"
                                    readOnly
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Price* </label>
                                  <Form.Control
                                    value={bulkPrice}
                                    placeholder="bulkPrice"
                                    name="bulkPrice"
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
                                  <label>Product* </label>
                                  <Form.Control
                                    value={productId}
                                    placeholder="Product"
                                    name="Product"
                                    className="required"
                                    type="text"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>MinQuantity* </label>
                                  <Form.Control
                                    value={minQuantity}
                                    placeholder="MinQuantity"
                                    name="MinQuantity"
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
                                  <label>Discount* </label>
                                  <Form.Control
                                    value={discount}
                                    placeholder="discount"
                                    name="discount"
                                    className="required"
                                    type="number"
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