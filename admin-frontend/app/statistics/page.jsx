"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Form, Nav } from "react-bootstrap";
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
  const [activeTab, setActiveTab] = useState('products');

  // Define the tabs
  const STATISTICS_TABS = [
    { id: 'products', label: 'Produits' },
    { id: 'bulks', label: 'Produits en Gros' }
  ];

  // Set default dates: January 1st of current year and current date
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toISOString().split('T')[0];
  const januaryFirst = `${currentYear}-01-01`;

  const [startDate, setStartDate] = useState(januaryFirst);
  const [endDate, setEndDate] = useState(currentDate);

  // Calculate totals for products
  const productsTotal = statistics.products.reduce((acc, product) => {
    return {
      revenue: acc.revenue + (product.revenue || 0),
      cost: acc.cost + (product.cost || 0),
      profit: acc.profit + (product.profit || 0)
    };
  }, { revenue: 0, cost: 0, profit: 0 });

  // Calculate totals for bulks
  const bulksTotal = statistics.bulks.reduce((acc, bulk) => {
    return {
      revenue: acc.revenue + (bulk.revenue || 0),
      cost: acc.cost + (bulk.cost || 0),
      profit: acc.profit + (bulk.profit || 0)
    };
  }, { revenue: 0, cost: 0, profit: 0 });

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
    { header: "Montant Total (achat)", accessorKey: "cost", Cell: ({ cell }) => `${cell.getValue().toFixed(3)} TND` },
    { header: "Montant Total (vente)", accessorKey: "revenue", Cell: ({ cell }) => `${cell.getValue().toFixed(3)} TND` },
    { header: "Bénéfice", accessorKey: "profit", Cell: ({ cell }) => `${cell.getValue().toFixed(3)} TND` },
  ];

  const bulkColumns = [
    { header: "Nom Produit (Gros)", accessorKey: "bulkName" },
    { header: "Quantité Totale", accessorKey: "quantitySold" },
    { header: "Montant Total (achat)", accessorKey: "cost", Cell: ({ cell }) => `${cell.getValue().toFixed(3)} TND` },
    { header: "Montant Total (vente)", accessorKey: "revenue", Cell: ({ cell }) => `${cell.getValue().toFixed(3)} TND` },
    { header: "Bénéfice", accessorKey: "profit", Cell: ({ cell }) => `${cell.getValue().toFixed(3)} TND` },
  ];

  // Helper function to render summary cards
  const renderSummaryCards = (totals) => (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="card-stats">
          <Card.Body>
            <Row>
              <Col xs={5}>
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-money-coins text-success" />
                </div>
              </Col>
              <Col xs={7}>
                <div className="numbers">
                  <p className="card-category">Revenue Total</p>
                  <Card.Title as="h4">{totals.revenue.toFixed(3)} TND</Card.Title>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="card-stats">
          <Card.Body>
            <Row>
              <Col xs={5}>
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-cart-simple text-danger" />
                </div>
              </Col>
              <Col xs={7}>
                <div className="numbers">
                  <p className="card-category">Coût Total</p>
                  <Card.Title as="h4">{totals.cost.toFixed(3)} TND</Card.Title>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="card-stats">
          <Card.Body>
            <Row>
              <Col xs={5}>
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-chart-bar-32 text-info" />
                </div>
              </Col>
              <Col xs={7}>
                <div className="numbers">
                  <p className="card-category">Bénéfice Total</p>
                  <Card.Title as="h4">{totals.profit.toFixed(3)} TND</Card.Title>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

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

              <Col md="12">
                <Card>
                  <Card.Header>
                    <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
                      {STATISTICS_TABS.map(tab => (
                        <Nav.Item key={tab.id}>
                          <Nav.Link eventKey={tab.id}>{tab.label}</Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </Card.Header>
                  <Card.Body>
                    {activeTab === 'products' && (
                      <>
                        <h4 className="title">Statistiques Produits</h4>
                        {renderSummaryCards(productsTotal)}
                        <MaterialReactTable
                          columns={productColumns}
                          data={statistics.products || []}
                          enableColumnFilters
                          enableSorting
                          enablePagination
                          state={{ isLoading }}
                        />
                      </>
                    )}
                    {activeTab === 'bulks' && (
                      <>
                        <h4 className="title">Statistiques Produits en Gros</h4>
                        {renderSummaryCards(bulksTotal)}
                        <MaterialReactTable
                          columns={bulkColumns}
                          data={statistics.bulks || []}
                          enableColumnFilters
                          enableSorting
                          enablePagination
                          state={{ isLoading }}
                        />
                      </>
                    )}
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