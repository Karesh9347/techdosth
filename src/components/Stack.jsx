import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Stack = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
        const stackQuestions = response.data.filter(question =>
          question.hashtags.includes('stack')
        );
        setQuestions(stackQuestions);
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
            <Card.Img src='./stackqueue.webp' alt='Stacks and Queues' />
            <Card.Title>Introduction to Stacks and Queues</Card.Title>
            <Card.Text>
              Stacks and Queues are linear data structures used to store and manage elements in a particular order.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Types of Stacks and Queues</Card.Title>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Type</th>
              <th>Definition</th>
              <th>Use Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stack</td>
              <td>A data structure that allows adding and removing elements in a particular order.</td>
              <td>Backtracking, expression evaluation.</td>
            </tr>
            <tr>
              <td>Queue</td>
              <td>A data structure that allows adding elements to the end and removing elements from the front.</td>
              <td>Scheduling algorithms, breadth-first search.</td>
            </tr>
          </tbody>
        </Table>
        <Card.Title>Questions Related to Stacks and Queues</Card.Title>
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

export default Stack;
