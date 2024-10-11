import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/hero.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navb from './Navb';
import axios from 'axios';

const Hero = () => {
  const [queryOfTheDay, setQueryOfTheDay] = useState(null);
  const [problemOfTheDay, setProblemOfTheDay] = useState(null);
  const isLogin=JSON.parse(localStorage.getItem("isLogin"))

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

    const fetchProblem = async () => {
      try {
        const response = await axios.get('https://techdosth-backend.onrender.com/get-all-problems');
        if (response.data.length > 0) {
          const latestProblem = response.data[response.data.length - 1];
          setProblemOfTheDay(latestProblem);
          localStorage.setItem("problem", JSON.stringify(latestProblem));
        }
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchQueries();
    fetchProblem();
  }, []);

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  };
  return (
    <div>
      <Navb />
      <div className="px-3" id="img-div">
        <div id="welcome-container">
          <h1>👋 Hello Coders, Welcome to TechDosth! 🚀</h1>
          <p>
            TechDosth empowers aspiring coders with coding challenges, aptitude questions, and weekly contests. Focused on Data Structures and Algorithms (DSA), it equips learners with essential skills for coding interviews. Join us to enhance your coding journey and connect with a supportive community.
          </p>{!isLogin?( <Link to="/login">

<button className="login-button" style={{ width: "250px" ,fontSize:"20px",fontWeight:"600px"}}>Login</button>
</Link>):(
  <Link to="/dsa">

  <button className="login-button" style={{ width: "250px" ,fontSize:"20px",fontWeight:"600px"}}>Explore</button>
  </Link>
)}
         
        </div>
        <Container>
          <Row className='g-3'>
            <Col md={6} lg={6}>
              <div className="problem-card">
                <h3 className="card-title">Problem of the Day</h3>
                {problemOfTheDay ? (
                  <>
                    <div>{problemOfTheDay.QuestionName}</div>
                    <p>{formatDate(problemOfTheDay.createdAt)}</p> {/* Displaying the date */}
                    <Link to="/editor">
                      <button id="button">Solve</button>
                    </Link>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                      <p>Asked in: Amazon, Google</p>
                      <p>Difficulty: {problemOfTheDay.difficulty}</p>
                    </div>
                  </>
                ) : (
                  <strong>Loading...</strong>
                )}
              </div>
            </Col>
            <Col md={6} lg={6}>
              <div className="query-card">
                <h3 className="card-title">Query of the Day</h3>
                {queryOfTheDay ? (
                  <>
                    <div>{queryOfTheDay.shortName}</div>
                    <p>{formatDate(queryOfTheDay.createdAt)}</p> {/* Displaying the date */}
                    <Link to="/sqlEditor">
                      <button id="button">Solve</button>
                    </Link>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                      <p>Asked in: Wipro, TCS</p>
                      <p>Difficulty: Easy</p>
                    </div>
                  </>
                ) : (
                  <strong>Loading...</strong>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Hero;
