import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Table, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AddBook.css';
import { toast } from 'react-toastify';

const AddBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    coverImage: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Load existing books from localStorage
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await addBooks(formData);
      setSuccess('Book added successfully!');
      toast.success('Book added successfully!');
      setTimeout(() => {
        navigate('/admin/manage-books');
      }, 1500);
    } catch (err) {
      setError('Failed to add book. Please try again.');
      toast.error('Failed to add book!');
    }
  };

  return (
    <div className="addbook-page">
      <img src="/images/Library.avif" alt="Library Background" className="addbook-bg" />
      <Container fluid className="py-4">
        <Row>
          <Col md={6} className="book-list-section">
            <Card>
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">Current Book Collection</h4>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                  <Table striped bordered hover>
                    <thead className="sticky-top bg-white">
                      <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Available</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book) => (
                        <tr key={book.id}>
                          <td>
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              style={{ width: '50px', height: '75px', objectFit: 'cover' }}
                            />
                          </td>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.isbn}</td>
                          <td>
                            <span className={`badge bg-${book.available ? 'success' : 'danger'}`}>
                              {book.available ? 'Available' : 'Checked Out'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="add-book-section">
            <Card>
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">Add New Book</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Cover Image URL</Form.Label>
                    <Form.Control
                      type="url"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="success" type="submit">
                      Add Book
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/admin/dashboard')}>
                      Back to Dashboard
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

AddBook.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      isbn: PropTypes.string.isRequired,
      coverImage: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired
    })
  ),
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

export default AddBook; 