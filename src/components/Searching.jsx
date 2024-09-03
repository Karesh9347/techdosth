import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Searching.css'; // Import the CSS file if you have custom styles

const Searching = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate back

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
        // Filter questions with the "searching" hashtag
        const searchingQuestions = response.data.filter(question =>
          question.hashtags.includes('searching')
        );
        setQuestions(searchingQuestions);
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
              <Card.Img src='./search.png' alt='Searching Algorithms Illustration' />
            </div>
            <Card.Title>Introduction to Searching Algorithms</Card.Title>
            <Card.Text>
              Searching algorithms are designed to retrieve information stored within some data structure, or to find specific elements within it. They are crucial for efficient data retrieval and analysis.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Common Searching Algorithms</Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Binary Search</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Suitable for sorted arrays and when performance is critical.
            </Card.Text>
          </Col>

          <Col md={6}>
            <Card.Text>
              <strong>Linear Search</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A search algorithm that checks each element of a list one by one until the target element is found.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Used for unsorted arrays or lists where other methods cannot be applied.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Questions Related to Searching Algorithms</Card.Title>
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
                <td>
                  {question.difficulty}
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

export default Searching;
