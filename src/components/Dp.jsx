import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Dp.css'; // Import the CSS file if you have custom styles

const Dp = () => {
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
       
        const dpQuestions = response.data.filter(question =>
          question.hashtags.includes('dynamic programming')
        );
        setQuestions(dpQuestions);
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
              <Card.Img src='./dp.webp' alt='Dynamic Programming Illustration' />
            </div>
            <Card.Title>Introduction to Dynamic Programming</Card.Title>
            <Card.Text>
              Dynamic Programming (DP) is a powerful method used for solving complex problems by breaking them down into simpler overlapping subproblems. It is particularly effective for optimization problems where the goal is to find the best solution among many possible ones. The main idea behind DP is to store the results of these subproblems so that each one is solved only once, thereby reducing the computational complexity. This approach can significantly improve the efficiency of an algorithm.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Types of Dynamic Programming</Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Memoization (Top-Down Approach)</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> Memoization is a technique where a recursive algorithm is modified to store results of subproblems in a data structure, typically an array or a hash map. When the same subproblem occurs again, the stored result is used instead of recalculating it, thereby saving computation time.
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> Calculating Fibonacci numbers is a classic example of memoization. Instead of recalculating the Fibonacci of a number multiple times, the results are stored and reused.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Memoization is useful when the number of unique subproblems is relatively small compared to the total number of subproblems.
            </Card.Text>
          </Col>

          <Col md={6}>
            <Card.Text>
              <strong>Tabulation (Bottom-Up Approach)</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> Tabulation is a technique where a problem is solved by iteratively filling up a table based on previous results. It starts with solving the simplest subproblems and builds up to the solution of the original problem.
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> Solving the Fibonacci sequence by starting from the base cases and iteratively computing the next Fibonacci numbers using previously computed values.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Tabulation is effective when all subproblems need to be solved at least once to get the final answer. It is often easier to implement than memoization for many DP problems.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Questions Related to Dynamic Programming</Card.Title>
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

export default Dp;
