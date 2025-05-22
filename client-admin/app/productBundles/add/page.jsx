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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch products for the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${api}products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.map(product => ({
          value: product.id,
          label: product.name
        })));
      } catch (error) {
        console.error('Error fetching products:', error);
        notify(2, 'Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      notify(2, "Bundle name is required");
      return;
    }

    if (formData.discount < 0 || formData.discount > 100) {
      notify(2, "Discount must be between 0 and 100");
      return;
    }

    if (formData.products.length === 0) {
      notify(2, "Please add at least one product to the bundle");
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
        throw new Error(errorData.message || 'Failed to create bundle');
      }

      notify(1, "Product bundle created successfully!");
      /* setTimeout(() => {
        router.push("/productBundles");
      }, 1500); */
    } catch (error) {
      console.error('Error creating bundle:', error);
      notify(2, error.message || 'An error occurred while creating the bundle');
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

      if (!response.ok) throw new Error("Image upload failed");

      const { url } = await response.json();
      setFormData(prev => ({ ...prev, img: url }));
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
    if (!selectedProduct || quantity < 1) {
      notify(2, "Please select a product and enter a valid quantity");
      return;
    }

    const productExists = formData.products.some(
      item => item.productId === selectedProduct.value
    );

    if (productExists) {
      notify(2, "This product is already in the bundle");
      return;
    }

    setFormData(prev => ({
      ...prev,
      products: [
        ...prev.products,
        {
          productId: selectedProduct.value,
          quantity: quantity
        }
      ]
    }));

    setSelectedProduct(null);
    setQuantity(1);
  };

  const removeProductFromBundle = (productId) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(item => item.productId !== productId)
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
              <div className="section-image">
                <Container>
                  <Row>
                    <Col md="12">
                      <Button onClick={() => router.push("/productBundles")} variant="info">
                        <i className="fas fa-list"></i> Back to Bundle List
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form onSubmit={submitForm}>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">Create Product Bundle</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col md="6">
                                <Form.Group className="mb-3">
                                  <label>Bundle Name*</label>
                                  <Form.Control
                                    value={formData.name}
                                    placeholder="Bundle Name"
                                    required
                                    type="text"
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group className="mb-3">
                                  <label>Discount (%)*</label>
                                  <Form.Control
                                    value={formData.discount}
                                    placeholder="0"
                                    required
                                    type="number"
                                    min="0"
                                    max="100"
                                    onChange={(e) => setFormData(prev => ({ ...prev, discount: parseFloat(e.target.value) }))}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="6">
                                <Form.Group className="mb-3">
                                  <label>Expiration Date</label>
                                  <DatePicker
                                    selected={formData.expiresAt}
                                    onChange={(date) => setFormData(prev => ({ ...prev, expiresAt: date }))}
                                    minDate={new Date()}
                                    isClearable
                                    className="form-control"
                                    placeholderText="Select expiration date"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group className="mb-3">
                                  <label>Bundle Image</label>
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

                            <Row>
                              <Col md="12">
                                <Card className="mb-4">
                                  <Card.Header>
                                    <Card.Title as="h5">Bundle Products</Card.Title>
                                  </Card.Header>
                                  <Card.Body>
                                    <Row>
                                      <Col md="6">
                                        <Form.Group className="mb-3">
                                          <label>Select Product</label>
                                          <Select
                                            options={products}
                                            value={selectedProduct}
                                            onChange={setSelectedProduct}
                                            placeholder="Search products..."
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col md="3">
                                        <Form.Group className="mb-3">
                                          <label>Quantity</label>
                                          <Form.Control
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col md="3" className="d-flex align-items-end">
                                        <Button
                                          variant="primary"
                                          onClick={addProductToBundle}
                                          disabled={!selectedProduct}
                                        >
                                          Add Product
                                        </Button>
                                      </Col>
                                    </Row>

                                    {formData.products.length > 0 && (
                                      <Table striped bordered hover className="mt-4">
                                        <thead>
                                          <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Action</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {formData.products.map((item, index) => {
                                            const product = products.find(p => p.value === item.productId);
                                            return (
                                              <tr key={index}>
                                                <td>{product?.label || 'Unknown Product'}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                  <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => removeProductFromBundle(item.productId)}
                                                  >
                                                    Remove
                                                  </Button>
                                                </td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                                      </Table>
                                    )}
                                  </Card.Body>
                                </Card>
                              </Col>
                            </Row>

                            <Button className="btn-fill pull-right" type="submit" variant="info">
                              Create Bundle
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