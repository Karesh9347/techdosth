import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card ,Row,Col} from 'react-bootstrap';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Arrays.css'; // Import the CSS file if you have custom styles

const Arrays = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
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
  const navigate = useNavigate(); // Hook to navigate back
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
        // Filter questions with the "array" hashtag
        
        const arrayQuestions = response.data.filter(question =>
          question.hashtags.includes('array')
        );
        setQuestions(arrayQuestions);
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
          style={{ position: 'absolute', top: '70px', left: '10px' }}
        >
          Back
        </Button>
        <Row>
          <Col>
            <Card.Img src='./array.webp' alt='Array Illustration' />
            <Card.Title>Introduction to Arrays</Card.Title>
            <Card.Text>
              Arrays are fundamental data structures that store elements in a fixed-size sequential collection. They are used to store data of the same type in contiguous memory locations, allowing easy access and modification of elements via indices.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Operations on Arrays</Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Insertion</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> Adding an element to an array at a specific index, which may require shifting other elements to accommodate the new entry.
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> Adding an element to the end of an array is a common operation, often referred to as "appending."
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Insertion is essential in scenarios like maintaining lists of items where the order of elements matters.
            </Card.Text>
          </Col>

          <Col md={6}>
            <Card.Text>
              <strong>Deletion</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> Removing an element from an array involves shifting the elements to fill the gap created by the removed element.
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> Removing the first element from an array and shifting all other elements to the left.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Deletion is crucial in managing dynamic lists of items, such as removing a product from a shopping cart.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Questions Related to Arrays</Card.Title>
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

export default Arrays;
