"use client"; // Mark this as a Client Component
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'; // Updated import for Next.js 14
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
  const [preview, setPreview] = useState(null); // Single image preview
  const [imageFile, setImageFile] = useState(null); // Store selected file
  const [isUploading, setIsUploading] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      notify(2, "Brand name is required");
      return;
    }

    if (!description.trim()) {
      notify(2, "Brand description is required");
      return;
    }

    dispatch(
      addBrand({
        name,
        description,
        img: image, // Include uploaded image URL
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Brand added successfully!");
        setTimeout(() => {
          window.location.replace("/brands");
        }, 1500);
      } else {
        notify(2, action.payload?.message || "An error occurred");
      }
    });
  };

  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file); // Send only one file

      const response = await fetch(`${api}brands/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Image upload failed");

      const { url } = await response.json();
      setImage(url);
      /* const { imageUrl } = await response.json(); // Expect single image URL */
      notify(1, "Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      notify(2, "Failed to upload image. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {

    if (acceptedFiles.length === 0) return;
    if (acceptedFiles.length > 1) {
      notify(2, "Please select only one image");
      return;
    }
    const file = acceptedFiles[0]; // Take only one file
    setImageFile(file);
    setPreview(URL.createObjectURL(file)); // Show preview

    // Upload file immediately
    uploadFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 2, // Only one file allowed
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
                        <i className="fas fa-list"></i> Back to Brand List
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form onSubmit={submitForm}>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">Add Brand</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col md="6">
                                <Form.Group>
                                  <label>Brand Name* </label>
                                  <Form.Control
                                    value={name}
                                    placeholder="Brand Name"
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
                                      {isUploading ? 'Uploading...' :
                                        isDragActive ? 'Drop an image here' :
                                          'Drag & drop an image, or click to select'}
                                    </p>
                                  </div>
                                  {preview && (
                                    <div className="mt-4 text-center">
                                      <img
                                        src={preview}
                                        alt="Preview"
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
                              Save Brand
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
