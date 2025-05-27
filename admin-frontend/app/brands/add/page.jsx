"use client"; // Marque ceci comme un composant client
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'; // Import mis à jour pour Next.js 14
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { addBrand } from "@/Redux/brandsReduce";
import { useDropzone } from "react-dropzone";
import Configuration from "@/configuration";

export default function Page() {
  const api = Configuration.BACK_BASEURL;
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i> {msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i> {msg}</strong>);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null); // Aperçu d'une seule image
  const [imageFile, setImageFile] = useState(null); // Stocker le fichier sélectionné
  const [isUploading, setIsUploading] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      notify(2, "Le nom de la marque est requis");
      return;
    }

    if (!description.trim()) {
      notify(2, "La description de la marque est requise");
      return;
    }

    dispatch(
      addBrand({
        name,
        description,
        img: image, // Inclure l'URL de l'image téléchargée
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Marque ajoutée avec succès !");
        setTimeout(() => {
          window.location.replace("/brands");
        }, 1500);
      } else {
        notify(2, action.payload?.message || "Une erreur est survenue");
      }
    });
  };

  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file); // Envoyer un seul fichier

      const response = await fetch(`${api}brands/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Échec du téléchargement de l'image");

      const { url } = await response.json();
      setImage(url);
      /* const { imageUrl } = await response.json(); // Attendre une seule URL d'image */
      notify(1, "Image téléchargée avec succès !");
    } catch (error) {
      console.error("Erreur de téléchargement :", error);
      notify(2, "Échec du téléchargement de l'image. Veuillez réessayer.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {

    if (acceptedFiles.length === 0) return;
    if (acceptedFiles.length > 1) {
      notify(2, "Veuillez sélectionner une seule image");
      return;
    }
    const file = acceptedFiles[0]; // Prendre un seul fichier
    setImageFile(file);
    setPreview(URL.createObjectURL(file)); // Afficher l'aperçu

    // Télécharger le fichier immédiatement
    uploadFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 2, // Un seul fichier autorisé
    disabled: isUploading,
  });

  return (
    <>
      <div className="wrapper">
        <Sidebar brands={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar brands={null} />
          <div className="content">
            <Container fluid>
              <ToastContainer />
              <div className="section-image">
                <Container>
                  <Row>
                    <Col md="12">
                      <Button onClick={() => router.push("/brands")} variant="info">
                        <i className="fas fa-list"></i> Retour à la liste des marques
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form onSubmit={submitForm}>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">Ajouter une marque</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col md="6">
                                <Form.Group>
                                  <label>Nom de la marque* </label>
                                  <Form.Control
                                    value={name}
                                    placeholder="Nom de la marque"
                                    name="name"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group>
                                  <label>Description* </label>
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
                                        isDragActive ? 'Déposez une image ici' :
                                          'Glissez-déposez une image, ou cliquez pour sélectionner'}
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
                            <br />
                            <Button className="btn-fill pull-right" type="submit" variant="info">
                              Enregistrer la marque
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