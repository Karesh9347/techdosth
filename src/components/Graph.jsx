import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Graph.css'; // Import the CSS file if you have custom styles

const Graph = () => {
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
        // Filter questions with the "graph" hashtag
       
        const graphQuestions = response.data.filter(question =>
          question.hashtags.includes('graph')
        );
        setQuestions(graphQuestions);
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
              <Card.Img src='./graph.webp' alt='Graph Illustration' />
            </div>
            <Card.Title>Introduction to Graphs</Card.Title>
            <Card.Text>
              Graphs are data structures that consist of a set of nodes (vertices) and a set of edges that connect pairs of nodes. They are used to represent relationships and connections between objects, making them essential in various fields such as computer networks, social networks, and geographical mapping.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Types of Graphs</Card.Title>
        <Row>
          <Col md={6}>
            <Card.Text>
              <strong>Directed Graph (Digraph)</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A graph where the edges have a direction, indicating a one-way relationship from one vertex to another.
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> A website's hyperlink structure, where links point from one page to another.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Directed graphs are used in scenarios such as representing processes or workflows, where the direction of flow matters.
            </Card.Text>
          </Col>

          <Col md={6}>
            <Card.Text>
              <strong>Undirected Graph</strong>
            </Card.Text>
            <Card.Text>
              <strong>Definition:</strong> A graph where edges have no direction, representing a two-way relationship between nodes.
            </Card.Text>
            <Card.Text>
              <strong>Example:</strong> A social network where friendships are mutual, and both users can interact with each other.
            </Card.Text>
            <Card.Text>
              <strong>Use Cases:</strong> Undirected graphs are suitable for modeling situations like social networks, where connections are bidirectional.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Questions Related to Graphs</Card.Title>
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

export default Graph;
