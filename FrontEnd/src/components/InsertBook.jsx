import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addBooks } from '../services/BooksService';
import './InsertBook.css';
import { toast } from 'react-toastify';

const InsertBook = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string() 
      .required('Title is required')
      .min(2, 'Title must be at least 2 characters'),
    author: Yup.string()
      .required('Author is required')
      .min(2, 'Author must be at least 2 characters'),
    available: Yup.boolean(),
    dueDate: Yup.number()
      .required('Due date is required')
      .min(1, 'Due date must be at least 1 day')
      .max(30, 'Due date cannot exceed 30 days')
  });

  const handleSubmit = async (values, { setSubmitting, setError }) => {
    try {
      const response = await addBooks(values);
      if (response.data) {
        
        toast.success("Book added successfully!");
        navigate('/admin/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add book. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="insertbook-page">
      <img src="/images/Library.avif" alt="Library Background" className="insertbook-bg" />
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Add New Book</h2>
          <Button variant="secondary" onClick={() => navigate('/admin/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        <Card className="book-form-card">
          <Card.Body>
            <Formik
              initialValues={{
                title: '',
                author: '',
                available: true,
                dueDate: '14'
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.title && errors.title}
                      placeholder="Enter book title"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={values.author}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.author && errors.author}
                      placeholder="Enter author name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.author}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Availability</Form.Label>
                    <Form.Check
                      type="switch"
                      id="available"
                      name="available"
                      checked={values.available}
                      onChange={handleChange}
                      label={values.available ? "Available" : "Not Available"}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Due Date (days)</Form.Label>
                    <Form.Control
                      type="number"
                      name="dueDate"
                      value={values.dueDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.dueDate && errors.dueDate}
                      min="1"
                      max="30"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dueDate}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Number of days the book can be borrowed (1-30 days)
                    </Form.Text>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Adding Book...' : 'Add Book'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default InsertBook; 