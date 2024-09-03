import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap'; // Importing required components from react-bootstrap
import '../css/contact.css'; // Importing custom CSS
import Navb from './Navb';
import Footer from './Footer';

const Contact= () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false); // State to handle form submission

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value // Update form data based on input name and value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form default submission behavior
        setSubmitted(true); // Set submitted state to true
        // Reset form data
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div>
            <Navb/>
            <Container className="contact-container">
                <Form onSubmit={handleSubmit}>
                    {submitted && <Alert variant="success">Thank you for your feedback!</Alert>}
                    <center>
                        <h2 className='text-primary'>Contact Us / Feedback</h2>
                    </center>
                    <Form.Group controlId="formName">
                        <Form.Label className="form-label">Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter your name"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formMessage">
                        <Form.Label className="form-label">Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter your message"
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="contact-button">Submit</Button>
                </Form>
            </Container>
            <Footer/>
        </div>
    );
};

export default Contact;
