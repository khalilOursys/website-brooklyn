"use client";
import { Button, Card, Container, Row, Col, Form, Table } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { getOrderById, editOrder } from "@/Redux/ordersReduce";

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

  // State declarations
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Status translation and flow logic
  const translateStatus = (status) => {
    const translations = {
      'pending': 'En attente',
      'processing': 'En cours de traitement',
      'shipped': 'Expédié',
      'completed': 'Terminé',
      'cancelled': 'Annuler'
    };
    return translations[status.toLowerCase()] || status;
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'en attente': return 'warning';
      case 'en cours de traitement': return 'info';
      case 'expédié': return 'primary';
      case 'terminé': return 'success';
      case 'annuler': return 'danger';
      default: return 'secondary';
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = ['en attente', 'en cours de traitement', 'expédié', 'terminé'];
    const currentIndex = statusFlow.indexOf(currentStatus.toLowerCase());
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : currentStatus;
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      await dispatch(editOrder({ id, status: newStatus })).unwrap();
      notify(1, `Statut de la commande mis à jour en ${translateStatus(newStatus)}`);
      fetchOrder(id); // Refresh order data
    } catch (error) {
      notify(2, error.message || 'Échec de la mise à jour du statut');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const fetchOrder = useCallback(
    async (id) => {
      try {
        setLoading(true);
        const response = await dispatch(getOrderById(id));
        const data = await response.payload;
        setOrder(data);
      } catch (error) {
        notify(2, "Échec de la récupération des données de la commande");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      fetchOrder(id);
    }
  }, [id, fetchOrder]);

  const listOrders = () => {
    router.push("/ordersBulks");
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                      <Button onClick={listOrders} variant="info">
                        <i className="fas fa-list"></i> Retour à la liste
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form>
                        <Card>
                          <Card.Header>
                            <Card.Title as="h4">Détail de la commande</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            {order ? (
                              <>
                                <Row>
                                  <Col className="pr-1" md="6">
                                    <Form.Group>
                                      <label>Client</label>
                                      <Form.Control
                                        value={order.user.firstName + " " + order.user.lastName || 'N/A'}
                                        placeholder="Client"
                                        name="client"
                                        type="text"
                                        readOnly
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col className="pl-1" md="6">
                                    <Form.Group>
                                      <label>Email</label>
                                      <Form.Control
                                        value={order.user?.email || 'N/A'}
                                        placeholder="Email"
                                        name="email"
                                        type="text"
                                        readOnly
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="pr-1" md="6">
                                    <Form.Group>
                                      <label>Numéro de téléphone</label>
                                      <Form.Control
                                        value={order.phoneNumber || 'N/A'}
                                        placeholder="Téléphone"
                                        name="phone"
                                        type="text"
                                        readOnly
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col className="pl-1" md="6">
                                    <Form.Group>
                                      <label>Statut</label>
                                      <Form.Control
                                        value={translateStatus(order.status) || 'N/A'}
                                        placeholder="Statut"
                                        name="status"
                                        type="text"
                                        readOnly
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="pr-1" md="6">
                                    <Form.Group>
                                      <label>Adresse</label>
                                      <Form.Control
                                        value={order.address || 'N/A'}
                                        placeholder="Adresse"
                                        name="address"
                                        type="text"
                                        readOnly
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col className="pl-1" md="6">
                                    <Form.Group>
                                      <label>Total</label>
                                      <Form.Control
                                        value={`${order.total || 0} TND`}
                                        placeholder="Total"
                                        name="total"
                                        type="text"
                                        readOnly
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="pr-1" md="6">
                                    <Form.Group>
                                      <label>Date de création</label>
                                      <Form.Control
                                        value={formatDate(order.createdAt) || 'N/A'}
                                        placeholder="Date"
                                        name="date"
                                        type="text"
                                        readOnly
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col className="pl-1" md="6">
                                    <Form.Group>
                                      <label>Dernière mise à jour</label>
                                      <Form.Control
                                        value={formatDate(order.updatedAt) || 'N/A'}
                                        placeholder="Mise à jour"
                                        name="update"
                                        type="text"
                                        readOnly
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>

                                {/* Status Update Buttons */}
                                <Row className="mt-3">
                                  <Col md="12">
                                    <div className="d-flex gap-2">
                                      {getNextStatus(order.status) !== order.status.toLowerCase() && (
                                        <Button
                                          onClick={() => updateOrderStatus(getNextStatus(order.status))}
                                          variant="success"
                                          disabled={updatingStatus}
                                        >
                                          {updatingStatus ? 'Traitement...' :
                                            `Passer à ${translateStatus(getNextStatus(order.status))}`}
                                        </Button>
                                      )}

                                      <Button
                                        onClick={() => updateOrderStatus('Annuler')}
                                        variant="danger"
                                        disabled={updatingStatus}
                                      >
                                        Annuler la commande
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>

                                <Row className="mt-4">
                                  <Col md="12">
                                    <h5>Articles commandés</h5>
                                    <Table striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Produit</th>
                                          <th>Quantité</th>
                                          <th>Prix unitaire</th>
                                          <th>Total</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {order.orderItems?.map((item, index) => (
                                          <tr key={index}>
                                            <td>
                                              {order.isBulk === 0 ? item.product?.name : item.bulk?.name}
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>{item.bulk.discount === 0 ? item.bulk.bulkPrice : item.bulk?.discount} TND</td>
                                            <td>{item.price} TND</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                              </>
                            ) : (
                              <p>{loading ? 'Chargement...' : 'Aucune donnée de commande disponible'}</p>
                            )}
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