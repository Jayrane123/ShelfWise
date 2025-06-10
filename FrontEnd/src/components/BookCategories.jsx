import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import './BookCategories.css';

const BookCategories = () => {
  const [categories] = useState([
    {
      id: 1,
      name: 'Java Programming',
      description: 'Core Java and Java programming concepts',
      books: [
        {
          id: 1,
          title: 'Core Java Volume I – Fundamentals',
          author: 'Cay S. Horstmann',
          available: true,
          coverImage: 'https://m.media-amazon.com/images/I/51CjM9zrCpL._SX376_BO1,204,203,200_.jpg',
          description: 'Comprehensive introduction to Java programming'
        },
        {
          id: 2,
          title: 'Java: The Complete Reference',
          author: 'Herbert Schildt',
          available: true,
          coverImage: 'https://m.media-amazon.com/images/I/71KbHs-K-FL._AC_UY218_.jpg',
          description: 'Complete guide to Java programming language'
        }
      ]
    },
    {
      id: 2,
      name: 'Advanced Java',
      description: 'Advanced Java topics including frameworks and enterprise development',
      books: [
        {
          id: 3,
          title: 'Spring Boot in Action',
          author: 'Craig Walls',
          available: true,
          coverImage: 'https://m.media-amazon.com/images/I/71SIE+olYvL._AC_UY218_.jpg',
          description: 'Guide to Spring Boot framework'
        },
        {
          id: 4,
          title: 'Java Persistence with Hibernate',
          author: 'Christian Bauer',
          available: true,
          coverImage: 'https://m.media-amazon.com/images/I/61u6CmutH8L._AC_UY218_.jpg',
          description: 'Comprehensive guide to Hibernate and JPA'
        }
      ]
    },
    {
      id: 3,
      name: 'C++ Programming',
      description: 'C++ programming language and object-oriented concepts',
      books: [
        {
          id: 5,
          title: 'C++ Primer',
          author: 'Stanley Lippman',
          available: true,
          coverImage: 'https://m.media-amazon.com/images/I/51U5PzjHqFL._SX379_BO1,204,203,200_.jpg',
          description: 'Comprehensive introduction to C++'
        },
        {
          id: 6,
          title: 'Effective Modern C++',
          author: 'Scott Meyers',
          available: true,
          coverImage: 'https://m.media-amazon.com/images/I/71RwRYqZX8L._AC_UY218_.jpg',
          description: 'Guide to modern C++ programming'
        }
      ]
    },
    {
      id: 4,
      name: 'Operating Systems',
      description: 'Operating system concepts and implementation',
      books: [
        {
          id: 7,
          title: 'Operating System Concepts',
          author: 'Abraham Silberschatz',
          available: true,
          coverImage: 'https://m.media-amazon.com/images/I/51Qy2upM+aL._SX442_BO1,204,203,200_.jpg',
          description: 'Comprehensive guide to operating systems'
        },
        {
          id: 8,
          title: 'Modern Operating Systems',
          author: 'Andrew S. Tanenbaum',
          available: true,
          coverImage: 'https://m.media-amazon.com/images/I/81ppeZtV5kL._AC_UY218_.jpg',
          description: 'In-depth coverage of modern OS concepts'
        }
      ]
    },
    {
      id: 5,
      name: 'Database Management Systems',
      description: 'Database concepts, design, and implementation',
      books: [
        {
          id: 9,
          title: 'Database System Concepts',
          author: 'Abraham Silberschatz',
          available: true,
          coverImage: 'https://m.media-amazon.com/images/I/51cSSGZDEOL._SX442_BO1,204,203,200_.jpg',
          description: 'Comprehensive guide to database systems'
        },
        {
          id: 10,
          title: 'SQL: The Complete Reference',
          author: 'James R. Groff',
          available: true,
          coverImage: 'https://m.media-amazon.com/images/I/71jZN7rKJqL._AC_UY218_.jpg',
          description: 'Complete guide to SQL and database management'
        }
      ]
    }
  ]);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Library Book Categories</h1>
      <Row>
        {categories.map(category => (
          <Col key={category.id} lg={6} className="mb-4">
            <Card className="category-card h-100">
              <Card.Header className="bg-primary text-white">
                <h3>{category.name}</h3>
              </Card.Header>
              <Card.Body>
                <Card.Text>{category.description}</Card.Text>
                <ListGroup variant="flush">
                  {category.books.map(book => (
                    <ListGroup.Item key={book.id} className="book-item">
                      <div className="d-flex">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="book-cover me-3"
                        />
                        <div>
                          <h5>{book.title}</h5>
                          <p className="mb-1">by {book.author}</p>
                          <p className="text-muted small mb-2">{book.description}</p>
                          <Badge bg={book.available ? 'success' : 'danger'}>
                            {book.available ? 'Available' : 'Checked Out'}
                          </Badge>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

BookCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      books: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,
          available: PropTypes.bool.isRequired,
          coverImage: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired
        })
      ).isRequired
    })
  )
};

export default BookCategories; 