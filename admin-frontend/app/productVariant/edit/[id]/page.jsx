"use client";
import { Button, Card, Container, Row, Col, Form, Table } from "react-bootstrap";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { addProduct, editProduct } from "@/Redux/productsReduce";
import { useDropzone } from "react-dropzone";
import dynamic from "next/dynamic";
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
  const api = Configuration.BACK_BASEURL;

  // États pour les champs de la variante
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [color, setColor] = useState('Black');
  const [images, setImages] = useState([]);
  const [productId, setProductId] = useState(null);

  // États pour les produits disponibles
  const [products, setProducts] = useState([]);

  // Gestion des images
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFiles = async (files) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const response = await fetch(`${api}products/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Échec du téléchargement des images");
      const data = await response.json();
      setImages(data);
      notify(1, "Images téléchargées avec succès !");
    } catch (error) {
      console.error("Erreur de téléchargement :", error);
      notify(2, "Échec du téléchargement des images. Veuillez réessayer.");
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

  // Fonction utilitaire pour les champs numériques
  const handleNumberChange = (e, setter) => {
    const value = e.target.value;
    setter(value === "" ? 0 : parseFloat(value));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    // Validations
    if (!name || name.trim() === "") {
      notify(2, "Le nom de la variante est requis");
      return;
    }

    if (stock < 0) {
      notify(2, "Le stock ne peut pas être négatif");
      return;
    }

    if (!productId) {
      notify(2, "Le produit parent est requis");
      return;
    }

    if (images.length === 0) {
      notify(2, "Au moins une image est requise");
      return;
    }

    // Soumission
    const variantData = {
      productId: productId.value,
      name,
      stock,
      color,
      images
    };

    try {
      const response = await fetch(`${api}product-variants/${id || ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variantData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la sauvegarde");
      }

      notify(1, id ? "Variante mise à jour avec succès !" : "Variante créée avec succès !");
      setTimeout(() => {
        router.push("/productVariant");
      }, 1500);
    } catch (error) {
      console.error("Erreur:", error);
      notify(2, error.message || "Une erreur est survenue");
    }
  };

  const listVariants = () => {
    router.push("/productVariant");
  };

  // Récupération des produits disponibles
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${api}products`);
      if (!response.ok) throw new Error("Échec de la récupération des produits");
      const data = await response.json();
      setProducts(data.map(product => ({
        value: product.id,
        label: product.name,
      })));
    } catch (error) {
      console.error("Erreur:", error);
      notify(2, "Échec de la récupération des produits");
    }
  }, []);

  const getVariantById = useCallback(async () => {
    try {
      const response = await fetch(`${api}product-variants/${id}`);
      if (!response.ok) throw new Error("Échec de la récupération de la variante");
      const data = await response.json();

      // Mise à jour des informations de base
      setName(data.name);
      setStock(data.stock);
      setColor(data.color);

      // Produit parent
      setProductId({
        value: data.product.id,
        label: data.product.name || "Produit parent",
      });

      // Images
      const imageUrls = data.images.map(image => image.url);
      setPreviews(imageUrls);

      const formattedImages = data.images.map((image, index) => ({
        url: image.url,
        isPrimary: index === 0
      }));
      setImages(formattedImages);

    } catch (error) {
      console.error("Erreur:", error);
      notify(2, "Échec de la récupération de la variante");
    }
  }, [id]);

  useEffect(() => {
    if (id) getVariantById();
    fetchProducts();
  }, [fetchProducts, getVariantById, id]);

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
                      <Button onClick={listVariants} variant="info">
                        <i className="fas fa-list"></i> Retour à la liste des variantes
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form onSubmit={submitForm}>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">{id ? "Modifier la variante" : "Ajouter une variante"}</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Sélectionner un produit* </label>
                                  <Select
                                    options={products}
                                    value={productId}
                                    onChange={setProductId}
                                    placeholder="Sélectionner un produit"
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Nom de la variante* </label>
                                  <Form.Control
                                    value={name}
                                    placeholder="Nom de la variante"
                                    name="name"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Stock* </label>
                                  <Form.Control
                                    value={stock}
                                    placeholder="Stock"
                                    name="stock"
                                    className="required"
                                    type="number"
                                    onChange={(e) => handleNumberChange(e, setStock)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group>
                                  <label>Couleur de la variante</label>
                                  <div className="d-flex align-items-center">
                                    <Form.Control
                                      type="color"
                                      value={color}
                                      onChange={(e) => setColor(e.target.value)}
                                      className="form-control-color me-3"
                                      style={{ width: '50px', height: '50px' }}
                                      title="Choisissez une couleur"
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

                            {/* Téléchargement d'images */}
                            <Row>
                              <Col md="12">
                                <Form.Group>
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
                                          'Glissez-déposez les images de la variante (max 4), ou cliquez pour sélectionner'}
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
                                          <span className="position-absolute bottom-0 start-0 badge bg-dark bg-opacity-75 text-white m-2">
                                            {index === 0 ? 'Principale' : `Image ${index + 1}`}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                            </Row>

                            <br />
                            <Button className="btn-fill pull-right" type="submit" variant="info">
                              {id ? "Mettre à jour" : "Enregistrer"}
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
        </div>
      </div>
    </>
  );
}