import React, { useState } from 'react';
import '../css/webcam1.css';
import Groq from 'groq-sdk';
import Navb from './Navb';
import Footer from './Footer';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Webcam1 = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apikey ="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"
const [topic,setTopic]=useState("")
  const fetchInterviewQuestions = async (topic) => {
    setLoading(true);
    try {
      const groq = new Groq({ apiKey: apikey, dangerouslyAllowBrowser: true });
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Please provide an array of exactly 10 JSON objects where each object represents an interview question related to the topic '${topic}'. Each JSON object should contain two key-value pairs: one key named 'question' with the interview question text as its value, and another key named 'solution' with an empty string as its value. 

Here’s an example structure:

[
  {"question": "What is the difference between Python 2 and Python 3?"},
  {"question": "Explain how garbage collection works in Java."}
]

Now, please generate a similar array with 10 interview questions on the topic '${topic}' and add extra attriube called solution to  corresponding question and add solution to the coresponded question and do not forget return a json object.
"
`
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
        const questionContent = chunk.choices[0]?.delta?.content || '';
        accumulatedContent += questionContent;
      } 
      //console.log(accumulatedContent)
      const jsonStartIndex = accumulatedContent.indexOf("[");
      const jsonEndIndex = accumulatedContent.lastIndexOf("]")+1 ;
      const jsonString = accumulatedContent.substring(jsonStartIndex, jsonEndIndex);
      
      if (jsonString) {
        const parsedQuestions = JSON.parse(jsonString);
        //console.log(parsedQuestions)
        setQuestions(parsedQuestions);
        
   
        sessionStorage.setItem("interview-questions", JSON.stringify(parsedQuestions));
      }
     
      
      
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;
    sessionStorage.setItem("topic",selectedTopic)
    //console.log(selectedTopic)
    setTopic(selectedTopic)
    if (selectedTopic) {
      fetchInterviewQuestions(selectedTopic);
    }
  };

  const navigateToInterview = () => {
    navigate("/interview");
  };
  const subjects = [
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'behavioural quetions', label: 'HR Interview Questions' },
    { value: 'data-structures', label: 'Data Structures' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'database', label: 'Database' },
    { value: 'networking', label: 'Networking' },
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'data-analyst', label: 'Data Analyst' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'machine-learning', label: 'Machine Learning Engineer' },
    { value: 'ai-engineer', label: 'AI Engineer' },
    { value: 'cloud-engineer', label: 'Cloud Engineer' },
    { value: 'full-stack', label: 'Full Stack Development' },
    { value: 'devops', label: 'DevOps' },
    { value: 'cyber-security', label: 'Cyber Security' },
    { value: 'blockchain', label: 'Blockchain Developer' },
  ];

  return (
    <>
      <Navb />
      <div className="webcam-container">
        <h1>Select Interview Topic</h1>
        <select value={topic} onChange={handleTopicChange}>
      <option value="">Select a topic to get a mock interview</option>
      {subjects.map((subject) => (
        <option key={subject.value} value={subject.value}>
          {subject.label}
        </option>
      ))}
    </select>
        <br /><br />
        {loading 
          ? <p>AI is preparing interview questions based on your topic...</p> 
          : <Button onClick={navigateToInterview}>Start Interview</Button>
        }
      </div>
      <Footer />
    </>
  );
};

export default Webcam1;
