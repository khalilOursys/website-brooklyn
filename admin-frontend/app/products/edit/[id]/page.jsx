"use client"; // Marque ce composant comme un composant client
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

  // États pour les champs du produit
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);

  // États pour les attributs
  const [attributes, setAttributes] = useState([{ key: "", value: "" }]);

  // États pour les marques et catégories
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

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

  // Gestion des attributs
  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][field] = value;
    setAttributes(updatedAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };

  const removeAttribute = (index) => {
    if (attributes.length > 1) {
      const updatedAttributes = [...attributes];
      updatedAttributes.splice(index, 1);
      setAttributes(updatedAttributes);
    }
  };

  // Fonction utilitaire pour les champs numériques
  const handleNumberChange = (e, setter) => {
    const value = e.target.value;
    setter(value === "" ? 0 : parseFloat(value));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    // Validations
    if (!name || name.trim() === "") {
      notify(2, "Le nom du produit est requis");
      return;
    }

    if (!description || description.trim() === "") {
      notify(2, "La description du produit est requise");
      return;
    }

    if (price <= 0) {
      notify(2, "Le prix doit être supérieur à 0");
      return;
    }

    if (stock < 0) {
      notify(2, "Le stock ne peut pas être négatif");
      return;
    }

    if (!categoryId) {
      notify(2, "La catégorie est requise");
      return;
    }

    const invalidAttributes = attributes.some(attr => !attr.key.trim() || !attr.value.trim());
    if (invalidAttributes) {
      notify(2, "Tous les attributs doivent avoir une clé et une valeur");
      return;
    }

    // Soumission
    dispatch(
      editProduct({
        id,
        name,
        description,
        price,
        discount,
        isFeatured,
        stock,
        images,
        categoryId: categoryId.value,
        brandId: brandId ? brandId.value : null,
        attributes: attributes.filter(attr => attr.key.trim() && attr.value.trim())
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Produit modifié avec succès !");
        setTimeout(() => {
          router.push("/products");
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "Une erreur est survenue");
      }
    });
  };

  const listProducts = () => {
    router.push("/products");
  };

  // Récupération des marques et catégories
  const fetchBrands = useCallback(async () => {
    try {
      const response = await fetch(`${api}brands`);
      if (!response.ok) throw new Error("Échec de la récupération des marques");
      const data = await response.json();
      setBrands(data.map(brand => ({
        value: brand.id,
        label: brand.name,
      })));
    } catch (error) {
      console.error("Erreur:", error);
      notify(2, "Échec de la récupération des marques");
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${api}categories/getAllChildren`);
      if (!response.ok) throw new Error("Échec de la récupération des catégories");
      const data = await response.json();
      setCategories(data.map(category => ({
        value: category.id,
        label: category.name,
      })));
    } catch (error) {
      console.error("Erreur:", error);
      notify(2, "Échec de la récupération des catégories");
    }
  }, []);

  const getProductById = useCallback(async () => {
    try {
      const response = await fetch(`${api}products/getProductById/${id}`);
      if (!response.ok) throw new Error("Échec de la récupération du produit");
      const data = await response.json();

      // Mise à jour des informations de base
      setDescription(data.description);
      setName(data.name);
      setDiscount(data.discount || 0);
      setPrice(data.price);
      setStock(data.stock);
      setIsFeatured(data.isFeatured || false);

      // Marque et catégorie
      setBrandId({
        value: data.brand.id,
        label: data.brand.name,
      });

      setCategoryId({
        value: data.category.id,
        label: data.category.name,
      });

      // Attributs
      const formattedAttributes = data.attributes.map(attr => ({
        key: attr.key,
        value: attr.value
      }));
      setAttributes(formattedAttributes);

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
      notify(2, "Échec de la récupération du produit");
    }
  }, [id]);

  useEffect(() => {
    if (id) getProductById();
    fetchBrands();
    fetchCategories();
  }, [fetchBrands, fetchCategories, getProductById, id]);

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
                      <Button onClick={listProducts} variant="info">
                        <i className="fas fa-list"></i> Retour à la liste des produits
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form onSubmit={submitForm}>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">{id ? "Modifier le produit" : "Ajouter un produit"}</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Nom du produit* </label>
                                  <Form.Control
                                    value={name}
                                    placeholder="Nom du produit"
                                    name="name"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Description* </label>
                                  <Form.Control
                                    as="textarea"  // Change this to make it a textarea
                                    rows={11}       // Add this to set the initial height
                                    value={description}
                                    placeholder="Description"
                                    name="description"
                                    className="required"
                                    onChange={(e) => setDescription(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            {/* Nouvelle ligne pour le prix, remise et en vedette */}
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Prix* </label>
                                  <Form.Control
                                    value={price}
                                    placeholder="Prix"
                                    name="price"
                                    className="required"
                                    type="number"
                                    onChange={(e) => handleNumberChange(e, setPrice)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="px-1" md="6">
                                <Form.Group>
                                  <label>Prix en remise </label>
                                  <Form.Control
                                    value={discount}
                                    placeholder="Prix en remise"
                                    name="discount"
                                    type="number"
                                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
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
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>En vedette </label>
                                  <div className="form-group">
                                    <label className="switch">
                                      <input
                                        type="checkbox"
                                        id="featured-switch"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                      />
                                      <span className="slider round"></span>
                                    </label>
                                  </div>
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Catégorie* </label>
                                  <Select
                                    options={categories}
                                    value={categoryId}
                                    onChange={setCategoryId}
                                    placeholder="Sélectionner une catégorie"
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Marque </label>
                                  <Select
                                    options={brands}
                                    value={brandId}
                                    onChange={setBrandId}
                                    placeholder="Sélectionner une marque"
                                    isClearable
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            {/* Attributs du produit */}
                            <Row>
                              <Col md="12">
                                <h5 className="mt-4">Attributs du produit</h5>
                                <Table bordered>
                                  <thead>
                                    <tr>
                                      <th>Clé</th>
                                      <th>Valeur</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {attributes.map((attr, index) => (
                                      <tr key={index}>
                                        <td><Form.Control type="text" value={attr.key} onChange={(e) => handleAttributeChange(index, "key", e.target.value)} /></td>
                                        <td><Form.Control type="text" value={attr.value} onChange={(e) => handleAttributeChange(index, "value", e.target.value)} /></td>
                                        <td><Button variant="danger" onClick={() => removeAttribute(index)}><i className="fas fa-trash"></i></Button></td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                                <Button variant="success" onClick={addAttribute}>+ Ajouter un attribut</Button>
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
                                          'Glissez-déposez les images du produit (max 4), ou cliquez pour sélectionner'}
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