import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Trees = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://techdosth-backend-1.onrender.com/questions');
        const treeQuestions = response.data.filter(question =>
          question.hashtags.includes('tree')
        );
        setQuestions(treeQuestions);
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
            <Card.Img src='./trees.webp' alt='Trees' />
            <Card.Title>Introduction to Trees</Card.Title>
            <Card.Text>
              Trees are hierarchical data structures consisting of nodes, with a root node at the top and zero or more child nodes.
            </Card.Text>
          </Col>
        </Row>
        <Card.Title>Types of Trees</Card.Title>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Type</th>
              <th>Definition</th>
              <th>Use Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Binary Tree</td>
              <td>A tree where each node has at most two children.</td>
              <td>Used in binary search trees, expression trees.</td>
            </tr>
            <tr>
              <td>Binary Search Tree (BST)</td>
              <td>A binary tree where each node’s left subtree contains only nodes with values less than the node’s value.</td>
              <td>Efficiently supports dynamic set operations such as search, insertion, and deletion.</td>
            </tr>
          </tbody>
        </Table>
        <Card.Title>Questions Related to Trees</Card.Title>
        {error && <div className="alert alert-danger">{error}</div>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Problem Link</th>
              <th>Video</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question._id}>
                <td>{question.id}</td>
                <td>{question.title}</td>
                <td>
                  <a href={question.link} target="_blank" rel="noopener noreferrer">
                    View Problem
                  </a>
                </td>
                <td>
                  <a href={question.video} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
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

export default Trees;
