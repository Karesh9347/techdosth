import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Alert, ButtonGroup, Button } from "react-bootstrap";
import '../css/soltions.css'; // Import the CSS file
import Navb from "./Navb";
import Footer from "./Footer";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);
  const [brute, setBrute] = useState(null);
  const [better, setBetter] = useState(null);
  const [optimize, setOptimize] = useState(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await axios.get(`https://techdosth-backend-1.onrender.com/questions/${id}`);
        setQuestion(response.data);
        // Initialize images for each approach
        if (response.data.images) {
          setBrute(`data:image/png;base64,${response.data.images.pythonBruteForce}`);
          setBetter(`data:image/png;base64,${response.data.images.pythonBetter}`);
          setOptimize(`data:image/png;base64,${response.data.images.pythonOptimized}`);
        }
      } catch (err) {
        setError("Error fetching question details: " + err.message);
        console.error("Error:", err.message);
      }
    };

    fetchQuestionDetails();
  }, [id]);

  useEffect(() => {
    // Load Google AdSense
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.setAttribute("data-ad-client", "ca-pub-6817331680883128");
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Load your custom ad script
    const customAdScript = document.createElement("script");
    customAdScript.async = true;
    customAdScript.src = "//www.topcreativeformat.com/fc9e8454a890da46c9f64d03d0ee905d/invoke.js";
    document.body.appendChild(customAdScript);

    return () => {
      // Clean up by removing both scripts
      document.body.removeChild(script);
      document.body.removeChild(customAdScript);
    };
  }, []);

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

  // Helper function to get base64 image data
  const getBase64Image = (imageName) => {
    return question.images && question.images[imageName]
      ? `data:image/png;base64,${question.images[imageName]}`
      : null;
  };

  const cppBruteForceImage = getBase64Image("cppBruteForce");
  const cppBetterImage = getBase64Image("cppBetter");
  const cppOptimizedImage = getBase64Image("cppOptimized");
  const pythonBruteForceImage = getBase64Image("pythonBruteForce");
  const pythonBetterImage = getBase64Image("pythonBetter");
  const pythonOptimizedImage = getBase64Image("pythonOptimized");
  const javaBruteForceImage = getBase64Image("javaBruteForce");
  const javaBetterImage = getBase64Image("javaBetter");
  const javaOptimizedImage = getBase64Image("javaOptimized");

  return (
    <div>
      <Navb />

      <Container className="container">
        <h2>{question.QuestionName}</h2>
        <h4>Description:</h4><p>{question.description}</p>

        {/* Brute Force Solution */}
        <div className="solution-section">
          <h5>Brute Force Approach</h5>
          <div className="solution-header">
            <ButtonGroup style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Button onClick={() => setBrute(pythonBruteForceImage)}>Python</Button>
              <Button onClick={() => setBrute(cppBruteForceImage)} className="btn-warning">C++</Button>
              <Button onClick={() => setBrute(javaBruteForceImage)} className="btn-success">Java</Button>
            </ButtonGroup>
          </div>
          <div className="solution-body">
            {brute ? (
              <img src={brute} alt="Brute Force Approach" className="solution-image" />
            ) : (
              <p>No image available, we will update soon</p>
            )}
          </div>

          {/* Additional content under Brute Force Approach */}
          <p>Time Complexity: {question.complexities.tc1}</p>
          <p>Space Complexity: {question.complexities.sc1}</p>

          {/* Google AdSense Ad */}
          <div className="ads-section">
            <ins className="adsbygoogle"
                 style={{ display: "block" }}
                 data-ad-client="ca-pub-6817331680883128"
                 data-ad-slot="8987415025"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>

          {/* Custom Ad */}
          <div className="custom-ads-section">
            <script type="text/javascript">
              atOptions = {
                'key': 'fc9e8454a890da46c9f64d03d0ee905d',
                'format': 'iframe',
                'height': 300,
                'width': 160,
                'params': {}
              };
            </script>
            <iframe 
              src="//www.topcreativeformat.com/fc9e8454a890da46c9f64d03d0ee905d/invoke.js"
              width="160"
              height="300"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              title="custom-ad"></iframe>
          </div>
        </div>

        {/* Better and Optimized Solutions follow similarly... */}
                {/* Better Solution */}
        <div className="solution-section">
          <h5>Better Approach</h5>
          <div className="solution-header">
            <ButtonGroup style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Button onClick={() => setBetter(pythonBetterImage)}>Python</Button>
              <Button onClick={() => setBetter(cppBetterImage)} className="btn-warning">C++</Button>
              <Button onClick={() => setBetter(javaBetterImage)} className="btn-success">Java</Button>
            </ButtonGroup>
          </div>
          <div className="solution-body">
            {better ? <img src={better} alt="Better Approach" className="solution-image" /> : <p>No image available</p>}
          </div>
          <p>Time Complexity: {question.complexities.tc2}</p>
          <p>Space Complexity: {question.complexities.sc2}</p>
        </div>

        {/* Optimized Solution */}
        <div className="solution-section">
          <h5>Optimized Approach</h5>
          <div className="solution-header">
            <ButtonGroup style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Button onClick={() => setOptimize(pythonOptimizedImage)}>Python</Button>
              <Button onClick={() => setOptimize(cppOptimizedImage)} className="btn-warning">C++</Button>
              <Button onClick={() => setOptimize(javaOptimizedImage)} className="btn-success">Java</Button>
            </ButtonGroup>
          </div>
          <div className="solution-body">
            {optimize ? <img src={optimize} alt="Optimized Approach" className="solution-image" /> : <p>No image available</p>}
          </div>
          <p>Time Complexity: {question.complexities.tc3}</p>
          <p>Space Complexity: {question.complexities.sc3}</p>
        </div>
        
      </Container>
      <Footer />
    </div>
  );
};

export default QuestionDetail;
