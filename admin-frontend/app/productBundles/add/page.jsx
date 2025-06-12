"use client";
import { Button, Card, Container, Row, Col, Form, Table } from "react-bootstrap";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { useDropzone } from "react-dropzone";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Configuration from "@/configuration";

export default function CreateProductBundle() {
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i> {msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i> {msg}</strong>);
  };

  const router = useRouter();
  const api = Configuration.BACK_BASEURL;

  const [formData, setFormData] = useState({
    name: "",
    discount: 0,
    expiresAt: null,
    img: "",
    products: []
  });

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${api}products`);
        if (!response.ok) throw new Error('Échec du chargement des produits');
        const data = await response.json();
        setProducts(data.map(product => ({
          value: product.id,
          label: product.name
        })));
      } catch (error) {
        console.error('Erreur:', error);
        notify(2, 'Échec du chargement des produits');
      }
    };
    fetchProducts();
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      notify(2, "Le nom du pack est requis");
      return;
    }

    if (formData.discount < 0 || formData.discount > 100) {
      notify(2, "La remise doit être entre 0 et 100");
      return;
    }

    if (formData.products.length === 0 || formData.products.some(p => !p.productId)) {
      notify(2, "Veuillez ajouter au moins un produit valide au pack");
      return;
    }

    try {
      const response = await fetch(`${api}productBundles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          expiresAt: formData.expiresAt ? formData.expiresAt.toISOString() : undefined
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la création du pack');
      }

      notify(1, "Pack créé avec succès !");
      setTimeout(() => {
        router.push("/productBundles");
      }, 1500);
    } catch (error) {
      console.error('Erreur:', error);
      notify(2, error.message || 'Une erreur est survenue lors de la création');
    }
  };

  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${api}productBundles/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Échec de l'upload");

      const { url } = await response.json();
      setFormData(prev => ({ ...prev, img: url }));
      notify(1, "Image téléchargée avec succès !");
    } catch (error) {
      console.error("Erreur upload:", error);
      notify(2, "Échec de l'upload de l'image");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    uploadFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
    disabled: isUploading,
  });

  const addProductToBundle = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { productId: null, quantity: 1 }]
    }));
  };

  const removeProductFromBundle = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, index) => index !== indexToRemove)
    }));
  };

  const updateProductLine = (index, field, value) => {
    const updated = [...formData.products];
    updated[index][field] = value;
    setFormData(prev => ({
      ...prev,
      products: updated
    }));
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar brands={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar brands={null} />
          <div className="content">
            <Container fluid>
              <ToastContainer />
              <Container>
                <Row>
                  <Col md="12">
                    <Button onClick={() => router.push("/productBundles")} variant="info">
                      <i className="fas fa-list"></i> Retour à la liste
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Form onSubmit={submitForm}>
                      <Card>
                        <Card.Header>
                          <Card.Title as="h4">Créer un pack</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                            <Col md="6">
                              <Form.Group className="mb-3">
                                <label>Nom du pack*</label>
                                <Form.Control
                                  value={formData.name}
                                  placeholder="Nom du pack"
                                  type="text"
                                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                />
                              </Form.Group>
                            </Col>
                            <Col md="6">
                              <Form.Group className="mb-3">
                                <label>Prix en remise {/* (%) */}</label>
                                <Form.Control
                                  value={formData.discount}
                                  type="number"
                                  /* min="0"
                                  max="100" */
                                  onChange={(e) => setFormData(prev => ({ ...prev, discount: parseFloat(e.target.value) }))}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <Form.Group className="mb-3">
                                <label>Date d'expiration</label>
                                <DatePicker
                                  selected={formData.expiresAt}
                                  onChange={(date) => setFormData(prev => ({ ...prev, expiresAt: date }))}
                                  minDate={new Date()}
                                  isClearable
                                  className="form-control"
                                  placeholderText="Sélectionner une date"
                                />
                              </Form.Group>
                            </Col>
                            <Col md="12">
                              <Form.Group className="mb-3">
                                <label>Image du pack</label>
                                <div
                                  {...getRootProps()}
                                  className={`upload-block border-2 border-dashed rounded-3 p-5 text-center cursor-pointer transition-colors
                                    ${isDragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'}
                                    ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <input {...getInputProps()} />
                                  <p className="text-muted">
                                    {isUploading
                                      ? "Téléversement en cours..."
                                      : isDragActive
                                        ? "Déposez l'image ici"
                                        : "Glissez-déposez une image ou cliquez pour choisir"}
                                  </p>
                                </div>
                                {preview && (
                                  <div className="mt-4 text-center">
                                    <img
                                      src={preview}
                                      alt="Aperçu"
                                      className="img-fluid rounded"
                                      style={{ height: '200px' }}
                                    />
                                  </div>
                                )}
                              </Form.Group>
                            </Col>
                          </Row>

                          <Card className="mb-4">
                            <Card.Header>
                              <Card.Title as="h5">Produits</Card.Title>
                            </Card.Header>
                            <Card.Body>
                              <Button variant="secondary" onClick={addProductToBundle}>
                                + Ajouter produit
                              </Button>

                              {formData.products.length > 0 && (
                                <Table striped bordered hover className="mt-4">
                                  <thead>
                                    <tr>
                                      <th>Produit</th>
                                      <th>Quantité</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {formData.products.map((item, index) => (
                                      <tr key={index}>
                                        <td>
                                          <Select
                                            options={products}
                                            value={products.find(p => p.value === item.productId) || null}
                                            onChange={(selected) =>
                                              updateProductLine(index, 'productId', selected ? selected.value : null)
                                            }
                                            placeholder="Sélectionner un produit"
                                          />
                                        </td>
                                        <td>
                                          <Form.Control
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                              updateProductLine(index, 'quantity', parseInt(e.target.value) || 1)
                                            }
                                          />
                                        </td>
                                        <td>
                                          <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => removeProductFromBundle(index)}
                                          >
                                            Supprimer
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              )}
                            </Card.Body>
                          </Card>

                          <Button className="btn-fill pull-right" type="submit" variant="info">
                            Créer le pack
                          </Button>
                          <div className="clearfix"></div>
                        </Card.Body>
                      </Card>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Container>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
