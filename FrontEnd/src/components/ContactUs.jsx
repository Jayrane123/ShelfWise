import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GeoAlt, Telephone, Envelope, Clock } from 'react-bootstrap-icons';
import './ContactUs.css';

const ContactUs = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    subject: Yup.string()
      .required('Subject is required')
      .min(5, 'Subject must be at least 5 characters'),
    message: Yup.string()
      .required('Message is required')
      .min(10, 'Message must be at least 10 characters')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Form submitted:', values);
      alert('Thank you for your message! We will get back to you soon.');
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-us-page">
      <div className="contact-us-bg"></div>

      <Container className="py-5">
        <h1 className="text-center mb-4 text-white">Contact Us</h1>
        <p className="text-center text-light mb-5">
          We'd love to hear from you. Please fill out the form and we'll be in touch shortly.
        </p>

        <Row className="g-4">
          {/* Contact Info */}
          <Col md={4}>
            <Card className="contact-info-card h-100 p-3 shadow">
              <Card.Body>
                <h4 className="mb-4 text-primary fw-semibold">Get in Touch</h4>

                <div className="contact-item">
                  <GeoAlt className="contact-icon" />
                  <div>
                    <h6>Address</h6>
                    <p>CDAC Kharghar<br />Mumbai, Maharashtra</p>
                  </div>
                </div>

                <div className="contact-item">
                  <Telephone className="contact-icon" />
                  <div>
                    <h6>Phone</h6>
                    <p>+91 1234567891</p>
                  </div>
                </div>

                <div className="contact-item">
                  <Envelope className="contact-icon" />
                  <div>
                    <h6>Email</h6>
                    <p>info@shelfwise.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <Clock className="contact-icon" />
                  <div>
                    <h6>Working Hours</h6>
                    <p>Mon - Fri: 9AM - 6PM<br />Sat: 10AM - 4PM</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col md={8}>
            <Card className="contact-form-card p-4 shadow">
              <Card.Body>
                <h4 className="mb-4 text-primary fw-semibold">Send us a Message</h4>

                <Formik
                  initialValues={{ name: '', email: '', subject: '', message: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values, errors, touched,
                    handleChange, handleBlur,
                    handleSubmit, isSubmitting
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
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
                        </Col>

                        <Col md={6}>
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
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.subject && errors.subject}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.subject}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.message && errors.message}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="primary"
                        className="w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
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

export default ContactUs;
