import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup, Button } from 'react-bootstrap';
import { api } from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await api.getBooks();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books');
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchBooks();
      return;
    }
    
    setLoading(true);
    try {
      const results = await api.searchBooks(searchQuery);
      setBooks(results);
    } catch (err) {
      setError('Failed to search books');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">Loading books...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <div className="text-center text-danger">{error}</div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Library Books</h2>
      
      {/* Search Section */}
      <Row className="mb-4">
        <Col md={12}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Books Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <Card className="h-100 book-card">
              <Card.Img 
                variant="top" 
                src={book.coverImage} 
                alt={book.title}
                className="book-cover"
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {book.author}<br />
                  <strong>ISBN:</strong> {book.isbn}<br />
                  <Badge bg={book.available ? 'success' : 'danger'}>
                    {book.available ? 'Available' : 'Checked Out'}
                  </Badge>
                </Card.Text>
                <Card.Text className="text-muted">
                  {book.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {books.length === 0 && (
        <div className="text-center mt-4">
          <p>No books found matching your criteria.</p>
        </div>
      )}
    </Container>
  );
};

export default BookList; 