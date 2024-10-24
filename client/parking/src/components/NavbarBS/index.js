import React from 'react';
import { Outlet, Link } from "react-router-dom";

import {Nav, Container, Navbar, NavDropdown} from 'react-bootstrap';

export default function NavbarBS(){
  return(
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">INETUM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></Nav.Link> 
            <Nav.Link><Link to="/admin" style={{ textDecoration: 'none' }}>admin</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};