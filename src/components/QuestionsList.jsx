import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Row, Col, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/qlist.css'

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
        setQuestions(response.data);
      } catch (err) {
        setError('Error fetching questions: ' + err.message);
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  function getColorByDifficulty(difficulty) {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'orange';
      case 'hard':
        return 'red';
      default:
        return 'black';
    }
  }

  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px', // Set a specific height for spinner alignment
  };

  return (
    <Container style={{marginTop:"-70px"}}>
      <Row className="mb-3">
        <Col>
          <center>
          <h6 id="heading">DSA Questions & Solutions </h6>
          </center>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row >
        <Col>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="bg-warning custom-head-color">
                <tr>
                  <th>ID</th>
                  <th>Question</th>
                  <th>Problem Link</th>
                  <th>Solution</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5}>
                      <div style={spinnerStyle}>
                        <Spinner style={{ width: '3rem', height: '3rem' }} animation="border" variant="primary" />
                      </div>
                    </td>
                  </tr>
                ) : (
                  questions.map((question, index) => (
                    <tr key={question._id}>
                      <td>{index + 1}</td>
                      <td>{question.QuestionName}</td>
                      <td>
                        <a href={question.problemlink} target="_blank" rel="noopener noreferrer">
                          View Problem
                        </a>
                      </td>
                      <td>
                        <Link to={`/questions/${question._id}`}>Solution</Link>
                      </td>
                      <td style={{ color: getColorByDifficulty(question.difficulty) }}>
                        {question.difficulty}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionsList;
