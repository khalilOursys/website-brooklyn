"use client";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
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

  // Déclarations d'état
  const [data, setData] = useState({
    email: "",
    telephone: "",
    firstName: "",
    lastName: "",
    bulkRequests: {
      storeName: "",
      rib: "",
      taxNumber: "",
      legalDocs: "",
      status: ""
    },
    userCities: []
  });

  const [cities, setCities] = useState([]); // All available cities as options for Select
  const [selectedCities, setSelectedCities] = useState([]); // Selected cities for Select component
  const [loading, setLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [updatingCities, setUpdatingCities] = useState(false);

  // Fetch user data
  const fetchUser = useCallback(
    async (id) => {
      try {
        setLoading(true);
        const response = await fetch(`${Configuration.BACK_BASEURL}users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();

        setData(userData || {
          email: "",
          telephone: "",
          firstName: "",
          lastName: "",
          bulkRequests: {
            storeName: "",
            rib: "",
            taxNumber: "",
            legalDocs: "",
            status: ""
          },
          userCities: []
        });

        // If user has cities, set selected cities for Select component
        if (userData?.userCities) {
          const selectedCityOptions = userData.userCities.map(uc => ({
            value: uc.cityId,
            label: uc.city?.name || `Ville ${uc.cityId}`
          }));
          setSelectedCities(selectedCityOptions);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        notify(2, "Échec de la récupération des données utilisateur");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch all available cities
  const fetchAllCities = useCallback(async () => {
    try {
      setCitiesLoading(true);
      const response = await fetch(`${Configuration.BACK_BASEURL}cities`);
      if (!response.ok) throw new Error('Échec du chargement des villes');
      const citiesData = await response.json();

      const cityOptions = citiesData.map(city => ({
        value: city.id,
        label: city.name,
      }));

      setCities(cityOptions);
    } catch (error) {
      console.error("Erreur lors de la récupération des villes:", error);
      notify(2, "Échec de la récupération des villes");
    } finally {
      setCitiesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchUser(id);
      fetchAllCities();
    }
  }, [id, fetchUser, fetchAllCities]);

  const handleUpdateCities = async () => {
    if (!id) {
      notify(2, "ID utilisateur manquant");
      return;
    }

    if (selectedCities.length === 0) {
      notify(2, "Veuillez sélectionner au moins une ville");
      return;
    }

    try {
      setUpdatingCities(true);

      const cityIds = selectedCities.map(city => city.value);

      const response = await fetch(`${Configuration.BACK_BASEURL}users/${id}/cities`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cityIds }),
      });

      if (response.ok) {
        const result = await response.json();
        notify(1, result.message || "Villes mises à jour avec succès");
        // Refresh user data to get updated cities
        await fetchUser(id);
      } else {
        const errorData = await response.json();
        notify(2, errorData.message || "Échec de la mise à jour des villes");
      }
    } catch (error) {
      console.error("Error updating cities:", error);
      notify(2, "Erreur lors de la mise à jour des villes");
    } finally {
      setUpdatingCities(false);
    }
  };

  const listeUser = () => {
    router.push("/bulkClientRequests");
  };

  const handleDownloadDocument = () => {
    if (!data?.bulkRequests?.legalDocs) {
      notify(2, "Aucun document disponible pour téléchargement");
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = data.bulkRequests.legalDocs;
      link.target = '_blank';
      link.download = `document_${data.firstName || 'utilisateur'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      notify(2, "Échec du téléchargement du document");
    }
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

                  {/* User Information Card - All fields read-only */}
                  <Row>
                    <Col md="12">
                      <Form>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">Détails de l'utilisateur</Card.Title>
                            <p className="text-muted">Les informations de l'utilisateur sont en lecture seule</p>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Prénom</label>
                                  <Form.Control
                                    value={data?.firstName || ""}
                                    placeholder="Prénom"
                                    name="firstName"
                                    className="required"
                                    type="text"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Nom</label>
                                  <Form.Control
                                    value={data?.lastName || ""}
                                    placeholder="Nom"
                                    name="lastName"
                                    className="required"
                                    type="text"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Email</label>
                                  <Form.Control
                                    value={data?.email || ""}
                                    placeholder="Email"
                                    name="email"
                                    className="required"
                                    type="text"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Téléphone</label>
                                  <Form.Control
                                    value={data?.telephone || "Non fourni"}
                                    placeholder="Téléphone"
                                    name="telephone"
                                    className="required"
                                    type="text"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Nom du magasin</label>
                                  <Form.Control
                                    value={data?.bulkRequests?.storeName || ""}
                                    placeholder="Nom du magasin"
                                    className="required"
                                    name="storeName"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>Statut</label>
                                  <Form.Control
                                    value={data?.bulkRequests?.status || ""}
                                    placeholder="Statut"
                                    className="required"
                                    name="status"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="6">
                                <Form.Group>
                                  <label>RIB</label>
                                  <Form.Control
                                    value={data?.bulkRequests?.rib || "Non fourni"}
                                    placeholder="RIB"
                                    className="required"
                                    name="rib"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                              <Col className="pl-1" md="6">
                                <Form.Group>
                                  <label>Numéro de taxe</label>
                                  <Form.Control
                                    value={data?.bulkRequests?.taxNumber || "Non fourni"}
                                    placeholder="Numéro de taxe"
                                    className="required"
                                    name="taxNumber"
                                    readOnly
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-1" md="12">
                                <Form.Group>
                                  <label>Document légal</label>
                                  <div className="d-flex align-items-center">
                                    {data?.bulkRequests?.legalDocs && (
                                      <Button
                                        variant="success"
                                        className="ml-2"
                                        onClick={handleDownloadDocument}
                                        disabled={loading}
                                      >
                                        <i className="fas fa-download"></i> Télécharger
                                      </Button>
                                    )}
                                  </div>
                                  <div className="error"></div>
                                </Form.Group>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Form>
                    </Col>
                  </Row>

                  {/* Cities Management Card - Editable with Select component */}
                  <Row className="mt-4">
                    <Col md="12">
                      <Card>
                        <Card.Header>
                          <Card.Title as="h4">Gestion des Villes</Card.Title>
                          <p className="text-muted">Sélectionnez les villes associées à cet utilisateur</p>
                        </Card.Header>
                        <Card.Body>
                          {citiesLoading ? (
                            <div className="text-center">
                              <i className="fas fa-spinner fa-spin"></i> Chargement des villes...
                            </div>
                          ) : cities.length === 0 ? (
                            <div className="alert alert-warning">
                              Aucune ville disponible
                            </div>
                          ) : (
                            <>
                              <Row>
                                <Col className="pr-1" md="12">
                                  <Form.Group>
                                    <label>Villes *</label>
                                    <Select
                                      options={cities}
                                      value={selectedCities}
                                      onChange={(selectedOptions) => setSelectedCities(selectedOptions || [])}
                                      isMulti
                                      placeholder="Sélectionner une ou plusieurs villes"
                                      closeMenuOnSelect={false}
                                      isDisabled={updatingCities}
                                      isLoading={citiesLoading}
                                      className="react-select-container"
                                      classNamePrefix="react-select"
                                    />
                                    <small className="text-muted">
                                      {selectedCities.length > 0
                                        ? `${selectedCities.length} ville(s) sélectionnée(s)`
                                        : "Sélectionnez les villes où cet utilisateur opère"}
                                    </small>
                                    <div className="error"></div>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <div className="mt-4 d-flex align-items-center">
                                <Button
                                  variant="primary"
                                  onClick={handleUpdateCities}
                                  disabled={updatingCities || selectedCities.length === 0}
                                >
                                  {updatingCities ? (
                                    <>
                                      <i className="fas fa-spinner fa-spin me-2"></i> Mise à jour...
                                    </>
                                  ) : (
                                    <>
                                      <i className="fas fa-save me-2"></i> Mettre à jour les villes
                                    </>
                                  )}
                                </Button>

                                <Button
                                  variant="outline-secondary"
                                  className="ms-3"
                                  onClick={() => {
                                    // Reset to original user cities
                                    if (data?.userCities) {
                                      const originalCityOptions = data.userCities.map(uc => ({
                                        value: uc.cityId,
                                        label: uc.city?.name || `Ville ${uc.cityId}`
                                      }));
                                      setSelectedCities(originalCityOptions);
                                    } else {
                                      setSelectedCities([]);
                                    }
                                  }}
                                  disabled={updatingCities}
                                >
                                  <i className="fas fa-undo me-2"></i> Réinitialiser
                                </Button>
                              </div>
                            </>
                          )}

                          {/* Display current user cities as badges */}
                          {data?.userCities && data.userCities.length > 0 && (
                            <div className="mt-4">
                              <h6>Villes actuellement associées :</h6>
                              <div className="d-flex flex-wrap gap-2 mt-2">
                                {data.userCities.map((userCity) => (
                                  <span key={userCity.id} className="badge bg-primary p-2">
                                    <i className="fas fa-city me-1"></i>
                                    {userCity.city?.name || `Ville ID: ${userCity.cityId}`}
                                  </span>
                                ))}
                              </div>
                              <small className="text-muted mt-2 d-block">
                                Total: {data.userCities.length} ville(s)
                              </small>
                            </div>
                          )}

                          {(!data?.userCities || data.userCities.length === 0) && selectedCities.length === 0 && (
                            <div className="alert alert-info mt-3">
                              <i className="fas fa-info-circle me-2"></i>
                              Aucune ville n'est actuellement associée à cet utilisateur. Veuillez sélectionner des villes ci-dessus.
                            </div>
                          )}
                        </Card.Body>
                      </Card>
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