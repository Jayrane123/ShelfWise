import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
      <div className="about-section">
        <div className="about-content">
          <h1 className="text-center mb-4">About ShelfWise</h1>
          <p>
            ShelfWise is a modern library management system built to streamline the way libraries
            operate and serve their communities. Our system combines powerful functionality with an
            intuitive interface to make library management efficient and enjoyable.
          </p>
          <p>Key features include:</p>
          <ul>
            <li>Digital catalog management</li>
            <li>User-friendly book borrowing system</li>
            <li>Automated due date tracking</li>
            <li>Real-time availability status</li>
            <li>Comprehensive admin dashboard</li>
            <li>Secure user authentication</li>
          </ul>
          <p>
            Our mission is to make library management more efficient while providing an excellent
            experience for both library staff and patrons. We believe in the power of technology to
            enhance traditional library services and make them more accessible to everyone.
          </p>
        </div>
      </div>

      <section className="team-section">
        <Container>
          <h2 className="text-center mb-5">Our Team</h2>
          <Row className="justify-content-center">
            <Col md={4} sm={6} className="mb-4">
              <Card className="text-center shadow team-card">
                <Card.Img variant="top" src="/images/jay.png" />
                <Card.Body>
                  <Card.Title>Jay Rane</Card.Title>
                  <Card.Text>Project Lead</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} sm={6} className="mb-4">
              <Card className="text-center shadow team-card">
                <Card.Img variant="top" src="/images/nitu.jpeg" />
                <Card.Body>
                  <Card.Title>Nitu Sharma</Card.Title>
                  <Card.Text>UI/UX Designer</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} sm={6} className="mb-4">
              <Card className="text-center shadow team-card">
                <Card.Img variant="top" src="/images/pratiksha.jpeg" />
                <Card.Body>
                  <Card.Title>Pratiksha Singh</Card.Title>
                  <Card.Text>BackEnd Designer</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutUs;
