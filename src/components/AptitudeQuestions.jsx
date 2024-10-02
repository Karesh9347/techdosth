import React, { useEffect, useState } from "react";
import { Table, Button, Container,Spinner } from "react-bootstrap";
import "../css/apQuestions.css";
import axios from "axios";
import {Link} from 'react-router-dom'

const AptitudeQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  useEffect(() => {
    // Fetch aptitude questions from the backend
    axios
      .get("https://techdosth-backend.onrender.com/get-aptitude")
      .then((response) => {
        setQuestions(response.data); // Store the fetched questions
      })
      .catch((err) => {
        setError("Error fetching aptitude questions: " + err.message);
      });
  }, []); // Empty dependency array to ensure it runs only once after the component mounts

  const getColor = (level) => {
    if (level === "Easy") {
      return "green";
    } else if (level === "Medium") {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <Container>
      <h2 className="heading1">Aptitude Questions</h2>
      {error && <p>{error}</p>}
      {questions?
      <ol>
        {questions.map((question) => (
          <li key={question._id || question.id}> 
            <div>
              <strong>{question.questionName}</strong> 
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Difficulty: <span style={{ color: getColor(question.difficultyLevel) }}>{question.difficultyLevel}</span></p>
               <Link to={`/aquestions/${question._id}`}> <Button>Solution</Button></Link>
              </div>
              <hr /> 
            </div>
          </li>
        ))}
      </ol>: <div style={spinnerStyle}>
          <Spinner style={{ width: '100px', height: '100px',size:'40px' }} animation="border" variant="primary" >
          <Spinner style={{ width: '90px', height: '90px',size:'40px' }} animation="border" variant="success" ></Spinner>
          </Spinner>
        </div>}
    </Container>
  );
};

export default AptitudeQuestions;
