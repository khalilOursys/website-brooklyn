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
import { addBulkProduct, editBulkProduct, getBulkProductById } from "@/Redux/bulkProductsReduce";
import dynamic from "next/dynamic";
import { fetchProducts } from "@/Redux/productsReduce";
const Select = dynamic(() => import('react-select'), {
  ssr: false, // Disable SSR for react-select
});

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
  const [productId, setProductId] = useState(null); // Use null for react-select
  const [products, setProducts] = useState([]);

  const submitForm = async () => {
    // Validation conditions
    if (!name || name.trim() === "") {
      notify(2, "Name is required");
      return;
    }

    if (
      minQuantity === undefined ||
      minQuantity === null ||
      String(minQuantity).trim() === "" ||
      isNaN(Number(minQuantity))
    ) {
      notify(2, "Quantity is required and must be a number");
      return;
    }


    if (
      bulkPrice === undefined ||
      bulkPrice === null ||
      String(bulkPrice).trim() === "" ||
      isNaN(Number(bulkPrice))
    ) {
      notify(2, "bulk Price is required and must be a number");
      return;
    }


    // If all validations pass, proceed with form submission
    dispatch(
      editBulkProduct({
        id,
        name,
        minQuantity,
        bulkPrice,
        productId: productId.value, // Extract value from react-select
        discount
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Modification avec succes");
        setTimeout(() => {
          router.push("/admin/bulkProducts"); // Updated navigation
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "Une erreur est survenue");
      }
    });
  };

  const listeBulkProduct = () => {
    router.push("/admin/bulkProducts"); // Updated navigation
  };

  const getProducts = useCallback(async () => {
    try {
      const response = await dispatch(fetchProducts());

      const data = await response.payload;

      const prodOptions = data.map(prod => ({
        value: prod.id,
        label: prod.name,
      }));

      setProducts(prodOptions);
    } catch (error) {
      console.error("Error fetching products:", error);
      notify(2, "Failed to fetch products");
    }
  }, [dispatch]);

  const fetchBulk = useCallback(
    async (id) => {
      const response = await dispatch(getBulkProductById(id));
      const data = response.payload;

      setBulkPrice(data.bulkPrice);
      setName(data.name);
      setDiscount(data.discount);
      setMinQuantity(data.minQuantity)
      setProductId({
        value: data.product.id,
        label: data.product.name,
      })
    },
    [dispatch]
  );

  useEffect(() => {
    getProducts();
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
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(e) => setBulkPrice(e.target.value)}
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Product* </label>
                                  <Select
                                    options={products}
                                    value={productId}
                                    onChange={(selectedOption) => setProductId(selectedOption)}
                                    placeholder="Select Product"
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
                                    onChange={(e) => setMinQuantity(e.target.value)}
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
                                    onChange={(e) => setDiscount(e.target.value)}
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