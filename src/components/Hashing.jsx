import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Hashing.css'; // Import the CSS file if you have custom styles

const Hashing = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate back

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
        // Filter questions with the "hashing" hashtag
        const hashingQuestions = response.data.filter(question =>
          question.hashtags.includes('hashing')
        );
        setQuestions(hashingQuestions);
      } catch (err) {
        setError('Error fetching questions: ' + err.message);
        console.error("Error:", err.message);
      }
    };

    fetchQuestions();
  }, []);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      <Navb />
      
      <Container style={{ marginTop: '20px' }}>
        <Button 
          variant="secondary" 
          onClick={handleBack} 
          style={{ position: 'absolute', top: '70px', left: '10px' }}>
          Back
        </Button>
        <Row>
          <Col>
            <div>
              <Card.Img src='./hashing.webp' alt='Hashing Illustration' />
            </div>
            <Card.Title>Introduction to Hashing</Card.Title>
            <Card.Text>
              Hashing is a technique used to uniquely identify a specific object from a group of similar objects. It involves converting data into a fixed-size numerical value, which acts as an index to the hash table where the data is stored.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Applications of Hashing</Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Hash Map</strong>
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> Using hash maps to count frequencies of elements or to check the presence of a particular element.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Efficient lookups, insertions, and deletions in constant time.
            </Card.Text>
          </Col>

          <Col md={6}>
            <Card.Text>
              <strong>Hash Set</strong>
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> Storing unique elements in a collection and checking for duplicates.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Managing unique values and ensuring no duplicates exist.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Questions Related to Hashing</Card.Title>
        {error && <div className="alert alert-danger">{error}</div>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Problem Link</th>
              <th>Video</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question._id}>
                <td>{question.id}</td>
                <td>{question.title}</td>
                <td>
                  <a href={question.link} target="_blank" rel="noopener noreferrer">
                    View Problem
                  </a>
                </td>
                <td>
                  <a href={question.video} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </div>
  );
};

export default Hashing;
