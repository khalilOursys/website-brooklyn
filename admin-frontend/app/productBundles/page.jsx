"use client"; // Mark this as a Client Component
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'; // Updated import for Next.js 14
import MaterialReactTable from "material-react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { fetchProductBundles } from "@/Redux/bundleProductsReduce";

export default function Page() {
  const [entities, setEntities] = useState([]);
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

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    /* {
      header: "Product",
      accessorKey: "product",
      Cell: ({ cell }) => cell.row.original.products.name,
    }, */
    {
      header: "price",
      accessorKey: "discount",
    },
    {
      accessorKey: "id",
      header: "actions",
      Cell: ({ cell }) => (
        <div className="actions-right block_action">
          <Button
            onClick={() => {
              router.push("/productBundles/edit/" + cell.row.original.id);
            }}
            variant="warning"
            size="sm"
            className="text-warning btn-link edit"
          >
            <i className="fa fa-edit" />
          </Button>
          <Button
            onClick={() => router.push("/productBundles/detail/" + cell.row.original.id)}
            variant="info"
            size="sm"
            className="text-info btn-link view"
          >
            <i className="fa fa-eye" />
          </Button>
        </div>
      ),
    },
  ];

  const getBulkProduct = useCallback(async () => {
    const response = await dispatch(fetchProductBundles());
    setEntities(response.payload);
  }, [dispatch]);

  useEffect(() => {
    getBulkProduct();
  }, [getBulkProduct]);

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

  function ajouter() {
    router.push("/productBundles/add");
  }

  return (
    <>
      <div className="wrapper">
        <Sidebar productBundles={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar productBundles={null} />
          <div className="content">
            <Container fluid>
              <ToastContainer />
              <br></br>

              <Row>
                <Col md="8">
                  <Button
                    id="saveBL"
                    className="btn-wd mr-1 float-left"
                    type="button"
                    variant="success"
                    onClick={ajouter}
                  >
                    <span className="btn-label">
                      <i className="fas fa-plus"></i>
                    </span>
                    Ajouter un pack
                  </Button>
                </Col>
                <Col md="12">
                  <h4 className="title">Liste des packs</h4>
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
