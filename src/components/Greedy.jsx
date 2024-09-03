import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Greedy.css'; // Import the CSS file if you have custom styles

const Greedy = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate back
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
        // Filter questions with the "greedy" hashtag
        const greedyQuestions = response.data.filter(question =>
          question.hashtags.includes('greedy')
        );
        setQuestions(greedyQuestions);
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
              <Card.Img src='./greedy.png' alt='Greedy Algorithm Illustration' />
            </div>
            <Card.Title>Introduction to Greedy Algorithms</Card.Title>
            <Card.Text>
              Greedy algorithms make a series of choices by selecting the locally optimal solution at each step with the hope of finding the global optimum. They are used in optimization problems where finding an immediate best choice leads to a globally optimal solution.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Applications of Greedy Algorithms</Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Activity Selection Problem</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> Given a set of activities each with a start and end time, select the maximum number of activities that don't overlap.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Scheduling tasks, events, or meetings in a way that maximizes resource utilization.
            </Card.Text>
          </Col>

          <Col md={6}>
            <Card.Text>
              <strong>Huffman Coding</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A greedy algorithm used for lossless data compression. It assigns variable-length codes to input characters, with shorter codes assigned to more frequent characters.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Data compression techniques in various file formats like ZIP, JPEG, and MP3.
            </Card.Text>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Minimum Spanning Tree (MST) - Kruskal's Algorithm</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A greedy algorithm used to find the minimum spanning tree for a connected, weighted graph. It adds the shortest edge to the tree that doesn't form a cycle.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Network design, such as designing the layout of electrical grids, water supply networks, and computer networks.
            </Card.Text>
          </Col>

          <Col md={6}>
            <Card.Text>
              <strong>Fractional Knapsack Problem</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A variant of the knapsack problem where items can be broken into smaller pieces. The goal is to maximize the total value of items put into the knapsack.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Resource allocation problems where items can be divided and the objective is to maximize the profit.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Questions Related to Greedy Algorithms</Card.Title>
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

export default Greedy;
