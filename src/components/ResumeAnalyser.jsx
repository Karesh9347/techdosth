import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import Footer from "./Footer";
import Navb from "./Navb";
import Groq from 'groq-sdk';
import { Button } from "react-bootstrap";
import '../css/resume.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const ResumeAnalyser = () => {
  const [jdText, setJdText] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        try {
          console.log("PDF file loaded successfully."); // Debug log
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let fullText = "";

          // Loop through each page of the PDF
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item) => item.str).join(" ");
            fullText += pageText + "\n";
          }
          console.log("Extracted PDF Text: ", fullText); // Debug log
          resolve(fullText.trim());
        } catch (error) {
          console.error("PDF extraction error: ", error); // Error logging
          reject("Error extracting text from PDF. Please try another file.");
        }
      };

      reader.onerror = (error) => {
        console.error("FileReader error: ", error); // Debug log for FileReader errors
        reject("Error reading the file. Please try again.");
      };

      // Read the file as an ArrayBuffer
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      try {
        const extractedText = await extractTextFromPDF(file);
        setText(extractedText);
        setError("");
      } catch (errorMsg) {
        setError(errorMsg);
        setText("");
      }
    } else {
      setError("Please upload a valid PDF file.");
      setText("");
    }
  };

  const handleExperienceChange = (event) => {
    const value = event.target.value;
    if (value >= 0) {
      setExperienceInput(value);
      setError("");
    } else {
      setError("Experience must be a non-negative number.");
    }
  };

  const handleJdChange = (event) => {
    setJdText(event.target.value);
  };

  const apikey = "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"; // Replace with your actual API key

  const analysisResume = async () => {
    const trimmedText = text.trim();
    const trimmedJdText = jdText.trim();
    const trimmedExperienceInput = experienceInput.trim();

    if (!trimmedText || !trimmedJdText || !trimmedExperienceInput) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setScore(0);
    setError("");

    try {
      const groq = new Groq({ apiKey: apikey, dangerouslyAllowBrowser: true });
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `The resume details are as follows:
            - Resume Text: ${trimmedText}
            - Job Description: ${trimmedJdText}
            - Candidate's Experience: ${trimmedExperienceInput} years

            Please analyze the resume against the job description and provide:
            1. A score (out of 100) indicating how well the resume matches the job description.
            2. A list of changes or improvements required to enhance the resume for applying to this job description.

            Output the analysis in JSON format with the following structure:
            {
              "score": <based on matching the job description and skills mentioned>,
              "suggestions": [
                {
                  "change": "<description of the change>",
                  "reason": "<reason for the change>"
                },
                ...
              ]
            }`
          }
        ],
        model: "gemma2-9b-it",
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 0.65,
        stream: true,
        stop: null
      });

      let accumulatedContent = '';
      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || '';
        accumulatedContent += content;

        // Update partial data to state every few iterations to avoid blocking UI
        if (accumulatedContent.length % 1000 === 0) {
          setChanges({ suggestions: [] }); // Render loading message if needed
        }
      }

      const jsonStartIndex = accumulatedContent.indexOf("{");
      const jsonEndIndex = accumulatedContent.lastIndexOf("}") + 1;
      const jsonString = accumulatedContent.substring(jsonStartIndex, jsonEndIndex);

      if (jsonString) {
        const parsedChanges = JSON.parse(jsonString);
        setChanges(parsedChanges);
        setScore(parsedChanges.score);
      } else {
        throw new Error("Failed to parse JSON response.");
      }

    } catch (error) {
      console.error("Error fetching analysis:", error);
      setError("An error occurred while analyzing the resume. Please try again.");
    } finally {
      setLoading(false);
    }
   
  };

  return (
    <div>
      <Navb />
      <div style={{ margin: "10px" }}>
        {changes ? (
          <div className="analysis-result">
            <h2 className="analysis-header">Analysis Result</h2>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${score}%` }}>
                {score}%
              </div>
            </div>
            <h3>Suggestions:</h3>
            <ul className="suggestions-list">
              {changes.suggestions.map((suggestion, index) => (
                <li key={index}>
                  <strong>Change:</strong> {suggestion.change}<br />
                  <strong>Reason:</strong> {suggestion.reason}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ marginBottom: "20px" }} className="form-container">
            <h1 className="title">Resume Analyser</h1>
            {error && <div className="error-message">{error}</div>}
            <label className="label">Upload Resume (PDF):</label>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} required />
            <label className="label">Enter job description</label>
            <textarea
              name="jdText"
              value={jdText}
              rows="5"
              onChange={handleJdChange}
              className="input-field"
              required
            />
            <label className="label">Enter Experience Directly:</label>
            <input
              value={experienceInput}
              type="number"
              onChange={handleExperienceChange}
              placeholder="Directly input experience details here"
              required
              className="input-field"
            />
            <div className="button-container">
              {loading ? (
                <Button className="button" disabled>Analyzing...</Button>
              ) : (
                <Button className="button" onClick={analysisResume}>Analyze Your Resume</Button>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ResumeAnalyser;
