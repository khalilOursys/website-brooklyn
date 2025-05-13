"use client"; // Mark this as a Client Component
import { Button, Card, Container, Row, Col, Form, Table } from "react-bootstrap";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation'; // Updated import for Next.js 14
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { addProduct } from "@/Redux/productsReduce"; // Assuming you have a productsReducer
import { useDropzone } from "react-dropzone"; // Import useDropzone for the ImageUpload component
import dynamic from "next/dynamic";
import Configuration from "@/configuration";
const Select = dynamic(() => import('react-select'), {
  ssr: false, // Disable SSR for react-select
});

export default function Page() {
  const api = Configuration.BACK_BASEURL;
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };

  const dispatch = useDispatch();
  const router = useRouter(); // Updated hook

  // State declarations for product fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [bulkPrice, setBulkPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]); // Array of up to 3 image paths
  const [categoryId, setCategoryId] = useState(null); // Use null for react-select
  const [brandId, setBrandId] = useState(null); // Use null for react-select

  // State for product attributes
  const [attributes, setAttributes] = useState([{ key: "", value: "" }]);

  // State for brands and categories
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch brands and categories on component mount
  const fetchBrands = useCallback(async () => {
    try {
      const response = await fetch(`${api}brands`);

      if (!response.ok) {
        throw new Error("Failed to fetch brands");
      }

      const data = await response.json();

      const brandOptions = data.map(brand => ({
        value: brand.id,
        label: brand.name,
      }));

      setBrands(brandOptions);
    } catch (error) {
      console.error("Error fetching brands:", error);
      notify(2, "Failed to fetch brands");
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${api}categories/getAllChildren`);

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();

      const categoryOptions = data.map(category => ({
        value: category.id,
        label: category.name,
      }));

      setCategories(categoryOptions);
    } catch (error) {
      console.error("Error fetching categories:", error);
      notify(2, "Failed to fetch categories");
    }
  }, []);

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, [fetchBrands, fetchCategories]);

  // ImageUpload component logic
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // State for upload loading

  const uploadFiles = async (files) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const response = await fetch(`${api}products/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Image upload failed");
      var data = await (response.json());
      setImages(data);
      notify(1, "Images uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      notify(2, "Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
    /* setUploadedFiles(acceptedFiles); */

    // Upload files immediately after they are selected
    uploadFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 4,
    disabled: isUploading,
  });

  // Handle attribute changes
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

  const submitForm = async (event) => {
    event.preventDefault();

    // Validation conditions
    if (!name || name.trim() === "") {
      notify(2, "Product name is required");
      return;
    }

    if (!description || description.trim() === "") {
      notify(2, "Product description is required");
      return;
    }

    if (price <= 0) {
      notify(2, "Price must be greater than 0");
      return;
    }

    if (stock < 0) {
      notify(2, "Stock cannot be negative");
      return;
    }

    if (!categoryId) {
      notify(2, "Category is required");
      return;
    }

    // Validate attributes
    const invalidAttributes = attributes.some(attr => !attr.key.trim() || !attr.value.trim());
    if (invalidAttributes) {
      notify(2, "All attributes must have both key and value");
      return;
    }

    // If all validations pass, proceed with form submission
    dispatch(
      addProduct({
        name,
        description,
        price,
        discount,
        isFeatured,
        stock,
        images,
        categoryId: categoryId.value, // Extract value from react-select
        brandId: brandId ? brandId.value : null, // Extract value from react-select (optional)
        attributes: attributes.filter(attr => attr.key.trim() && attr.value.trim()) // Only include valid attributes
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Product added successfully!");
        setTimeout(() => {
          router.push("/admin/products"); // Redirect to products list
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "An error occurred");
      }
    });
  };

  const listProducts = () => {
    router.push("/admin/products"); // Redirect to products list
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
                      <Button onClick={listProducts} variant="info">
                        <i className="fas fa-list"></i> Back to Product List
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form onSubmit={submitForm}>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">{"Add Product"}</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Product Name* </label>
                                  <Form.Control
                                    value={name}
                                    placeholder="Product Name"
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
                                  <label>Description* </label>
                                  <Form.Control
                                    value={description}
                                    placeholder="Description"
                                    name="description"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Price* </label>
                                  <Form.Control
                                    value={price}
                                    placeholder="Price"
                                    name="price"
                                    className="required"
                                    type="number"
                                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Bulk Price </label>
                                  <Form.Control
                                    value={bulkPrice}
                                    placeholder="Bulk Price"
                                    name="bulkPrice"
                                    type="number"
                                    onChange={(e) => setBulkPrice(parseFloat(e.target.value))}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Discount </label>
                                  <Form.Control
                                    value={discount}
                                    placeholder="Discount"
                                    name="discount"
                                    type="number"
                                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Stock* </label>
                                  <Form.Control
                                    value={stock}
                                    placeholder="Stock"
                                    name="stock"
                                    className="required"
                                    type="number"
                                    onChange={(e) => setStock(parseInt(e.target.value))}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Category* </label>
                                  <Select
                                    options={categories}
                                    value={categoryId}
                                    onChange={(selectedOption) => setCategoryId(selectedOption)}
                                    placeholder="Select Category"
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Brand </label>
                                  <Select
                                    options={brands}
                                    value={brandId}
                                    onChange={(selectedOption) => setBrandId(selectedOption)}
                                    placeholder="Select Brand"
                                    isClearable
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            {/* Product Attributes Section */}
                            <Row>
                              <Col md="12">
                                {/* Attribute Table */}
                                <h5 className="mt-4">Product Attributes</h5>
                                <Table bordered>
                                  <thead>
                                    <tr>
                                      <th>Key</th>
                                      <th>Value</th>
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
                                <Button variant="success" onClick={addAttribute}>+ Add Attribute</Button>
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
                                        isDragActive ? 'Drop images here' :
                                          'Drag & drop product images (max 4), or click to select'}
                                    </p>
                                  </div>
                                  {previews.length > 0 && (
                                    <div className="row mt-4">
                                      {previews.map((preview, index) => (
                                        <div key={preview} className="col-6 col-md-3 mb-4 position-relative">
                                          <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="img-fluid rounded"
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                          />
                                          <span className="position-absolute bottom-0 start-0 badge bg-dark bg-opacity-75 text-white m-2">
                                            {index === 0 ? 'Primary' : `Image ${index + 1}`}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                            </Row>
                            <br></br>
                            <Button className="btn-fill pull-right" type="submit" variant="info">
                              Save Product
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