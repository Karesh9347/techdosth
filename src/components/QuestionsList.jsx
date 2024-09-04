import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Row, Col, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  }, []); // Fetch data on component mount
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
    <Container style={{ marginTop: "20px" }}>
      <Row className="mb-3">
        <Col>
          <center>
          <h4 className="heading" style={{color:"green"}}>Data Structures and Algorithms Questions with Solutions and Explanations</h4>
          </center></Col>
        
      </Row>
      
      {error && <Alert variant="danger">{error}</Alert>}
     
        <Row>
          <Col>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead className="bg-warning custom-head-color">
                  <tr >
                    <th>ID</th>
                    <th>Question</th>
                    <th>Problem Link</th>
                    <th>solution</th>
                    <th>difficulty</th>
                  </tr>
                </thead>
                {!loading?<tbody>
                  {questions.map((question, index) => (
                    <tr key={question._id}>
                      <td>{index + 1}</td>
                      <td>{question.QuestionName}</td>
                      <td>
                        <a href={question.problemlink} target="_blank" rel="noopener noreferrer">
                          View Problem
                        </a>
                      </td>
                      <td>
                        <Link to={`/questions/${question._id}`}>solution</Link>
                      </td>
                      <td style={{ color: getColorByDifficulty(question.difficulty) }}>
  {question.difficulty}
</td>

                    </tr>
                  ))}
                </tbody>:<Container>
                  <Spinner size={200}/>
                </Container>}
              </Table>
            </div>
          </Col>
        </Row>
     
    </Container>
  );
};

export default QuestionsList;
