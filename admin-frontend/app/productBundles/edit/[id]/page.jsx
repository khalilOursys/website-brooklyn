"use client";
import { Button, Card, Container, Row, Col, Form, Table } from "react-bootstrap";
import React, { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
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

export default function UpdateProductBundle() {
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i> {msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i> {msg}</strong>);
  };

  const router = useRouter();
  const params = useParams();
  const bundleId = params?.id;
  const api = Configuration.BACK_BASEURL;

  const [formData, setFormData] = useState({
    name: "",
    discount: 0,
    expiresAt: null,
    img: "",
    products: []
  });

  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${api}products`);
        const data = await res.json();
        setProducts(data.map(p => ({ value: p.id, label: p.name })));
      } catch (err) {
        notify(2, "Échec du chargement des produits");
      }
    };

    const fetchBundle = async () => {
      try {
        const res = await fetch(`${api}productBundles/getProductBundlesById/${bundleId}`);
        const data = await res.json();

        setFormData({
          name: data.name,
          discount: data.discount,
          expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
          img: data.img,
          products: data.products.map(p => ({
            productId: p.productId,
            quantity: p.quantity
          }))
        });

        if (data.img) setPreview(data.img);
      } catch (err) {
        notify(2, "Échec du chargement du pack");
      }
    };

    if (bundleId) {
      fetchProducts();
      fetchBundle();
    }
  }, [bundleId]);

  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);

      const res = await fetch(`${api}productBundles/upload`, {
        method: "POST",
        body: form
      });

      const { url } = await res.json();
      setFormData(prev => ({ ...prev, img: url }));
      notify(1, "Image mise à jour !");
    } catch (e) {
      notify(2, "Erreur lors de l'upload");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) return;
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

  const updateProductLine = (index, field, value) => {
    const updated = [...formData.products];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, products: updated }));
  };

  const removeProductFromBundle = (index) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const addProductToBundle = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { productId: null, quantity: 1 }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      notify(2, "Le nom est requis");
      return;
    }

    if (formData.products.length === 0 || formData.products.some(p => !p.productId)) {
      notify(2, "Veuillez ajouter au moins un produit valide au pack");
      return;
    }

    try {
      const response = await fetch(`${api}productBundles/${bundleId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          expiresAt: formData.expiresAt ? formData.expiresAt.toISOString() : null
        })
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      notify(1, "Pack mis à jour avec succès !");
      setTimeout(() => {
        router.push("/productBundles");
      }, 1500);
    } catch (err) {
      notify(2, err.message || "Échec de mise à jour");
    }
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
                    <Form onSubmit={handleSubmit}>
                      <Card>
                        <Card.Header>
                          <Card.Title as="h4">Modifier le Pack</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                            <Col md="6">
                              <Form.Group className="mb-3">
                                <label>Nom*</label>
                                <Form.Control
                                  type="text"
                                  value={formData.name}
                                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md="6">
                              <Form.Group className="mb-3">
                                <label>Remise {/* (%) */}</label>
                                <Form.Control
                                  type="number"
                                  value={formData.discount}
                                  min="0"
                                  max="100"
                                  onChange={e => setFormData({ ...formData, discount: parseFloat(e.target.value) })}
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
                                  onChange={date => setFormData({ ...formData, expiresAt: date })}
                                  isClearable
                                  className="form-control"
                                  placeholderText="Sélectionner une date"
                                />
                              </Form.Group>
                            </Col>
                            <Col md="12">
                              <Form.Group className="mb-3">
                                <label>Image</label>
                                <div {...getRootProps()}
                                  className={`upload-block border-2 border-dashed rounded-3 p-5 text-center cursor-pointer transition-colors
                                    ${isDragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'}
                                    ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                  <input {...getInputProps()} />

                                  <p className="text-muted">{isUploading ? "Téléversement..." : isDragActive ? "Déposez ici" : "Cliquez ou glissez une image"}</p>
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
                                + Ajouter un produit
                              </Button>

                              <Table striped bordered hover className="mt-3">
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
                                        <Button variant="danger" onClick={() => removeProductFromBundle(index)}>
                                          Supprimer
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Card.Body>
                          </Card>

                          <Button className="btn-fill pull-right" type="submit" variant="info">
                            Mettre à jour
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
