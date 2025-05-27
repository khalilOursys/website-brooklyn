"use client"; // Marquer ceci comme un composant client
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "@/Redux/productsReduce";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'; // Importation mise à jour pour Next.js 14
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

  // Fonction de notification
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

  // Définition des colonnes du tableau
  const columns = [
    {
      header: "Nom",
      accessorKey: "name",
    },
    {
      header: "Prix",
      accessorKey: "price",
    },
    {
      header: "Catégorie",
      accessorKey: "category.name",
    },
    {
      header: "Marque",
      accessorKey: "brand.name",
    },
    {
      accessorKey: "id",
      header: "Actions",
      Cell: ({ cell }) => (
        <div className="actions-right block_action">
          <Button
            onClick={() => {
              router.push("/products/edit/" + cell.row.original.id);
            }}
            variant="warning"
            size="sm"
            className="text-warning btn-link edit"
          >
            <i className="fa fa-edit" />
          </Button>
        </div>
      ),
    },
  ];

  // Récupérer les produits
  const getProduct = useCallback(async () => {
    const response = await dispatch(fetchProducts());
    setEntities(response.payload);
  }, [dispatch]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  // Composant tableau
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

  // Aller à la page d'ajout
  function ajouter() {
    router.push("/products/add");
  }

  return (
    <>
      <div className="wrapper">
        <Sidebar products={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar products={null} />
          <div className="content">
            <Container fluid>
              <ToastContainer />
              <br />
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
                    Ajouter un produit
                  </Button>
                </Col>
                <Col md="12">
                  <h4 className="title">Liste des produits</h4>
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
