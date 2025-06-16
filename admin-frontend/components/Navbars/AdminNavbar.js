import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Dropdown, Button, Col } from "react-bootstrap";
import { useRouter } from "next/router"; // Import useRouter here

function AdminNavbar({ users }) {
  function LogOut(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.replace("/");
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-minimize">
            <Button
              className="btn-fill btn-round btn-icon d-none d-lg-block bg-dark border-dark"
              variant="dark"
              onClick={() => document.body.classList.toggle("sidebar-mini")}
            >
              <i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
              <i className="fas fa-bars visible-on-sidebar-mini"></i>
            </Button>
            <Button
              className="btn-fill btn-round btn-icon d-block d-lg-none bg-dark border-dark"
              variant="dark"
              onClick={() =>
                document.documentElement.classList.toggle("nav-open")
              }
            >
              <i className="fas fa-list"></i>
              <i className="fas fa-bars visible-on-sidebar-mini"></i>
            </Button>
          </div>
          <Navbar.Brand
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          ></Navbar.Brand>
        </div>
        <Col md="4">
          {/* You can use location state to display dynamic content if needed */}
          {/* <p>Current location: dddd</p> */}
        </Col>
        <Col md="6">
          <Navbar.Collapse id="basic-navbar-nav" className="dropdown-profile">
            <Nav className="ml-auto" navbar>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="navbarDropdownMenuLink"
                  variant="default"
                  className="m-0"
                >
                  <span className="no-icon">Admin </span>
                </Dropdown.Toggle>
                <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                  {/* <Dropdown.Item href="#" onClick={() => router.push("/admin")}>
                    <i className="fas fa-users-cog"></i>
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    onClick={() => router.push("/profile")}
                  >
                    <i className="fas fa-user"></i>
                    Profile
                  </Dropdown.Item> */}
                  <Dropdown.Item href="#" onClick={LogOut}>
                    <i className="nc-icon nc-button-power"></i>
                    Déconnecter
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Col>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
