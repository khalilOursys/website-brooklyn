"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import MaterialReactTable from "material-react-table";
import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Footer from "@/components/Footer/Footer";
import { fetchStatistics } from "@/Redux/statisticsReduce";

export default function StatisticsPage() {
  const dispatch = useDispatch();
  const [statistics, setStatistics] = useState({ products: [], bulks: [] });
  const [isLoading, setIsLoading] = useState(false);

  // Set default dates: January 1st of current year and current date
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toISOString().split('T')[0];
  const januaryFirst = `${currentYear}-01-01`;

  const [startDate, setStartDate] = useState(januaryFirst);
  const [endDate, setEndDate] = useState(currentDate);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(fetchStatistics({ startDate, endDate }));
      if (response.payload) {
        setStatistics(response.payload);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, startDate, endDate]);

  // Load data when component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only on mount

  const handleSearch = () => {
    fetchData();
  };

  const productColumns = [
    { header: "Nom Produit", accessorKey: "productName" },
    { header: "Quantité Totale", accessorKey: "quantitySold" },
    { header: "Montant Total (achat)", accessorKey: "cost" },
    { header: "Montant Total (vente)", accessorKey: "revenue" },
    { header: "Montant Total", accessorKey: "profit" },
  ];

  const bulkColumns = [
    { header: "Nom Produit (Gros)", accessorKey: "bulkName" },
    { header: "Quantité Totale", accessorKey: "quantitySold" },
    { header: "Montant Total (achat)", accessorKey: "cost" },
    { header: "Montant Total (vente)", accessorKey: "revenue" },
    { header: "Bénéfice", accessorKey: "profit" },
  ];

  return (
    <div className="wrapper">
      <Sidebar routes={[]} products={null} />
      <div className="main-panel">
        <AdminNavbar products={null} />
        <div className="content">
          <Container fluid>
            <Row>
              <Col md="12">
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date de début</Form.Label>
                          <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Date de fin</Form.Label>
                          <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            max={currentDate}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="d-flex align-items-end">
                        <Button
                          variant="primary"
                          onClick={handleSearch}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                              Chargement...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-search" /> Rechercher
                            </>
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={12}>
                <h4 className="title">Statistiques Produits</h4>
                <Card>
                  <Card.Body>
                    <MaterialReactTable
                      columns={productColumns}
                      data={statistics.products || []}
                      enableColumnFilters
                      enableSorting
                      enablePagination
                      state={{ isLoading }}
                    />
                  </Card.Body>
                </Card>
              </Col>

              <Col md={12}>
                <h4 className="title">Statistiques Produits en Gros</h4>
                <Card>
                  <Card.Body>
                    <MaterialReactTable
                      columns={bulkColumns}
                      data={statistics.bulks || []}
                      enableColumnFilters
                      enableSorting
                      enablePagination
                      state={{ isLoading }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
}