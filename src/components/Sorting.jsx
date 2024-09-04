import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Sorting.css'; // Import the CSS file if you have custom styles

const Sorting = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate back
 
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
        
        // Filter questions with the "sorting" hashtag
        const sortingQuestions = response.data.filter(question =>
          question.hashtags.includes('sorting')
        );
        setQuestions(sortingQuestions);
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
              <Card.Img src='./sorting.webp' alt='Sorting Algorithms Illustration' />
            </div>
            <Card.Title>Introduction to Sorting Algorithms</Card.Title>
            <Card.Text>
              Sorting algorithms are used to reorder elements in a list or array according to a particular order, such as ascending or descending. They are fundamental for data processing, enabling faster search, analysis, and visualization.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Common Sorting Algorithms</Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Quick Sort</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A divide-and-conquer algorithm that selects a pivot element and partitions the array around it, recursively sorting the subarrays.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Suitable for large datasets where average performance is more important than worst-case performance.
            </Card.Text>
          </Col>

          <Col md={6}>
            <Card.Text>
              <strong>Merge Sort</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Stable sorting and suitable for linked lists and large datasets where guaranteed performance is required.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Questions Related to Sorting Algorithms</Card.Title>
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

export default Sorting;
