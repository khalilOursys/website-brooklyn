"use client";
import { Button, Card, Container, Row, Col, Dropdown } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import MaterialReactTable from "material-react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { editBulkClientRequests, fetchBulkClientRequests } from "@/Redux/bulkClientRequestsReduce";

export default function Page() {
  const [entities, setEntities] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

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

  const updateBulkClientRequestsStatus = async (bulkClientRequestsId, newStatus) => {
    try {
      await dispatch(editBulkClientRequests({ id: bulkClientRequestsId, status: newStatus })).unwrap();
      notify(1, `Statut mis à jour vers ${newStatus}`);
      getBulkClientRequests(); // Rafraîchir la liste
    } catch (error) {
      notify(2, error.message || 'Échec de la mise à jour du statut');
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = ['en attente', 'approuvée'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : currentStatus;
  };

  const columns = [
    {
      header: "Email utilisateur",
      accessorKey: "user.email",
    },
    {
      header: "Prénom",
      accessorKey: "user.firstName",
    },
    {
      header: "Nom",
      accessorKey: "user.lastName",
    },
    {
      header: "Nom du magasin",
      accessorKey: "storeName",
    },
    {
      header: "Statut",
      accessorKey: "status",
      Cell: ({ cell }) => (
        <span className={`badge bg-${getStatusBadgeColor(cell.getValue())}`}>
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "id",
      header: "Actions",
      Cell: ({ cell }) => {
        const bulkClientRequests = cell.row.original;

        return (
          <div className="d-flex gap-2">
            <div className="actions-right block_action">
              <Button
                onClick={() => router.push("/bulkClientRequests/detail/" + bulkClientRequests.user.id)}
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
      header: "Changer le statut",
      Cell: ({ cell }) => {
        const bulkClientRequests = cell.row.original;
        const nextStatus = getNextStatus(bulkClientRequests.status);
        const isProcessing = loadingStates[bulkClientRequests.id];

        return (
          <div className="d-flex gap-2">
            <div className="actions-right block_action">

              {nextStatus && (
                <Button
                  onClick={() => updateBulkClientRequestsStatus(bulkClientRequests.id, nextStatus)}
                  variant="success"
                  size="sm"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Traitement...' : nextStatus}
                </Button>
              )}

              <Button
                onClick={() => updateBulkClientRequestsStatus(bulkClientRequests.id, 'annulé')}
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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'approuvée': return 'success';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'en attente': return 'warning';
      case 'annulé': return 'danger';
      default: return 'secondary';
    }
  };

  const getBulkClientRequests = useCallback(async () => {
    try {
      const response = await dispatch(fetchBulkClientRequests());
      setEntities(response.payload);
    } catch (error) {
      notify(2, "Échec du chargement des demandes groupées de clients");
    }
  }, [dispatch]);

  useEffect(() => {
    getBulkClientRequests();
  }, [getBulkClientRequests]);

  function TableauListe({ list }) {
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
        <Sidebar bulkClientRequestss={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar bulkClientRequestss={null} />
          <div className="content">
            <Container fluid>
              <ToastContainer />
              <br></br>

              <Row>
                <Col md="12">
                  <h4 className="title">Liste des demandes des clients grossistes</h4>
                  <Card>
                    <Card.Body>
                      <TableauListe list={entities} />
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
