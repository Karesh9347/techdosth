import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Twitter, Linkedin, Github } from 'react-bootstrap-icons';
import '../css/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>TechDost</h5>
                        <p>Bringing the latest tech trends and insights to you. Stay updated with our latest posts and resources.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <div style={{display:'flex'}}>
                            <div className="quick-link-group">
                                <Link to="/">Home</Link>
                                <Link to="/about">About Us</Link>
                            </div>
                            <div className="quick-link-group">
                                <Link to="/courses">Courses</Link>
                                <Link to="/contact">Contact</Link>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>Email:techdost@gmail.com</p>
                        <p>Phone: 9848240441</p>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Facebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <Twitter size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={24} />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github size={24} />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} TechDost. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
