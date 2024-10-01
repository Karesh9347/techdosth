import React, { useEffect, useState } from 'react';
import Navb from './Navb';
import Footer from './Footer';
import { Container, Button, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Arrow90degLeft } from 'react-bootstrap-icons';

const Atopics = () => {
  const { topic } = useParams();
  const [question, setQuestions] = useState([]);
  const arr=JSON.parse(localStorage.getItem("question"))
  console.log(arr)
  const aptitudeTopics = {
    "percentages": ["percentage", "PR", "pr", "Percentage", "Percentages", "percentages"],
    "ratios-proportions": ["RP", "ratios"],
    "averages": ["AVG", "averages"],
    "time-Work": ["time", "work"],
    "speed-distance": ["speed", "distance"]
  };

  useEffect(() => {
    axios
      .get("https://techdosth-backend-1.onrender.com/get-aptitude")
      .then((response) => {
        const data = response.data;
        const arr = [];
        data.forEach(element => {
          const hashtags = element.hashtags;
          for (let i = 0; i < hashtags.length; i++) {
            if (aptitudeTopics[topic]?.includes(hashtags[i])) {
              arr.push(element);
              break;
            }
          }
        });
        setQuestions(arr);
      })
      .catch((err) => {
        console.log(err ? err.message : "An error occurred" + err);
      });
  }, [topic]);

  const getColor = (level) => {
    if (level === "Easy") return "green";
    else if (level === "Medium") return "orange";
    else return "red";
  }

  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <div>
      <Navb />
      {question.length ? (
        <Container>
          <h2>{topic} Questions</h2>
          <ol>
            {question.map((question) => (
              <li key={question._id || question.id}>
                <div>
                  <strong>{question.questionName}</strong>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Difficulty: <span style={{ color: getColor(question.difficultyLevel) }}>{question.difficultyLevel}</span></p>
                    <Link to={`/aquestions/${question._id}`}>
                      <Button>Solution</Button>
                    </Link>
                  </div>
                  <hr />
                </div>
              </li>
            ))}
          </ol>
        </Container>
      ) : (
        <div style={spinnerStyle}>
          <Spinner style={{ width: '100px', height: '100px',size:'40px' }} animation="border" variant="primary" >
          <Spinner style={{ width: '90px', height: '90px',size:'40px' }} animation="border" variant="success" ></Spinner>
          </Spinner>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Atopics;
