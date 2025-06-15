"use client";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { addCategory } from "@/Redux/categoriesReduce";
import dynamic from "next/dynamic";
import Configuration from "@/configuration";
import { useDropzone } from "react-dropzone";

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
  const api = Configuration.BACK_BASEURL;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [bannerColor, setBannerColor] = useState("#FF6B6B");
  const [bannerText, setBannerText] = useState("#FF6B6B");
  const [parentId, setParentId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [parentCategoryDetails, setParentCategoryDetails] = useState(null);
  const [iconUrl, setIconUrl] = useState("");
  const [bgUrl, setBgUrl] = useState("");
  const [iconPreview, setIconPreview] = useState(null);
  const [bgPreview, setBgPreview] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [isUploadingIcon, setIsUploadingIcon] = useState(false);
  const [isUploadingBg, setIsUploadingBg] = useState(false);

  const generateSlug = (input) => {
    return input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  };

  useEffect(() => {
    setSlug(generateSlug(name));
  }, [name]);

  const submitForm = async (event) => {
    event.preventDefault();

    if (!name || name.trim() === "") {
      notify(2, "Le nom de la catégorie est requis");
      return;
    }

    if (!description || description.trim() === "") {
      notify(2, "La description de la catégorie est requise");
      return;
    }

    // If parent is selected, use parent's icon and bg if not provided
    const finalIconUrl = iconUrl || (parentCategoryDetails ? parentCategoryDetails.iconUrl : "");
    const finalBgUrl = bgUrl || (parentCategoryDetails ? parentCategoryDetails.bgUrl : "");

    dispatch(
      addCategory({
        parentId: parentId ? parentId.value : null,
        name,
        slug,
        description,
        bannerText,
        bannerColor,
        iconUrl: finalIconUrl,
        bgUrl: finalBgUrl
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Catégorie ajoutée avec succès !");
        setTimeout(() => {
          router.push("/categories");
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "Une erreur s'est produite");
      }
    });
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${api}categories/getAllParent`);

      if (!response.ok) {
        throw new Error("Échec du chargement des catégories");
      }

      const data = await response.json();

      const categoryOptions = data.map(category => ({
        value: category.id,
        label: category.name,
        iconUrl: category.iconUrl,
        bgUrl: category.bgUrl
      }));

      setCategories(categoryOptions);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
      notify(2, "Échec du chargement des catégories");
    }
  }, []);

  const fetchParentDetails = async (parentId) => {
    if (!parentId) {
      setParentCategoryDetails(null);
      return;
    }

    try {
      const response = await fetch(`${api}categories/getCategoryById/${parentId}`);
      if (!response.ok) throw new Error("Failed to fetch parent details");

      const data = await response.json();
      setParentCategoryDetails(data);

      // Show parent's icon and bg as preview (but don't set them as the actual values yet)
      if (data.iconUrl) setIconPreview(data.iconUrl);
      if (data.bgUrl) setBgPreview(data.bgUrl);
    } catch (error) {
      console.error("Error fetching parent details:", error);
    }
  };

  const handleParentChange = (selectedOption) => {
    setParentId(selectedOption);
    if (selectedOption) {
      fetchParentDetails(selectedOption.value);
    } else {
      // When parent is deselected
      setParentCategoryDetails(null);
      setIconPreview(null);
      setBgPreview(null);
      // Also clear any inherited values if they weren't overridden
      if (!iconUrl) setIconUrl("");
      if (!bgUrl) setBgUrl("");
    }
  };

  const uploadIcon = async (file) => {
    setIsUploadingIcon(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${api}categories/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Échec du téléversement de l'icône");

      const { url } = await response.json();
      setIconUrl(url);
      setIconPreview(url);
      notify(1, "Icône téléversée avec succès !");
    } catch (error) {
      console.error("Erreur de téléversement :", error);
      notify(2, "Échec du téléversement de l'icône. Veuillez réessayer.");
      setIconPreview(null);
    } finally {
      setIsUploadingIcon(false);
    }
  };

  const uploadBackground = async (file) => {
    setIsUploadingBg(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${api}categories/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Échec du téléversement du fond");

      const { url } = await response.json();
      setBgUrl(url);
      setBgPreview(url);
      notify(1, "Image de fond téléversée avec succès !");
    } catch (error) {
      console.error("Erreur de téléversement :", error);
      notify(2, "Échec du téléversement du fond. Veuillez réessayer.");
      setBgPreview(null);
    } finally {
      setIsUploadingBg(false);
    }
  };

  const onDropIcon = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setIconFile(file);
    uploadIcon(file);
  }, []);

  const onDropBg = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setBgFile(file);
    uploadBackground(file);
  }, []);

  const { getRootProps: getIconRootProps, getInputProps: getIconInputProps, isDragActive: isDragActiveIcon } = useDropzone({
    onDrop: onDropIcon,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.svg'] },
    maxFiles: 1,
    disabled: isUploadingIcon,
  });

  const { getRootProps: getBgRootProps, getInputProps: getBgInputProps, isDragActive: isDragActiveBg } = useDropzone({
    onDrop: onDropBg,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
    disabled: isUploadingBg,
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <div className="wrapper">
        <Sidebar categories={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar categories={null} />

          <div className="content">
            <Container fluid>
              <ToastContainer />
              <div className="section-image">
                <Container>
                  <Row>
                    <Col md="12">
                      <Button onClick={() => router.push("/categories")} variant="info">
                        <i className="fas fa-list"></i> Retour à la liste des catégories
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form onSubmit={submitForm}>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">Ajouter une catégorie</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col md="6">
                                <Form.Group>
                                  <label>Nom de la catégorie* </label>
                                  <Form.Control
                                    value={name}
                                    placeholder="Nom de la catégorie"
                                    name="name"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group>
                                  <label>Slug (généré automatiquement)</label>
                                  <Form.Control
                                    value={slug}
                                    name="slug"
                                    type="text"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="6">
                                <Form.Group>
                                  <label>Catégorie parente</label>
                                  <Select
                                    options={categories}
                                    value={parentId}
                                    onChange={handleParentChange}
                                    placeholder="Sélectionner une catégorie"
                                    isClearable={true}  // This allows clearing the selection
                                  />
                                  {parentCategoryDetails && (
                                    <div className="mt-2">
                                      <small className="text-muted">
                                        Parent selectionné: {parentCategoryDetails.name}
                                      </small>
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group>
                                  <label>Description*</label>
                                  <Form.Control
                                    value={description}
                                    placeholder="Description"
                                    name="description"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="6">
                                <Form.Group>
                                  <label>Image d'icône</label>
                                  {parentCategoryDetails && !iconUrl && (
                                    <div className="alert alert-info mb-3">
                                      <small>
                                        <i className="fas fa-info-circle"></i> Cette catégorie héritera de l'icône de son parent si aucune n'est fournie.
                                      </small>
                                    </div>
                                  )}
                                  <div
                                    {...getIconRootProps()}
                                    className={`upload-block border-2 border-dashed rounded-3 p-5 text-center cursor-pointer transition-colors
                                      ${isDragActiveIcon ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'}
                                      ${isUploadingIcon ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  >
                                    <input {...getIconInputProps()} />
                                    <p className="text-muted">
                                      {isUploadingIcon ? 'Téléversement en cours...' :
                                        isDragActiveIcon ? "Déposez l'icône ici" :
                                          'Glissez-déposez une icône ou cliquez pour sélectionner'}
                                    </p>
                                  </div>
                                  {iconPreview && (
                                    <div className="mt-4 text-center">
                                      <p className="text-muted small mb-2">
                                        {parentCategoryDetails && !iconUrl ?
                                          "Prévisualisation de l'icône du parent" :
                                          "Votre icône téléversée"}
                                      </p>
                                      <img
                                        src={iconPreview}
                                        alt="Aperçu de l'icône"
                                        className="img-fluid rounded"
                                        style={{ height: '100px' }}
                                      />
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group>
                                  <label>Image d'arrière-plan</label>
                                  {parentCategoryDetails && !bgUrl && (
                                    <div className="alert alert-info mb-3">
                                      <small>
                                        <i className="fas fa-info-circle"></i> Cette catégorie héritera du fond de son parent si aucun n'est fourni.
                                      </small>
                                    </div>
                                  )}
                                  <div
                                    {...getBgRootProps()}
                                    className={`upload-block border-2 border-dashed rounded-3 p-5 text-center cursor-pointer transition-colors
                                      ${isDragActiveBg ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'}
                                      ${isUploadingBg ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  >
                                    <input {...getBgInputProps()} />
                                    <p className="text-muted">
                                      {isUploadingBg ? 'Téléversement en cours...' :
                                        isDragActiveBg ? 'Déposez le fond ici' :
                                          'Glissez-déposez un fond ou cliquez pour sélectionner'}
                                    </p>
                                  </div>
                                  {bgPreview && (
                                    <div className="mt-4 text-center">
                                      <p className="text-muted small mb-2">
                                        {parentCategoryDetails && !bgUrl ?
                                          "Prévisualisation du fond du parent" :
                                          "Votre fond téléversé"}
                                      </p>
                                      <img
                                        src={bgPreview}
                                        alt="Aperçu du fond"
                                        className="img-fluid rounded"
                                        style={{ height: '100px' }}
                                      />
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                            </Row>
                            <br />
                            <Button className="btn-fill pull-right" type="submit" variant="info">
                              Enregistrer la catégorie
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