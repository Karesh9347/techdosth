import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/hero.css';
import QuestionsList from './QuestionsList';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navb from './Navb';
import axios from 'axios';

const questions = [
  { id: 1, title: 'Top 100 Interview Questions', image: '/top100.jpeg', description: 'Comprehensive list of the top 100 interview questions across various topics.', url: '/top100' },
  { id: 2, title: 'Arrays', image: '/array.webp', description: 'Key algorithms essential for technical interviews and coding assessments.', url: '/arrays' },
  { id: 3, title: 'Searching Algorithms', image: '/search.png', description: 'Common searching algorithms and their use cases.', url: '/searching' },
  { id: 4, title: 'Sorting Algorithms', image: '/sorting.webp', description: 'Different sorting algorithms and their applications.', url: '/sorting' },
  { id: 5, title: 'Greedy Algorithms', image: '/greedy.png', description: 'Dynamic programming problems and solutions for coding interviews.', url: '/greedy' },
  { id: 6, title: 'Hashmap and Hashset', image: '/hashing.webp', description: 'Graph-related questions and problems for technical interviews.', url: '/hashing' },
  { id: 7, title: 'Two Pointer Algorithms', image: '/twopointer.jpeg', description: 'Dynamic programming problems and solutions for coding interviews.', url: '/two-pointer' },
  { id: 8, title: 'Sliding Window Algorithms', image: '/sliding.webp', description: 'Graph-related questions and problems for technical interviews.', url: '/sliding-window' },
  { id: 9, title: 'Linked List', image: '/linked-list.webp', description: 'System design interview questions and concepts.', url: '/linked-list' },
  { id: 10, title: 'Stack and Queue', image: '/stack.png', description: 'Questions related to database management and SQL.', url: '/stack-and-queues' },
  { id: 11, title: 'Tree Algos and Problems', image: '/trees.webp', description: 'Concurrency issues and solutions in programming.', url: '/trees' },
  { id: 12, title: 'Dynamic Programming', image: '/dp.webp', description: 'Dynamic programming problems and solutions for coding interviews.', url: '/dp' },
  { id: 13, title: 'Graph Theory and Algo', image: '/graph.webp', description: 'Graph-related questions and problems for technical interviews.', url: '/graph' },
  { id: 14, title: 'Recursion Theory and Algo', image: '/recursion.png', description: 'Recursion-related questions and problems for technical interviews.', url: '/recursion' },
];

const Hero = () => {
  const [queryOfTheDay, setQueryOfTheDay] = useState(null);
  const problemOfTheDay = {
    title: "Roof Top",
    askedIn: "amazon, google",
    difficulty: "Easy",
  };

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('https://techdosth-backend.onrender.com/get-all-queries');
        if (response.data.length > 0) {
          const latestQuery = response.data[response.data.length - 1];
          setQueryOfTheDay(latestQuery);
          localStorage.setItem("query", JSON.stringify(latestQuery));
        }
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchQueries();
  }, []);

  return (
    <div>
      <Navb />
      <Container fluid className="px-3" id='img-div1' >
       
        <div className="horizontal-scroll">
          <Row className="gx-4">
            {questions.map((question) => (
              <Col xs={2} sm={6} md={4} lg={2} key={question.id} className="mb-4">
                <Link to={question.url} style={{ textDecoration: 'none' }}>
                  <Card>
                    <Card.Body style={{ backgroundColor: "#E6E6FA" }}>
                      <Card.Img variant="top" src={question.image} className="mb-4" />
                      <Card.Title>{question.title}</Card.Title>
                      <Card.Text style={{ textDecoration: "none", color: "inherit" }}>
                        {question.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
       </div>
      </Container>
      <QuestionsList searchItems="none" />
      <Footer />
    </div>
  );
};

export default Hero;
