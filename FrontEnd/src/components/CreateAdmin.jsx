import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { RegisterAdmin } from '../services/AdminService';
import './CreateAdmin.css';

const CreateAdmin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Regex patterns
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const mobileRegex = /^[6-9]\d{9}$/;
  const addressRegex = /^.{10,100}$/;

  // ✅ Validation schema with mobile and address
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(nameRegex, 'Name must be 2-50 characters long and contain only letters and spaces')
      .required('Name is required'),
    email: Yup.string()
      .matches(emailRegex, 'Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .matches(passwordRegex, 'Password must be at least 8 characters, contain a letter, number, and special character')
      .required('Password is required'),
    mobile: Yup.string()
      .matches(mobileRegex, 'Mobile number must be a valid 10-digit Indian number')
      .required('Mobile number is required'),
    address: Yup.string()
      .matches(addressRegex, 'Address must be at least 10 characters long')
      .required('Address is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = {
        ...values,
        role: 'ROLE_ADMIN'
      };

      const response = await RegisterAdmin(formData);

      if (response.data) {
        toast.success('Admin account created successfully!');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to create admin. Please try again.';
      setError(errMsg);
      toast.error('Admin registration failed!');
      console.error('Admin creation error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="createadmin-page">
      <img src="/images/Library.avif" alt="Library Background" className="createadmin-bg" />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="signup-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="text-center">Create Admin</h2>
                  <Button variant="secondary" onClick={() => navigate('/admin/dashboard')}>
                    Back
                  </Button>
                </div>

                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    mobile: '',
                    address: ''
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
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* ✅ Mobile Field */}
                      <Form.Group className="mb-3">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="mobile"
                          value={values.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.mobile && errors.mobile}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mobile}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* ✅ Address Field */}
                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.address && errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="primary"
                        className="w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Creating Admin...' : 'Create Admin'}
                      </Button>

                      {error && (
                        <Alert variant="danger" className="mt-3 text-center">
                          {error}
                        </Alert>
                      )}
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateAdmin;
