import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


const Top100 = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
       
        const top100Questions = response.data; // Assuming all questions are needed for the top 100
        setQuestions(top100Questions);
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
            <Card.Title>Top 100 Interview Questions</Card.Title>
            <Card.Text>
              Here are some of the top 100 commonly asked interview questions in data structures and algorithms.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Categories of Questions</Card.Title>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Category</th>
              <th>Example Questions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Arrays and Strings</td>
              <td>Rotate an array, find duplicates.</td>
            </tr>
            <tr>
              <td>Dynamic Programming</td>
              <td>Knapsack problem, longest common subsequence.</td>
            </tr>
            <tr>
              <td>Trees and Graphs</td>
              <td>Binary tree traversal, shortest path in a graph.</td>
            </tr>
            <tr>
              <td>Sorting and Searching</td>
              <td>Implement sorting algorithms, binary search.</td>
            </tr>
          </tbody>
        </Table>
        <Card.Title>Questions Related to Top 100</Card.Title>
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
                <td>{id+1}</td>
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

export default Top100;
