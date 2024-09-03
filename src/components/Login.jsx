import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap'; // Importing required components from react-bootstrap
import '../css/login.css'; // Importing custom CSS
import axios from 'axios'; // Importing axios for HTTP requests
import Navb from './Navb';
import Footer from './Footer';
import { Link} from 'react-router-dom'; // Importing Link from react-router-dom

const Login = () => {
    
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [type, setType] = useState('password'); // State to control the password input type
    const [message, setMessage] = useState(''); // State to handle success or error messages
    const [error, setError] = useState(false); // State to determine if it's an error
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value // Correct way to update form state based on input name and value
        });
    };

    const handleCheckboxChange = () => {
        setType(type === 'password' ? 'text' : 'password'); // Toggle between password and text type
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission behavior
        
        try {
            const res = await axios.post('https://techdosth-backend-1.onrender.com/login-users', formData); // Assuming this is the login endpoint
            if (res.status === 200) {
                setMessage("User logged in successfully!");
                setError(false); // No error occurred
                setFormData({
                    username: "",
                    password: ""
                });
               
                localStorage.setItem('token', res.data.token);
               
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setMessage("Incorrect username or password");
                setError(true);
            } else if (err.response && err.response.status === 404) {
                setMessage("User not found");
                setError(true);
            } else {
                setMessage("Error: " + err.message);
                setError(true); // Error occurred
            }
            console.error("Error:", err.message);
        }
    };

    return (
        <div>
            <Navb />
            <Container className="login-container">
                <Form onSubmit={handleSubmit}>
                    {message && <Alert variant={error ? 'danger' : 'success'}>{message}</Alert>}
                    <center>
                        <h2 className='text-primary'>Login</h2>
                    </center>
                    <Form.Group controlId="formUsername">
                        <Form.Label className="form-label">Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange} // Corrected event handler for input changes
                            className="form-control"
                            aria-label="Username" // Adding aria-label for accessibility
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control
                            type={type} // Use the type state to control visibility
                            name="password" // Correct name attribute
                            value={formData.password}
                            onChange={handleInputChange} // Corrected event handler for input changes
                            className="form-control"
                            aria-label="Password" // Adding aria-label for accessibility
                        />
                    </Form.Group>
                    <Form.Group controlId="formCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="See password"
                            onChange={handleCheckboxChange} // Toggle password visibility
                        />
                    </Form.Group>
                    <Button type="submit" className="login-button">Login</Button>
                    <br />
                    <br />
                    <center>
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                          </center>
                </Form>
            </Container>
            <Footer />
        </div>
    );
};

export default Login;
