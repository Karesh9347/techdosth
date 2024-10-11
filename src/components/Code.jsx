import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import Navb from "./Navb";
import Footer from "./Footer";
import { Button, Modal,Container,Row,
  Col
 } from "react-bootstrap";
import { useParams } from "react-router-dom";
import '../css/code.css';
import axios from 'axios';

const Code = () => {
  const [pythonCode, setPythonCode] = useState("loading");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [aerror,setAError]=useState(null)
  const [loading, setLoading] = useState(false);
  const [problemDetails, setProblemDetails] = useState(null);
  const [expectedOutput, setExpectedOutput] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [actualcode,setActualCode]=useState("")
  const { problemId } = useParams();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch("https://techdosth-backend.onrender.com/get-all-problems");
        if (response.ok) {
          const problems = await response.json();
          const lastProblem = problems[problems.length - 1]; // Get the last problem
          setPythonCode(lastProblem.driverCode);
          setProblemDetails(lastProblem);
           
            setActualCode(lastProblem.actualcode);
          
        } else {
          setError("Error fetching problems.");
        }
      } catch (error) {
        setError("An error occurred while fetching problems.");
      }
    };

    fetchProblems();
  }, [problemId]);

  const getResultForCode = async () => {
    try {
      const response = await fetch("https://techdosth-backend.onrender.com/execute-python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: actualcode }),
      });

      if (response.ok) {
        const data = await response.json();
        
        setExpectedOutput(data.output);
        console.log(output)
      } else {
        const errorData = await response.json();
        setAError(errorData.error || "Error executing code.");
      }
    } catch (error) {
      setAError("An error occurred while executing the user code.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (problemDetails) {
     
      getResultForCode(); // Fetch result for the actual code
    }
  }, [problemDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");
    setIsSolved(false);

    try {
      const response = await fetch("https://techdosth-backend.onrender.com/execute-python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: pythonCode }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data.output);

        // Check if the output matches the expected output
        if ( data.output.trim() === expectedOutput.trim()) {

          setIsSolved(true);
          setShowSuccessModal(true);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error executing code.");
      }
    } catch (error) {
      setError("An error occurred while executing the user code.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  return (
    <>
      <Navb />
    
        <Row>
          <Col md={12} lg={6}>
      
        <div className="problem-details">
          <h1>Problem of the Day</h1>
          {problemDetails ? (
            <div>
              <h3>{problemDetails.title}</h3>
              <p>{problemDetails.description}</p>
              <h4>Examples:</h4>
              {problemDetails.examples && problemDetails.examples.map((example, index) => (
                <div key={index}>
                  <strong>Input:</strong> {example.input} <br />
                  <strong>Output:</strong> {example.output} <br />
                </div>
              ))}
            </div>
          ) : (
            <p>Loading problem details...</p>
          )}
        </div>
</Col>
<Col lg={6} md={12}>
        <div className="code-editor">
       
          <form onSubmit={handleSubmit}>
            <Editor
              height="300px"
              defaultLanguage="python"
              value={pythonCode}
              onChange={(newValue) => setPythonCode(newValue)}
              theme="vs-dark"
            />
            <button className="execute-button" type="submit" disabled={loading}>
              {loading ? "Executing..." : "Execute"}
            </button>
          </form>

          <div className="output-section">
            <h3>User Output:</h3>
            {error ? (
              <pre>{error}</pre>
            ) : (
              <pre>{output}</pre>
            )}
            <h3>Expected Output:</h3>
          
              <pre>{expectedOutput}</pre>
         
            <h4>Status: {isSolved ? "Solved!" : "Not Solved Yet"}</h4>
          </div>
        </div>
      

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered className="success-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            Congratulations!
            <img src="./success.png" alt="" width={40} height={40} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <strong style={{ color: "green" }}>
            Your code executed successfully and produced the expected output!
          </strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Col>
        </Row>
      

      <Footer />
    </>
  );
};

export default Code;
