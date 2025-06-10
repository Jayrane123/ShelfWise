import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/bs';

const IssueBook = () => {
  const [formData, setFormData] = useState({
    bookId: '',
    userId: '',
    issueDate: '',
    returnDate: ''
  });

  const BackIcon = Icons.BsArrowLeft;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      bookId: '',
      userId: '',
      issueDate: '',
      returnDate: ''
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-4">
        <Link to="/admin/dashboard" className="btn btn-link text-decoration-none">
          <BackIcon size={16} className="me-2" />
          Back
        </Link>
        <h2 className="mb-0 ms-3">Issue Book</h2>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Book ID:</Form.Label>
          <Form.Control
            type="text"
            name="bookId"
            value={formData.bookId}
            onChange={handleInputChange}
            placeholder="Enter Book ID"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>User ID:</Form.Label>
          <Form.Control
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            placeholder="Enter User ID"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Issue Date:</Form.Label>
          <Form.Control
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Return Date:</Form.Label>
          <Form.Control
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Issue Book
        </Button>
      </Form>
    </div>
  );
};

IssueBook.propTypes = {
  formData: PropTypes.shape({
    bookId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    issueDate: PropTypes.string.isRequired,
    returnDate: PropTypes.string.isRequired
  })
};

export default IssueBook; 