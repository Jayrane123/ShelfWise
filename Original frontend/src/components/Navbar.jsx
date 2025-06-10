import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Navbar = () => {
  return (
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/about">About Us</Nav.Link>
      <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
    </Nav>
  );
};

export default Navbar; 