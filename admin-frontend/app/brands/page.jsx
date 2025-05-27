"use client"; // Marquer ceci comme un composant client
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { fetchBrands } from "@/Redux/brandsReduce";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'; // Import mis à jour pour Next.js 14
import MaterialReactTable from "material-react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";

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
      header: "Nom",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      accessorKey: "id",
      header: "Actions",
      Cell: ({ cell }) => (
        <div className="actions-right block_action">
          <Button
            onClick={() => {
              router.push("/brands/edit/" + cell.row.original.id);
            }}
            variant="warning"
            size="sm"
            className="text-warning btn-link edit"
          >
            <i className="fa fa-edit" />
          </Button>
          <Button
            onClick={() => router.push("/brands/detail/" + cell.row.original.id)}
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

  const getBrand = useCallback(async () => {
    const response = await dispatch(fetchBrands());
    setEntities(response.payload);
  }, [dispatch]);

  useEffect(() => {
    getBrand();
  }, [getBrand]);

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

  function ajouter() {
    router.push("/brands/add");
  }

  return (
    <>
      <div className="wrapper">
        <Sidebar brands={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar brands={null} />
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
                    Ajouter une marque
                  </Button>
                </Col>
                <Col md="12">
                  <h4 className="title">Liste des marques</h4>
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
