import React, { useState, useEffect } from 'react';
import { Button, Container, Modal, Table, Row, Col } from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import axios from 'axios';
import '../css/query.css';
import Footer from './Footer';
import Navb from './Navb';

const Query = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [expectedTestCaseResult, setExpectedTestCaseResult] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryOfTheDay, setQueryOfTheDay] = useState({})

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('https://techdosth-backend.onrender.com/queries');
        if (response.data.length > 0) {
          const lastQuery = response.data[response.data.length - 1];
          setQueryOfTheDay(lastQuery);
          setQuery(lastQuery.actualQuery || ""); 
        }
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    
      fetchQueries();
    
  }, [queryOfTheDay]);

  useEffect(() => {
    if (queryOfTheDay?.actualQuery) {
      const fetchExpectedResult = async () => {
        try {
          const response = await axios.post('https://techdosth-backend.onrender.com/execute-query', { query: queryOfTheDay.actualQuery });
          setExpectedTestCaseResult(response.data.result);
        } catch (error) {
          console.error('Error fetching expected result:', error);
        }
      };
      fetchExpectedResult();
    }
  }, [queryOfTheDay]);

  const runQuery = async () => {
    setIsExecuting(true);
    if (!query) {
      setIsExecuting(false);
      return;
    }

    try {
      const response = await axios.post('https://techdosth-backend.onrender.com/execute-query', { query });
      if (response.data.error) {
        setResult([{ error: response.data.error }]);
      } else {
        setResult(response.data.result);
        const sortedResult = [...response.data.result].sort();
        const sortedExpected = [...expectedTestCaseResult].sort();
        const solved = JSON.stringify(sortedResult) === JSON.stringify(sortedExpected);
        setIsSolved(solved);

        if (solved) {
          setShowModal(true);
        }
      }
    } catch (err) {
      console.error('Error executing query:', err);
      setResult([{ error: 'An unexpected error occurred.' }]);
      setIsSolved(false);
    } finally {
      setIsExecuting(false);
    }
  };

  const renderTable = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <tr><td>No data available</td></tr>;
    }

    const columns = Object.keys(data[0]);
    return (
      <Table striped bordered hover className="result-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((row, index) => (
            <tr key={index}>
              {columns.map((col, idx) => (
                <td key={idx} data-label={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const handleClose = () => setShowModal(false);

  const splitDescription = (desc) => {
    const words = desc.split('*');
    return { firstPart: words[0], secondPart: words[1] || '' };
  };

  const renderRelatedTopics = (topics) => {
    const limitedTopics = topics[0]?.split('*') || [];
    return (
      <ol>
        {limitedTopics.map((topic, index) => 
          topic && topic.length > 0 ? (
            <li key={index} style={{ borderBottom: "1px solid black", marginBottom: "9px" }}>
              {topic}
            </li>
          ) : null
        )}
      </ol>
    );
  };
  
  return (
    <>
      <Navb />
      <div className="query-container" style={{ marginTop: "-20px" }}>
        <Row>
          <Col md={6}>
            {queryOfTheDay && (
              <div className="query-of-the-day">
                <h4>{queryOfTheDay.shortName}</h4>
                {queryOfTheDay.description && (
                  <>
                    <strong>{splitDescription(queryOfTheDay.description).firstPart}</strong>
                    <br />
                    <span>{splitDescription(queryOfTheDay.description).secondPart}</span>
                  </>
                )}
                <br />
                <strong>Difficulty Level: {queryOfTheDay.difficultyLevel}</strong>
                <h2>Employee Schema</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Data Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>id</td><td>int</td></tr>
                    <tr><td>name</td><td>varchar(250)</td></tr>
                    <tr><td>position</td><td>varchar(250)</td></tr>
                    <tr><td>age</td><td>int</td></tr>
                    <tr><td>salary</td><td>int</td></tr>
                  </tbody>
                </Table>
               
                <div>
                  <strong>Related Topics:</strong>
                  {renderRelatedTopics(queryOfTheDay.relatedTopics)}
                </div>
               
              </div>
            )}
          </Col>
          <Col md={6}>
            <h3 className="editor-title">SQL Query Editor</h3>
            <AceEditor
              mode="sql"
              theme="github"
              name="sql-editor"
              value={query}
              onChange={setQuery}
              editorProps={{ $blockScrolling: true }}
              height="200px"
              width="100%"
              className="editor"
              style={{ fontSize: "20px" }}
            />
            <Button
              variant="primary"
              onClick={runQuery}
              className="run-button"
              disabled={isExecuting}
            >
              {isExecuting ? "Executing..." : "Run Query"}
            </Button>
            <div className="results-section" >
              <div style={{display:"flex",justifyContent:"space-between"}}><h5 className="result-title">Result:</h5> <h5 className={`query-status ${isSolved ? 'solved' : 'not-solved'}`}>
                Query Status: <span style={{ color: isSolved ? 'green' : 'red' }}>{isSolved ? 'Solved' : 'Not Solved'}</span>
              </h5></div>
              {renderTable(result)}
             
             
            </div>
            <h5 className="result-title">Expected Test Case Result:</h5>
            {renderTable(expectedTestCaseResult)}
          
           
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations! <img src="./success.png" alt='' width={40} height={40} /></Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <strong style={{ color: "green" }}>Congrats, you solved this problem! We'll meet again soon with more challenges!</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Query;
