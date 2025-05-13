"use client"; // Mark this as a Client Component
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'; // Updated import for Next.js 14
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { addCategory } from "@/Redux/categoriesReduce";
import dynamic from "next/dynamic";
import Configuration from "@/configuration";
const Select = dynamic(() => import('react-select'), {
  ssr: false, // Disable SSR for react-select
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

  // Function to generate slug
  const generateSlug = (input) => {
    return input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9 ]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with dashes
  };

  useEffect(() => {
    setSlug(generateSlug(name));
  }, [name]);

  const submitForm = async (event) => {
    event.preventDefault();

    if (!name || name.trim() === "") {
      notify(2, "Category name is required");
      return;
    }

    if (!description || description.trim() === "") {
      notify(2, "Category description is required");
      return;
    }

    dispatch(
      addCategory({
        parentId: parentId ? parentId.value : null,
        name,
        slug,
        description,
        bannerText,
        bannerColor
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Category added successfully!");
        setTimeout(() => {
          router.push("/admin/categories");
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "An error occurred");
      }
    });
  };


  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${api}categories/getAllParent`);

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
                      <Button onClick={() => router.push("/admin/categories")} variant="info">
                        <i className="fas fa-list"></i> Back to Category List
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form onSubmit={submitForm}>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">Add Category</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col md="6">
                                <Form.Group>
                                  <label>Category Name* </label>
                                  <Form.Control
                                    value={name}
                                    placeholder="Category Name"
                                    name="name"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="6">
                                <Form.Group>
                                  <label>Slug (Auto-generated) </label>
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
                                  <label>Category </label>
                                  <Select
                                    options={categories}
                                    value={parentId}
                                    onChange={(selectedOption) => setParentId(selectedOption)}
                                    placeholder="Select Category"
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
                            <br></br>
                            <Button className="btn-fill pull-right" type="submit" variant="info">
                              Save Category
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
