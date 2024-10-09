import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import Footer from './Footer';
import Navb from './Navb';
import StudentReviews from './Review';

const Main = () => {
  return (
    <div>
      <Navb />
      <Container className="home-page-container mt-5">
        <h1 className="home-title text-center">Welcome to TechDosth</h1>
        <p className="welcome-message text-center">
          We inspire students to solve problems, build skills, and achieve excellence. 
          Dedication and consistency are the key to becoming a better programmer.
        </p>
        <button className="login-btn" to="/login">Login</button>

        <Row className="mt-4">
          <Col md={6} className="left-half mb-4">
            {/* Problem of the Day */}
            <Card className="home-card">
              <Card.Body>
                <Card.Title>Problem of the Day</Card.Title>
                <Card.Text>Practice Makes Perfect! Solve one problem a day to enhance your coding skills.</Card.Text>
                <Button variant="primary">Solve Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="right-half mb-4">
            
            <Card className="home-card">
              <Card.Body>
                <Card.Title>Query of the Day</Card.Title>
                <Card.Text>Test your SQL skills with this challenge: SELECT * FROM Students WHERE Score greaterthan 90.</Card.Text>
                <Button variant="primary">Test Your SQL</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="left-half mb-4">
            {/* Concept of the Day */}
            <Card className="home-card">
              <Card.Body>
                <Card.Title>Concept of the Day</Card.Title>
                <Card.Text>Learn about recursion and its applications in coding.</Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="right-half mb-4">
            {/* Aptitude Contest of the Day */}
            <Card className="home-card">
              <Card.Body>
                <Card.Title>Aptitude Contest of the Day</Card.Title>
                <Card.Text>Participate and sharpen your logical skills. Every Saturday 10 AM.</Card.Text>
                <Button variant="primary">Join Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <StudentReviews />
      </Container>
      <Footer />
    </div>
  );
};

export default Main;
