import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Window = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
        const windowQuestions = response.data.filter(question =>
          question.hashtags.includes('window')
        );
        setQuestions(windowQuestions);
      } catch (err) {
        setError('Error fetching questions: ' + err.message);
        console.error("Error:", err.message);
      }
    };

    fetchQuestions();
  }, []);

  const handleBack = () => {
    navigate(-1);
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
            <Card.Img src='./sliding.webp' alt='Sliding Window Algorithms' />
            <Card.Title>Introduction to Sliding Window Algorithms</Card.Title>
            <Card.Text>
              Sliding Window Algorithms involve maintaining a window that satisfies certain properties while moving it across the data structure.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Applications of Sliding Window</Card.Title>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Application</th>
              <th>Example</th>
              <th>Use Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Finding Maximum Sum Subarray</td>
              <td>Finding the subarray of a fixed length with the maximum sum.</td>
              <td>Used in problems where the size of the sliding window is fixed.</td>
            </tr>
            <tr>
              <td>Longest Substring Without Repeating Characters</td>
              <td>Finding the longest substring in a given string without repeating characters.</td>
              <td>Useful in problems involving strings and substrings.</td>
            </tr>
          </tbody>
        </Table>
        <Card.Title>Questions Related to Sliding Window Algorithms</Card.Title>
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

export default Window;
