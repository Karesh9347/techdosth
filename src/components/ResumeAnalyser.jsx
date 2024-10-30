import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import Footer from "./Footer";
import Navb from "./Navb";
import Groq from 'groq-sdk';
import { Button } from "react-bootstrap";
import '../css/resume.css';
// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const ResumeAnalyser = () => {
  const [jdText, setjdText] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState("");
  const [score, setScore] = useState(0); // State for the score

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        try {
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let fullText = "";

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item) => item.str).join(" ");
            fullText += pageText + "\n"; // Concatenate page text
          }
          setText(fullText.trim());
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
          setText("Error extracting text. Please try another file.");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setText("Please upload a valid PDF file.");
    }
  };

  const handleExperienceChange = (event) => {
    setExperienceInput(event.target.value);
  };

  const handlejdChange = (event) => {
    setjdText(event.target.value);
  };
const apikey = "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";

  const analysisResume = async () => {
    const trimmedText = text.trim();
    const trimmedJdText = jdText.trim();
    const trimmedExperienceInput = experienceInput.trim();

    if (!trimmedText || !trimmedJdText || !trimmedExperienceInput) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setScore(0); // Reset score

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
              "score": <based matcing the job description and skill mentiond and experiance>,
              "suggestions": [
                {
                  "change": "<description of the change>",
                  "reason": "<reason for the change>"
                },
                ...
              ]#add minimum two max 5
            } and if you it does not feel like resume text, return zero score `
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
      let totalChunks = 0;

      for await (const chunk of chatCompletion) {
        const questionContent = chunk.choices[0]?.delta?.content || '';
        accumulatedContent += questionContent;
        totalChunks += 1;
      }

      const jsonStartIndex = accumulatedContent.indexOf("{");
      const jsonEndIndex = accumulatedContent.lastIndexOf("}") + 1;
      const jsonString = accumulatedContent.substring(jsonStartIndex, jsonEndIndex);

      if (jsonString) {
        const parsedChanges = JSON.parse(jsonString);
        setChanges(parsedChanges);
        setScore(parsedChanges.score); // Set the score from the response
      }

    } catch (error) {
      console.error("Error fetching analysis:", error);
      alert("An error occurred while analyzing the resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Navb />
        <div style={{margin:"10px"}}>
           
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

                    <label className="label">Upload Resume (PDF):</label>
                    <input type="file" accept="application/pdf" onChange={handleFileUpload} required />
                    <label className="label">Enter job description</label>
                    <textarea
                        name="jdText"
                        value={jdText}
                        rows="5"
                        onChange={handlejdChange}
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
