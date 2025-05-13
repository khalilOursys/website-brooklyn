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
      notify(1, `BulkClientRequests status updated to ${newStatus}`);
      getBulkClientRequestss(); // Refresh the bulkClientRequestss list
    } catch (error) {
      notify(2, error.message || 'Failed to update bulkClientRequests status');
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = ['pending', 'approved'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : currentStatus;
  };

  const columns = [
    {
      header: "User",
      accessorKey: "user.email",
    },
    {
      header: "Name",
      accessorKey: "user.name",
    },
    {
      header: "Status",
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
                onClick={() => router.push("/admin/bulkClientRequests/detail/" + bulkClientRequests.user.id)}
                variant="info"
                size="sm"
                className="text-info btn-link view"
              >
                <i className="fa fa-eye" />
              </Button>
              {/* <Button
                onClick={() => router.push("/admin/bulkClientRequestss/edit/" + bulkClientRequests.id)}
                variant="warning"
                size="sm"
                className="text-warning btn-link edit"
              >
                <i className="fa fa-edit" />
              </Button> */}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "change",
      header: "Actions",
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
                  {isProcessing ? 'Processing...' : nextStatus}
                </Button>
              )}

              <Button
                onClick={() => updateBulkClientRequestsStatus(bulkClientRequests.id, 'cancelled')}
                variant="danger"
                size="sm"
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

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

  const getBulkClientRequestss = useCallback(async () => {
    try {
      const response = await dispatch(fetchBulkClientRequests());
      setEntities(response.payload);
    } catch (error) {
      notify(2, "Failed to load bulkClientRequestss");
    }
  }, [dispatch]);

  useEffect(() => {
    getBulkClientRequestss();
  }, [getBulkClientRequestss]);

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
        <Sidebar bulkClientRequestss={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar bulkClientRequestss={null} />
          <div className="content">
            <Container fluid>
              <ToastContainer />
              <br></br>

              <Row>
                <Col md="12">
                  <h4 className="title">Bulk Client Requests List</h4>
                  <Card>
                    <Card.Body>
                      <ListTable list={entities} />
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