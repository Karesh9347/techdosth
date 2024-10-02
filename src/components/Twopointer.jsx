import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Twopointer = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
       
        // Filter questions with the "two-pointer" hashtag
        const twoPointerQuestions = response.data.filter(question =>
          question.hashtags.includes('two-pointer')
        );
        setQuestions(twoPointerQuestions);
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
            <div>
              <Card.Img src='./twopointer.jpeg' alt='Two Pointer Algorithms' />
            </div>
            <Card.Title>Introduction to Two Pointer Algorithms</Card.Title>
            <Card.Text>
              Two Pointer Algorithms are techniques used to solve problems involving arrays or lists by using two pointers to iterate through the data structure. This method is efficient for problems that require finding pairs or subarrays that meet certain conditions.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Applications of Two Pointer Algorithms</Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Finding Pair with Specific Sum</strong>
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> Given a sorted array, find two numbers that add up to a specific target.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> This technique is used in problems related to finding pairs or combinations in arrays.
            </Card.Text>
          </Col>
          <Col md={6}>
            <Card.Text>
              <strong>Removing Duplicates</strong>
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> Removing duplicates from a sorted array in-place using two pointers to traverse and modify the array.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Commonly used in problems requiring in-place modifications of arrays.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Questions Related to Two Pointer Algorithms</Card.Title>
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

export default Twopointer;
