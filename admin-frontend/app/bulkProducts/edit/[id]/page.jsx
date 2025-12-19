"use client";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { addBulkProduct, editBulkProduct, getBulkProductById } from "@/Redux/bulkProductsReduce";
import dynamic from "next/dynamic";
import { fetchProducts } from "@/Redux/productsReduce";
import Configuration from "@/configuration";

const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

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

  // États existants
  const [name, setName] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [bulkPrice, setBulkPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState([]);

  // États pour les villes
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

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

    // Validation des villes
    if (selectedCities.length === 0) {
      notify(2, "Veuillez sélectionner au moins une ville");
      return;
    }

    if (!productId) {
      notify(2, "Le produit est requis");
      return;
    }

    // Préparation des données selon le schéma
    const bulkProductData = {
      id,
      name: name.trim(),
      minQuantity: parseInt(minQuantity),
      bulkPrice: parseFloat(bulkPrice),
      productId: productId.value,
      discount: discount ? parseFloat(discount) : 0,
      bulkProductCities: selectedCities.map(city => ({
        cityId: city.value
      }))
    };

    try {
      dispatch(
        editBulkProduct(bulkProductData)
      ).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          notify(1, "Produit en gros modifié avec succès !");
          setTimeout(() => {
            router.push("/bulkProducts");
          }, 1500);
        } else if (action.meta.requestStatus === "rejected") {
          notify(2, action.payload.message || "Une erreur est survenue");
        }
      });
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      notify(2, "Une erreur est survenue lors de la modification");
    }
  };

  const listeBulkProduct = () => {
    router.push("/bulkProducts");
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

  // Récupérer les villes
  const getCities = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}cities`);
      if (!response.ok) throw new Error('Échec du chargement des villes');
      const data = await response.json();
      const cityOptions = data.map(city => ({
        value: city.id,
        label: city.name,
      }));
      setCities(cityOptions);
    } catch (error) {
      console.error("Erreur lors de la récupération des villes:", error);
      notify(2, "Échec de la récupération des villes");
    }
  }, []);

  const fetchBulk = useCallback(
    async (id) => {
      try {
        const response = await dispatch(getBulkProductById(id));
        const data = response.payload;

        setBulkPrice(data.bulkPrice);
        setName(data.name);
        setDiscount(data.discount ? data.discount : 0);
        setMinQuantity(data.minQuantity);
        setProductId({
          value: data.product.id,
          label: data.product.name,
        });

        // Pré-remplir les villes sélectionnées
        if (data.bulkProductCities && data.bulkProductCities.length > 0) {
          const selectedCityOptions = data.bulkProductCities.map(cityRelation => ({
            value: cityRelation.city.id,
            label: cityRelation.city.name,
          }));
          setSelectedCities(selectedCityOptions);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du produit en gros:", error);
        notify(2, "Échec de la récupération du produit en gros");
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getProducts();
    getCities();
    if (id) {
      fetchBulk(id);
    }
  }, [id, getProducts, getCities, fetchBulk]);

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
                                  <label>Quantité minimale * </label>
                                  <Form.Control
                                    value={minQuantity}
                                    placeholder="Quantité minimale"
                                    name="minQuantity"
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
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Villes *</label>
                                  <Select
                                    options={cities}
                                    value={selectedCities}
                                    onChange={(selectedOptions) => setSelectedCities(selectedOptions || [])}
                                    isMulti
                                    placeholder="Sélectionner une ou plusieurs villes"
                                    closeMenuOnSelect={false}
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Button className="btn-fill pull-right mt-3" type="button" variant="info" onClick={submitForm}>
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