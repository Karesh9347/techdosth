import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Recursion = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
       
        // Filter questions with the "recursion" hashtag
        const recursionQuestions = response.data.filter(question =>
          question.hashtags.includes('recursion')
        );
        setQuestions(recursionQuestions);
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
              <Card.Img src='./recursion.png' alt='Recursion Algorithms' />
            </div>
            <Card.Title>Introduction to Recursion Algorithms</Card.Title>
            <Card.Text>
              Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. It is a powerful tool for solving problems that can be broken down into smaller, similar subproblems.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Applications of Recursion Algorithms</Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Factorial Calculation</strong>
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> Calculating the factorial of a number by calling the function recursively with a decremented value.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Used in problems where the solution involves breaking the problem into smaller, similar subproblems.
            </Card.Text>
          </Col>
          <Col md={6}>
            <Card.Text>
              <strong>Fibonacci Series</strong>
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> Calculating the nth Fibonacci number by summing the two preceding numbers in the sequence.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Commonly used in problems that require calculating values based on previous values in a sequence.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Questions Related to Recursion Algorithms</Card.Title>
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

export default Recursion;
