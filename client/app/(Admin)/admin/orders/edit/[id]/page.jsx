"use client"; // Mark this as a Client Component
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation'; // Updated import for Next.js 14
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
import { editUser, getUserById } from "@/Redux/usersReduce";

const Select = dynamic(() => import("react-select"), {
  ssr: false, // Disable SSR for this component
});

export default function Page() {
  const notify = (type, msg) => {
    if (type === 1)
      toast.success(<strong><i className="fas fa-check-circle"></i>{msg}</strong>);
    else
      toast.error(<strong><i className="fas fa-exclamation-circle"></i>{msg}</strong>);
  };

  const dispatch = useDispatch();
  const router = useRouter(); // Updated hook
  const { id } = useParams(); // Use `useParams` if you're using dynamic routes

  // State declarations
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [options, setOptions] = useState([{ value: "", label: "Role", isDisabled: true }]);

  /* const fetchRole = useCallback(async () => {
    const response = await dispatch(getRoles());
    const data = response.payload.data;
    const arrayOption = data.map((e) => ({ value: e.id, label: e.name, role: e }));
    setOptions(arrayOption);
  }, [dispatch]); */

  const fetchUser = useCallback(
    async (id) => {
      const response = await dispatch(getUserById(id));
      const data = response.payload;

      setEmail(data.email);
      if (data?.fullname != null) {
        setFullname(data.fullname);
      } else {
        setFullname(""); // Set a default value (e.g., empty string) if fullname is null or undefined
      }
      /* setRole({ value: data.role.id, label: data.role.name, role: data.role }); */
    },
    [dispatch]
  );

  useEffect(() => {
    /* fetchRole(); */
    if (id) {
      fetchUser(id);
    }
  }, [id, fetchUser]);

  const submitForm = async (event) => {

    // Validation conditions
    if (!fullname || fullname.trim() === "") {
      notify(2, "Fullname is required");
      return;
    }

    if (!email || !validateEmail(email)) {
      notify(2, "Please enter a valid email address");
      return;
    }
    console.log(password != "");
    console.log(password.length < 8);
    console.log(password == "" && password.length < 8);


    if (password !== "" && password.length < 8) {
      console.log("bbb");
      notify(2, "Password must be at least 8 characters long");
      return;
    }

    // If all validations pass, proceed with form submission
    dispatch(
      editUser({
        id,
        fullname,
        email,
        password,
        role,
      })
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        notify(1, "Update avec succes");
        setTimeout(() => {
          router.push("/settings/users"); // Updated navigation
        }, 1500);
      } else if (action.meta.requestStatus === "rejected") {
        notify(2, action.payload.message || "Une erreur est survenue");
      }
    });
  };

  // Helper function to validate email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const listeUser = () => {
    router.push("/settings/users"); // Updated navigation
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar users={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar users={null} />

          <div className="content">
            <Container fluid>
              <ToastContainer />
              <div className="section-image">
                <Container>
                  <Row>
                    <Col md="12">
                      <Button onClick={listeUser} variant="info">
                        <i className="fas fa-list"></i> Retour à la liste
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form onSubmit={submitForm}>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">{id ? "Modifier utilisateur" : "Ajouter utilisateur"}</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Nom et Prenom* </label>
                                  <Form.Control
                                    value={fullname}
                                    placeholder="fullname"
                                    name="fullname"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setFullname(e.target.value)}
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>E-mail* </label>
                                  <Form.Control
                                    value={email}
                                    placeholder="E-mail"
                                    name="Email"
                                    className="required"
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Password* </label>
                                  <Form.Control
                                    value={password}
                                    placeholder="Password"
                                    className="required"
                                    name="Password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Button className="btn-fill pull-right" type="button" variant="info" onClick={submitForm}>
                              Enregistrer
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
