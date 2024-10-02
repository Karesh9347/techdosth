import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Alert, ButtonGroup, Button } from "react-bootstrap";
import '../css/soltions.css';
import Navb from "./Navb";
import Footer from "./Footer";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);
  const [bruteForceImage, setBruteForceImage] = useState(null);
  const [betterImage, setBetterImage] = useState(null);
  const [optimizedImage, setOptimizedImage] = useState(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await axios.get(`https://techdosth-backend.onrender.com/questions/${id}`);
        const data = response.data;
        setQuestion(data);

        if (data.images) {
          setBruteForceImage(`data:image/png;base64,${data.images.pythonBruteForce}`);
          setBetterImage(`data:image/png;base64,${data.images.pythonBetter}`);
          setOptimizedImage(`data:image/png;base64,${data.images.pythonOptimized}`);
        }
      } catch (err) {
        setError("Error fetching question details: " + err.message);
      }
    };

    fetchQuestionDetails();
  }, [id]);

  useEffect(() => {
    if (question) {  // Ensure the question has loaded
        const adContainer = document.getElementById("ad-container");
        if (adContainer) {
            const adScript = document.createElement("script");
            adScript.type = "text/javascript";
            adScript.innerHTML = `
                atOptions = {
                    'key' : '538ace07128c1e6dcbd20d81ec51c959',
                    'format' : 'iframe',
                    'height' : 250,
                    'width' : 300,
                    'params' : {}
                };
            `;
            adContainer.appendChild(adScript);

            const adSrcScript = document.createElement("script");
            adSrcScript.type = "text/javascript";
            adSrcScript.src = "//www.topcreativeformat.com/538ace07128c1e6dcbd20d81ec51c959/invoke.js";
            adContainer.appendChild(adSrcScript);
        } else {
            console.error("Ad container not found");
        }
    }
}, [question]); // Ensure the useEffect runs after the question is loaded


  const handleImageChange = (solutionType, language) => {
    if (!question || !question.images) return;

    const imageKey = `${language}${solutionType}`;
    const imageData = question.images[imageKey];

    if (solutionType === 'BruteForce') {
      setBruteForceImage(`data:image/png;base64,${imageData}`);
    } else if (solutionType === 'Better') {
      setBetterImage(`data:image/png;base64,${imageData}`);
    } else if (solutionType === 'Optimized') {
      setOptimizedImage(`data:image/png;base64,${imageData}`);
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!question) {
    return (
      <div>
        <Navb />
        <center style={{ width: "100%", height: "100%" }}>
          <img style={{ width: "100%", height: "100%" }} src='/loading.gif' alt="loading" />
        </center>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navb />
      <Container className="container">
        <div style={{ display: 'flex' }}>
          {/* Main Content */}
          <div>
            <h2 >{question.QuestionName}</h2>
            <h4 >Description:</h4>
            <strong style={{color:"black"}}>{question.description}</strong>

            {/* Brute Force Solution */}
            <div className="solution-section">
              <h5>Brute Force Approach</h5>
              <ButtonGroup style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button onClick={() => handleImageChange('BruteForce', 'python')}>Python</Button>
                <Button onClick={() => handleImageChange('BruteForce', 'cpp')} className="btn-warning">C++</Button>
                <Button onClick={() => handleImageChange('BruteForce', 'java')} className="btn-success">Java</Button>
              </ButtonGroup>
              <div className="solution-body">
                {bruteForceImage ? <img src={bruteForceImage} alt="Brute Force Approach" className="solution-image" /> : <p>No image available</p>}
              </div>
              <small>Time Complexity: {question.complexities.tc1}</small><br/>
              <small>Space Complexity: {question.complexities.sc1}</small>
            </div>

           
            {/* Better Solution */}
            <div className="solution-section">
              <h5>Better Approach</h5>
              <ButtonGroup style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button onClick={() => handleImageChange('Better', 'python')}>Python</Button>
                <Button onClick={() => handleImageChange('Better', 'cpp')} className="btn-warning">C++</Button>
                <Button onClick={() => handleImageChange('Better', 'java')} className="btn-success">Java</Button>
              </ButtonGroup>
              <div className="solution-body">
                {betterImage ? <img src={betterImage} alt="Better Approach" className="solution-image" /> : <p>No image available</p>}
              </div>
              <small>Time Complexity: {question.complexities.tc2}</small><br/>
              <small>Space Complexity: {question.complexities.sc2}</small>
            </div>
           
            {/* Optimized Solution */}
            <div className="solution-section">
              <h5>Optimized Approach</h5>
              <ButtonGroup style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button onClick={() => handleImageChange('Optimized', 'python')}>Python</Button>
                <Button onClick={() => handleImageChange('Optimized', 'cpp')} className="btn-warning">C++</Button>
                <Button onClick={() => handleImageChange('Optimized', 'java')} className="btn-success">Java</Button>
              </ButtonGroup>
              <div className="solution-body">
                {optimizedImage ? <img src={optimizedImage} alt="Optimized Approach" className="solution-image" /> : <p>No image available</p>}
              </div>
              <small>Time Complexity: {question.complexities.tc3}</small><br/>
              <small>Space Complexity: {question.complexities.sc3}</small>
            </div>
            <div id="ad-container" className="text-center mt-4"></div>

          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default QuestionDetail;
