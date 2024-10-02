import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Linkedlist.css'; // Import the CSS file if you have custom styles

const Linkedlist = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate back
  function getColorByDifficulty(difficulty) {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'orange';
      case 'hard':
        return 'red';
      default:
        return 'black'; // default color if difficulty is undefined
    }
  }
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend.onrender.com/questions');
        
        // Filter questions with the "linkedlist" hashtag
        const linkedListQuestions = response.data.filter(question =>
          question.hashtags.includes('linked list')
        );
        setQuestions(linkedListQuestions);
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
              <Card.Img src='./linked-list.webp' alt='Linked List Illustration' />
            </div>
            <Card.Title>Introduction to Linked Lists</Card.Title>
            <Card.Text>
              Linked Lists are linear data structures where elements are stored as nodes, with each node containing data and a reference (or link) to the next node in the sequence. They are used for dynamic memory allocation and efficient insertion and deletion.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Types of Linked Lists</Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Singly Linked List</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A linked list where each node points only to the next node, and the last node points to null, indicating the end of the list.
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> A simple list where you traverse from the head node to the end node using next pointers.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Singly linked lists are used in scenarios where memory efficiency is crucial, such as implementing stacks and queues.
            </Card.Text>
          </Col>

          <Col md={6}>
            <Card.Text>
              <strong>Doubly Linked List</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A linked list where each node contains a reference to both the next and the previous node, allowing traversal in both directions.
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> A list used for navigation systems where you can move forward and backward.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Doubly linked lists are ideal for applications requiring bidirectional traversal, such as browser history.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Questions Related to Linked Lists</Card.Title>
        {error && <div className="alert alert-danger">{error}</div>}
        <Table striped bordered hover responsive>
        <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Problem Link</th>
              <th>solution</th>
              <th>difficulty</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question,id) => (
              <tr key={question._id}>
                <td>{id}</td>
                <td>{question.QuestionName}</td>
                <td>
                  <a href={question.problemlink} target="_blank" rel="noopener noreferrer">
                    View Problem
                  </a>
                </td>
                <td>
                <Link to={`/questions/${question._id}`}>solution</Link>
                </td>
                <td style={{color:getColorByDifficulty(question.difficulty)}}>
                  {question.difficulty }
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

export default Linkedlist;
