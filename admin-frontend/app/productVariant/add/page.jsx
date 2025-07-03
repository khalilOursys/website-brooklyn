"use client";
import { Button, Card, Container, Row, Col, Form, Table, FormCheck } from "react-bootstrap";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { useDropzone } from "react-dropzone";
import dynamic from "next/dynamic";
import Configuration from "@/configuration";

const Select = dynamic(() => import('react-select'), { ssr: false });

export default function CreateVariantPage() {
  const api = Configuration.BACK_BASEURL;
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };

  const router = useRouter();

  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState("");
  const [color, setColor] = useState('Black');
  const [images, setImages] = useState([]);
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState([]);

  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${api}products`);
      if (!response.ok) throw new Error("Échec du chargement des produits");
      const data = await response.json();
      setProducts(data.map(product => ({
        value: product.id,
        label: product.name,
        ...product
      })));
    } catch (error) {
      console.error("Erreur:", error);
      notify(2, "Échec du chargement des produits");
    }
  }, [api]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const uploadFiles = async (files) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const response = await fetch(`${api}products/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Échec du téléchargement");
      const data = await response.json();
      setImages(data);
      notify(1, "Images téléchargées avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      notify(2, "Échec du téléchargement des images");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
    uploadFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 4,
    disabled: isUploading,
  });

  const submitForm = async (event) => {
    event.preventDefault();

    if (!name || name.trim() === "") {
      notify(2, "Le nom de la variante est requis");
      return;
    }

    if (!productId) {
      notify(2, "Veuillez sélectionner un produit");
      return;
    }

    if (stock < 0) {
      notify(2, "Le stock ne peut pas être négatif");
      return;
    }

    if (images.length === 0) {
      notify(2, "Il faut ajouter au moin une image");
      return;
    }

    try {
      const response = await fetch(`${api}product-variants`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId.value,
          name,
          stock: parseInt(stock),
          color,
          images
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la création de la variante");
      }

      notify(1, "Variante créée avec succès !");
      setTimeout(() => router.push("/productVariant"), 1500);
    } catch (error) {
      console.error("Erreur:", error);
      notify(2, error.message || "Échec de la création de la variante");
    }
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar products={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar products={null} />
          <div className="content">
            <Container fluid>
              <ToastContainer />
              <div className="section-image">
                <Container>
                  <Row>
                    <Col md="12">
                      <Button onClick={() => router.push("/productVariant")} variant="info">
                        <i className="fas fa-list"></i> Retour à la liste
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form onSubmit={submitForm}>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">Ajouter une variante de produit</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col md="6">
                                <Form.Group>
                                  <label>Sélectionnez le produit*</label>
                                  <Select
                                    options={products}
                                    value={productId}
                                    onChange={setProductId}
                                    placeholder="Sélectionner un produit"
                                    isSearchable
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group>
                                  <label>Nom*</label>
                                  <Form.Control
                                    value={name}
                                    placeholder="ex : Large - Bleu"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row>
                              <Col md="6">
                                <Form.Group>
                                  <label>Stock*</label>
                                  <Form.Control
                                    value={stock}
                                    type="text"
                                    onChange={(e) => setStock(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group>
                                  <label>Couleur</label>
                                  <div className="d-flex align-items-center">
                                    <Form.Control
                                      type="color"
                                      value={color}
                                      onChange={(e) => setColor(e.target.value)}
                                      className="form-control-color me-3"
                                      style={{ width: '50px', height: '50px' }}
                                    />
                                    <div
                                      style={{
                                        backgroundColor: color,
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                      }}
                                    ></div>
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row>
                              <Col md="12">
                                <Form.Group>
                                  <label>Images de la variante</label>
                                  <div
                                    {...getRootProps()}
                                    className={`upload-block border-2 border-dashed rounded-3 p-5 text-center cursor-pointer transition-colors
                                      ${isDragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'}
                                      ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  >
                                    <input {...getInputProps()} />
                                    <p className="text-muted">
                                      {isUploading ? 'Téléchargement en cours...' :
                                        isDragActive ? 'Déposez les images ici' :
                                          "Faites glisser et déposez des variantes d'images (max 4) ou cliquez pour sélectionner"}
                                    </p>
                                  </div>
                                  {previews.length > 0 && (
                                    <div className="row mt-4">
                                      {previews.map((preview, index) => (
                                        <div key={preview} className="col-6 col-md-3 mb-4 position-relative">
                                          <img
                                            src={preview}
                                            alt={`Aperçu ${index + 1}`}
                                            className="img-fluid rounded"
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                            </Row>

                            <Button className="btn-fill pull-right" type="submit" variant="info">
                              Enregistrer
                            </Button>
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
