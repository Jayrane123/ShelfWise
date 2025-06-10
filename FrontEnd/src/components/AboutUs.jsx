import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AboutUs.css';

// import jayImg from '../../public/Assets/jay.png'
// import pratikshaImg from '../../public/Assets/pratiksha.jpg';
// import nituImg from '../../public/Assets/nitu.jpg';

const AboutUs = () => {
  const owners = [
  {
    name: "Jay Rane",
    role: "Project Lead",
    image: "/images/jay.png",
    description: "Responsible for overseeing the project’s development lifecycle and ensuring timely delivery of all key milestones."
  },
  {
    name: "Pratiksha Shilimkar",
    role: "Designer",
    image: "/images/pratiksha.jpeg",
    description: "Focused on crafting clean and user-friendly interface designs to enhance overall user experience."
  },
  {
    name: "Nitu Patil",
    role: "Backend Developer",
    image: "/images/nitu.jpeg",
    description: "Handles server-side logic, API integration, and ensures efficient database operations throughout the application."
  }
];


  return (
    <div className="about-us-page">
      <Container className="py-5">
        {/* Project Description */}
        <Row className="mb-5">
          <Col>
            <div className="project-description">
              <h1 className="text-center mb-4">About ShelfWise</h1>
              <p className="lead text-center mb-4">
                Welcome to ShelfWise, your comprehensive digital library management system.
              </p>
              <div className="description-content">
                <p>
                  ShelfWise is a modern, user-friendly platform designed to revolutionize how libraries
                  manage their resources and serve their communities. Our system combines powerful
                  functionality with an intuitive interface to make library management efficient and
                  enjoyable.
                </p>
                <p>
                  Key features include:
                </p>
                <ul>
                  <li>Digital catalog management</li>
                  <li>User-friendly book borrowing system</li>
                  <li>Automated due date tracking</li>
                  <li>Real-time availability status</li>
                  <li>Comprehensive admin dashboard</li>
                  <li>Secure user authentication</li>
                </ul>
                <p>
                  Our mission is to make library management more efficient while providing an
                  excellent experience for both library staff and patrons. We believe in the power
                  of technology to enhance traditional library services and make them more
                  accessible to everyone.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Team Members */}
        <Row>
          <Col>
            <h2 className="text-center mb-4">Our Team</h2>
          </Col>
        </Row>
        <Row className="g-4">
          {owners.map((owner, index) => (
            <Col key={index} md={4}>
              <Card className="h-100 owner-card">
                <Card.Img 
                  variant="top" 
                  src={owner.image} 
                  alt={owner.name}
                  className="owner-image"
                />
                <Card.Body>
                  <Card.Title>{owner.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{owner.role}</Card.Subtitle>
                  <Card.Text>{owner.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs; 