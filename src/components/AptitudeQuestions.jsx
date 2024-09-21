import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import "../css/apQuestions.css";
import axios from "axios";
import { QuestionSquareFill } from "react-bootstrap-icons";

const AptitudeQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch aptitude questions from the backend
    axios
      .get("http://localhost:5000/get-aptitude")
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
      <h2>Aptitude Questions</h2>
      {error && <p>{error}</p>}
      <ol>
        {questions.map((question) => (
          <li key={question._id || question.id}> {/* Use a unique identifier for key */}
            <div>
              <strong>{question.questionName}</strong> {/* Access question name from fetched data */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Difficulty: <span style={{ color: getColor(question.difficultyLevel) }}>{question.difficultyLevel}</span></p>
                <Button>Solution</Button>
              </div>
              <hr /> {/* Add a horizontal line below each question */}
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
};

export default AptitudeQuestions;