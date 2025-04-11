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
import { editOrder, fetchOrders } from "@/Redux/ordersReduce";

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

  const updateOrderStatus = async (orderId, newStatus) => {

    try {
      await dispatch(editOrder({ id: orderId, status: newStatus })).unwrap();
      notify(1, `Order status updated to ${newStatus}`);
      getOrders(); // Refresh the orders list
    } catch (error) {
      notify(2, error.message || 'Failed to update order status');
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = ['pending', 'processing', 'shipped', 'completed'];
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
      header: "Total",
      accessorKey: "total",
      Cell: ({ cell }) => `${cell.getValue().toFixed(3)} TND`,
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
      header: "Address",
      accessorKey: "address",
    },
    {
      header: "Phone",
      accessorKey: "phoneNumber",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
    },
    {
      accessorKey: "id",
      header: "Actions",
      Cell: ({ cell }) => {
        const order = cell.row.original;
        const nextStatus = getNextStatus(order.status);
        const isProcessing = loadingStates[order.id];

        return (
          <div className="d-flex gap-2">
            <div className="actions-right block_action">
              <Button
                onClick={() => router.push("/orders/details/" + order.id)}
                variant="info"
                size="sm"
                className="text-info btn-link view"
              >
                <i className="fa fa-eye" />
              </Button>
              <Button
                onClick={() => router.push("/admin/orders/edit/" + order.id)}
                variant="warning"
                size="sm"
                className="text-warning btn-link edit"
              >
                <i className="fa fa-edit" />
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

              {nextStatus && (
                <Button
                  onClick={() => updateOrderStatus(order.id, nextStatus)}
                  variant="success"
                  size="sm"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : nextStatus}
                </Button>
              )}

              <Button
                onClick={() => updateOrderStatus(order.id, 'cancelled')}
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

  const getOrders = useCallback(async () => {
    try {
      const response = await dispatch(fetchOrders());
      setEntities(response.payload);
    } catch (error) {
      notify(2, "Failed to load orders");
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
                  <h4 className="title">Orders List</h4>
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