"use client"; // Marque ce composant comme un composant Client
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation'; // Import mis à jour pour Next.js 14
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { addBulkProduct, editBulkProduct, getBulkProductById } from "@/Redux/bulkProductsReduce";
import dynamic from "next/dynamic";
import { fetchProducts } from "@/Redux/productsReduce";
const Select = dynamic(() => import('react-select'), {
  ssr: false, // Désactive SSR pour react-select
});

export default function Page() {
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };

  const dispatch = useDispatch();
  const router = useRouter(); // Hook mis à jour
  const { id } = useParams(); // Utilise `useParams` pour les routes dynamiques

  // Déclarations d'état
  const [name, setName] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [bulkPrice, setBulkPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [productId, setProductId] = useState(null); // Utilise null pour react-select
  const [products, setProducts] = useState([]);

  const submitForm = async () => {
    // Conditions de validation
    if (!name || name.trim() === "") {
      notify(2, "Le nom est requis");
      return;
    }

    if (
      minQuantity === undefined ||
      minQuantity === null ||
      String(minQuantity).trim() === "" ||
      isNaN(Number(minQuantity))
    ) {
      notify(2, "La quantité est requise et doit être un nombre");
      return;
    }

    if (
      bulkPrice === undefined ||
      bulkPrice === null ||
      String(bulkPrice).trim() === "" ||
      isNaN(Number(bulkPrice))
    ) {
      notify(2, "Le prix en gros est requis et doit être un nombre");
      return;
    }

    // Si toutes les validations passent, procéder à la soumission du formulaire
    dispatch(
      editBulkProduct({
        id,
        name,
        minQuantity,
        bulkPrice,
        productId: productId.value, // Extrait la valeur de react-select
        discount
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        /* notify(1, "Modification réussie"); */
        notify(1, "Produit en gros modifier avec succès !");
        setTimeout(() => {
          router.push("/bulkProducts"); // Navigation mise à jour
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "Une erreur est survenue");
      }
    });
  };

  const listeBulkProduct = () => {
    router.push("/bulkProducts"); // Navigation mise à jour
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
      console.error("Erreur lors de la récupération des produits:", error);
      notify(2, "Échec de la récupération des produits");
    }
  }, [dispatch]);

  const fetchBulk = useCallback(
    async (id) => {
      const response = await dispatch(getBulkProductById(id));
      const data = response.payload;

      setBulkPrice(data.bulkPrice);
      setName(data.name);
      setDiscount(data.discount ? data.discount : 0);
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
                            <Card.Title as="h4">{"Modifier un produit en gros"}</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Nom* </label>
                                  <Form.Control
                                    value={name}
                                    placeholder="Nom"
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
                                  <label>Prix* </label>
                                  <Form.Control
                                    value={bulkPrice}
                                    placeholder="Prix en gros"
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
                                  <label>Produit* </label>
                                  <Select
                                    options={products}
                                    value={productId}
                                    onChange={(selectedOption) => setProductId(selectedOption)}
                                    placeholder="Sélectionner un produit"
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Quantité minimale* </label>
                                  <Form.Control
                                    value={minQuantity}
                                    placeholder="Quantité minimale"
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
                                  <label>Remise* </label>
                                  <Form.Control
                                    value={discount}
                                    placeholder="Remise"
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
                              Mettre à jour
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