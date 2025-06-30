"use client"; // Marquer ceci comme un composant client
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { fetchBulkProducts, toggleBulkProductStatus } from "@/Redux/bulkProductsReduce";
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
      header: "Produit",
      accessorKey: "product",
      Cell: ({ cell }) => cell.row.original.product.name,
    },
    {
      header: "Quantité",
      accessorKey: "minQuantity",
    },
    {
      header: "Status",
      accessorKey: "isActive",
      Cell: ({ cell }) =>
        cell.row.original.isActive === true ? "Activé" : "Désactivé",
    },
    {
      accessorKey: "id",
      header: "Actions",
      Cell: ({ cell }) => (
        <div className="actions-right block_action">
          <Button
            onClick={() => {
              router.push("/bulkProducts/edit/" + cell.row.original.id);
            }}
            variant="warning"
            size="sm"
            className="text-warning btn-link edit"
          >
            <i className="fa fa-edit" />
          </Button>
          <Button
            onClick={(event) => {
              changeStatus(cell.row.original.id, cell.row.original.isActive);
            }}
            variant="danger"
            size="sm"
            className={
              cell.row.original.isActive === false
                ? "text-success btn-link delete"
                : "text-danger btn-link delete"
            }
          >
            <i
              className={
                cell.row.original.isActive === false ? "fa fa-check" : "fa fa-times"
              }
            />
          </Button>
          {/* <Button
            onClick={() => router.push("/bulkProducts/detail/" + cell.row.original.id)}
            variant="info"
            size="sm"
            className="text-info btn-link view"
          >
            <i className="fa fa-eye" />
          </Button> */}
        </div>
      ),
    },
  ];

  const getBulkProduct = useCallback(async () => {
    const response = await dispatch(fetchBulkProducts());
    setEntities(response.payload);
  }, [dispatch]);

  useEffect(() => {
    getBulkProduct();
  }, [getBulkProduct]);

  function TableListe({ list }) {
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
    router.push("/bulkProducts/add");
  }


  function changeStatus(id, e) {
    dispatch(toggleBulkProductStatus(id)).then((e1) => {
      getBulkProduct();
      switch (e) {
        case false:
          notify(1, "Activer avec succes");
          break;
        case true:
          notify(1, "Désactiver avec succes");
          break;
        default:
          break;
      }
    });
  }
  return (
    <>
      <div className="wrapper">
        <Sidebar bulkProducts={null} routes={[]} />
        <div className="main-panel">
          <AdminNavbar bulkProducts={null} />
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
                    Ajouter un produit en gros
                  </Button>
                </Col>
                <Col md="12">
                  <h4 className="title">Liste des produit en gros</h4>
                  <Card>
                    <Card.Body>
                      <TableListe list={entities} />
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
