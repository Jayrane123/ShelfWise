import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBook, FaUserCog, FaPlus, FaTrash, FaUsers } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const adminOptions = [
    {
      title: 'Insert Book',
      description: 'Add new books to the library',
      icon: FaPlus,
      link: '/admin/insert-book',
      color: 'primary'
    },
    {
      title: 'Delete Book',
      description: 'Remove books from the library',
      icon: FaTrash,
      link: '/admin/delete-book',
      color: 'danger'
    },
    {
      title: 'Manage Users',
      description: 'View and manage student accounts',
      icon: FaUsers,
      link: '/admin/manage-users',
      color: 'success'
    },
    {
      title: 'Manage Books',
      description: 'Update and organize book inventory',
      icon: FaBook,
      link: '/admin/manage-books',
      color: 'info'
    },
    {
      title: 'Create New Admin',
      description: 'Add new administrator accounts',
      icon: FaUserCog,
      link: '/admin/create-admin',
      color: 'warning'
    }
  ];

  return (
    <div className="admin-dashboard">
      <Container className="py-5">
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <Row className="g-4">
          {adminOptions.map((option, index) => (
            <Col key={index} md={6} lg={4}>
              <Link to={option.link} className="text-decoration-none">
                <Card className="dashboard-card h-100">
                  <Card.Body>
                    <div className={`icon-circle bg-${option.color} text-white`}>
                      {React.createElement(option.icon, { size: 24 })}
                    </div>
                    <h4 className="mt-3">{option.title}</h4>
                    <p className="text-muted">{option.description}</p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard; 