import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getBooks, issueBookToUser } from '../services/BooksService';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await getBooks(); // Only avail books
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleIssue = async (bookId) => {
    try {
      await issueBookToUser(bookId, userEmail);
      toast.success('Book issued successfully!');
      loadBooks(); // Refresh after issue
    } catch (err) {
      toast.error('Failed to issue book');
    }
  };

  // Filtered list based on searchTerm
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Available Books</h2>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div className="d-flex gap-2 flex-wrap">
          <Button variant="secondary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button variant="info" onClick={() => navigate('/user/issued-books')}>
            View Issued Books
          </Button>
        </div>

        <Form.Control
          type="text"
          placeholder="Search by title or author"
          style={{ maxWidth: '300px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center">No books found.</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <Badge bg={book.available ? 'success' : 'danger'}>
                    {book.available ? 'Available' : 'Issued'}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleIssue(book.id)}
                    disabled={!book.available}
                  >
                    Issue
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserDashboard;
