import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/aptitude.css';
import Footer from './Footer';
import Navb from './Navb';
import AptitudeQuestions from './AptitudeQuestions';

const Aptitude = () => {
  const questions = [
    { id: 1, title: 'Percentages', url: '/percentages', image: '/percentages.jpeg', description: 'Understand how to calculate percentages effectively.' },
    { id: 2, title: 'Ratios and Proportions', url: '/ratios-proportions', image: '/ratios.jpeg', description: 'Master the concept of ratios and proportions.' },
    { id: 3, title: 'Averages', url: '/averages', image: '/avg.png', description: 'Learn how to calculate averages in various scenarios.' },
    { id: 4, title: 'Time and Work', url: '/time-work', image: '/time.jpeg', description: 'Solve problems related to time and work.' },
    { id: 5, title: 'Speed and Distance', url: '/speed-distance', image: '/speed.png', description: 'Calculate speed, distance, and time effectively.' }
  ];

  return (
    <div>
      <Navb />

      <Container fluid className="px-3 questions-section">
        <center>
          <h3 className="hero-title">Aptitude Questions</h3>
          <p className="hero-description">Sharpen your skills with these essential aptitude questions.</p>
        </center>
        
        <div className="horizontal-scroll">
          <Row className="gx-4">
            {questions.map((question) => (
              <Col xs={5} sm={3} md={4} lg={3} key={question.id} className="mb-4">
                <Link to={question.url} style={{ textDecoration: 'none' }}>
                  <Card className="h-100">
                    <Card.Body style={{ backgroundColor: "#E6E6FA" }}>
                      <Card.Img variant="top" src={question.image} className="img" />
                      <Card.Title>{question.title}</Card.Title>
                      <Card.Text style={{ color: "inherit" }}>
                        {question.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <div className="scroll-indicator">
            &rarr; {/* Arrow symbol for scroll indication */}
          </div>
        </div>
      </Container>
      <AptitudeQuestions/>
      <Footer />
    </div>
  );
};

export default Aptitude;
