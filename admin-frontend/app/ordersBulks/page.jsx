"use client";
import { Button, Card, Container, Row, Col, Dropdown, Nav } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import MaterialReactTable from "material-react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { editOrder, fetchOrders } from "@/Redux/ordersReduce";

export default function Page() {
  const [entities, setEntities] = useState([]);
  const [filteredEntities, setFilteredEntities] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loadingStates, setLoadingStates] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  // Status constants
  const STATUS_TABS = [
    { id: 'all', label: 'Toutes' },
    { id: 'pending', label: 'En attente' },
    { id: 'processing', label: 'En cours de traitement' },
    { id: 'shipped', label: 'Expédié' },
    { id: 'completed', label: 'Terminé' },
    { id: 'cancelled', label: 'Annuler' }
  ];

  const notify = (type, msg) => {
    if (type === 1)
      toast.success(
        <strong>
          <i className="fas fa-check-circle"></i>
          {msg}
        </strong>
      );
    else
      toast.error(
        <strong>
          <i className="fas fa-exclamation-circle"></i>
          {msg}
        </strong>
      );
  };

  useEffect(() => {
    console.log(entities, activeTab);

    if (activeTab === 'all') {
      setFilteredEntities(entities);
    } else {
      setFilteredEntities(entities.filter(order =>
        order.status.toLowerCase() === activeTab.toLowerCase()
      ));
    }
  }, [activeTab, entities]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoadingStates(prev => ({ ...prev, [orderId]: true }));
      await dispatch(editOrder({ id: orderId, status: newStatus })).unwrap();
      notify(1, `Statut de la commande mis à jour en ${translateStatus(newStatus)}`);
      getOrders(); // Refresh orders list
    } catch (error) {
      notify(2, error.message || 'Échec de la mise à jour du statut');
    } finally {
      setLoadingStates(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = ['pending', 'processing', 'shipped', 'completed'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : currentStatus;
  };

  const columns = [
    {
      header: "Nom",
      accessorKey: "user.name",
    },
    {
      header: "Email",
      accessorKey: "user.email",
    },
    {
      header: "Total",
      accessorKey: "total",
      Cell: ({ cell }) => `${cell.getValue().toFixed(3)} TND`,
    },
    {
      header: "Statut",
      accessorKey: "status",
      Cell: ({ cell }) => (
        <span className={`badge bg-${getStatusBadgeColor(cell.getValue())}`}>
          {translateStatus(cell.getValue())}
        </span>
      ),
    },
    {
      header: "Adresse",
      accessorKey: "address",
    },
    {
      header: "Téléphone",
      accessorKey: "phoneNumber",
    },
    {
      accessorKey: "id",
      header: "Détails",
      Cell: ({ cell }) => {
        const order = cell.row.original;
        return (
          <div className="d-flex gap-2">
            <div className="actions-right block_action">
              <Button
                onClick={() => router.push("/ordersBulks/detail/" + order.id)}
                variant="info"
                size="sm"
                className="text-info btn-link view"
              >
                <i className="fa fa-eye" />
              </Button>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "change",
      header: "Actions",
      Cell: ({ cell }) => {
        const order = cell.row.original;
        const nextStatus = getNextStatus(order.status);
        const isProcessing = loadingStates[order.id];

        return (
          <div className="d-flex gap-2">
            <div className="actions-right block_action">
              {nextStatus && nextStatus !== order.status && (
                <Button
                  onClick={() => updateOrderStatus(order.id, nextStatus)}
                  variant="success"
                  size="sm"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Traitement...' : translateStatus(nextStatus)}
                </Button>
              )}

              <Button
                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                variant="danger"
                size="sm"
                disabled={isProcessing}
              >
                Annuler
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const translateStatus = (status) => {
    const translations = {
      'pending': 'en attente',
      'processing': 'en traitement',
      'shipped': 'expédiée',
      'completed': 'terminée',
      'cancelled': 'annulée'
    };
    return translations[status] || status;
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const getOrders = useCallback(async () => {
    try {
      const response = await dispatch(fetchOrders({ isBulk: 1 }));
      setEntities(response.payload);
    } catch (error) {
      notify(2, "Échec du chargement des commandes");
    }
  }, [dispatch]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  function ListTable({ list }) {
    return (
      <MaterialReactTable
        columns={columns}
        data={list}
        enableColumnActions={true}
        enableColumnFilters={true}
        enablePagination={true}
        enableSorting={true}
        enableBottomToolbar={true}
        enableTopToolbar={true}
        muiTableBodyRowProps={{ hover: false }}
      />
    );
  }

  return (
    <>
      <div className="wrapper">
        <Sidebar orders={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar orders={null} />
          <div className="content">
            <Container fluid>
              <ToastContainer />
              <br></br>

              <Row>
                <Col md="12">
                  <h4 className="title">Liste des Commandes</h4>
                  <Card>
                    <Card.Header>
                      <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
                        {STATUS_TABS.map(tab => (
                          <Nav.Item key={tab.id}>
                            <Nav.Link eventKey={tab.id}>{tab.label}</Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                    </Card.Header>
                    <Card.Body>
                      <ListTable list={filteredEntities} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
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