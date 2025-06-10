import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About ShelfWise</h5>
            <p>
              Your comprehensive library management system designed to make book management
              and borrowing a seamless experience.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/more-info">More Info</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <ul className="list-unstyled">
              <li>Email: info@shelfwise.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Library Street</li>
              <li>City, State 12345</li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <hr className="bg-light" />
            <p className="mb-0">© 2024 ShelfWise. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 