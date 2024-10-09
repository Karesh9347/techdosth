import React, { useState, useEffect } from "react";
import Navb from "./Navb";
import Footer from "./Footer";
import "../css/couses.css";
import { Container } from "react-bootstrap";
import axios from "axios";

const Courses = () => {
  const [question, setQuestion] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [arr, setArr] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("java"); // Track the selected subject

  const loadQuestions = (title) => {
    const subjectQuestions = question.filter((element) => element.subject === title);
    setFilteredQuestions(subjectQuestions);
    setSelectedSubject(title); // Set the selected subject when clicked
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://techdosth-backend.onrender.com/get-interview");
        setQuestion(response.data);
        const subjectQuestions = response.data.filter((element) => element.subject === "java");
        setFilteredQuestions(subjectQuestions);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const sarr = new Set();
    question.forEach((element) => {
      sarr.add(element.subject);
    });
    setArr([...sarr]);
  }, [question]);

  return (
    <div>
      <Navb />
      <Container className="courses-container" >
        <aside className="sidebar" >
          {arr.length > 0 ? (
            arr.map((item, index) => (
              <h6
                key={index}
                onClick={() => loadQuestions(item)}
                className={selectedSubject === item ? "active-subject" : ""}
              >
                {item}
              </h6>
            ))
          ) : (
            <h2>Loading subjects...</h2>
          )}
        </aside>
        <main className="questions-content">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, index) => (
              <div key={index} id="question-container">
                <details>
                  <summary>
                    <h5>{item.question}</h5>
                  </summary>
                  <h6>{item.answer}</h6>
                  <hr></hr>
                  <span>know more:</span>
                  <a href={item.resource} style={{ marginBottom: "5px" }}>
                    {item.resource.slice(0, 20) + "....."}
                  </a>
                </details>
              </div>
            ))
          ) : (
            <p>No questions found</p>
          )}
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default Courses;
