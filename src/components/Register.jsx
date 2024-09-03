import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap'; // Importing required components from react-bootstrap
import '../css/register.css'; // Importing custom CSS for register page
import axios from 'axios'; // Importing axios for making HTTP requests
import Navb from './Navb';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "" // State to handle confirm password
    });
    const [message, setMessage] = useState(''); // State to handle success or error messages
    const [error, setError] = useState(false); // State to determine if it's an error

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value // Update form state based on input name and value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission behavior

        // Validate form inputs
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match");
            setError(true);
            return;
        }

        try {
            const res = await axios.post('https://techdosth-backend-1.onrender.com/register', { // Corrected API URL for registration
                username: formData.username,
                password: formData.password
            });
            if (res.status === 201) {
                setMessage("Registration successful! Please log in.");
                setError(false); // No error occurred
                setFormData({
                    username: "",
                    password: "",
                    confirmPassword: ""
                });
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setMessage("Username already taken");
                setError(true);
            } else {
                setMessage("Error in registration: " + err.message);
                setError(true); // Error occurred
            }
            console.error("Error:", err.message);
        }
    };

    return (
        <div>
            <Navb/>
            <Container className="register-container">
                <Form onSubmit={handleSubmit}>
                    {message && <Alert variant={error ? 'danger' : 'success'}>{message}</Alert>}
                    <center>
                        <h2 className='text-primary'>Register</h2>
                    </center>
                    <Form.Group controlId="formUsername">
                        <Form.Label className="form-label">Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange} // Corrected event handler for input changes
                            className="form-control"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password" // Correct name attribute
                            value={formData.password}
                            onChange={handleInputChange} // Corrected event handler for input changes
                            className="form-control"
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label className="form-label">Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword" // Correct name attribute
                            value={formData.confirmPassword}
                            onChange={handleInputChange} // Corrected event handler for input changes
                            className="form-control"
                        />
                    </Form.Group>
                    <Button type="submit" className="register-button">Register</Button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </Form>
            </Container>
            <Footer/>
        </div>
    );
};

export default Register;
