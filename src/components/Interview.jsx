import React, { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import "../css/interview.css";
import Footer from './Footer';
import Navb from './Navb';
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [permissionError, setPermissionError] = useState(null);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const videoRef = useRef(null);
  const [showAns, setShowAns] = useState(false); // Corrected answer state
  const mediaStreamRef = useRef(null);
  const navigate = useNavigate();
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcript, setTranscript] = useState("");
  //geting audio from video

  const extractAudio = () => {
    const videoElement = videoRef.current;
    
    // Ensure the video is loaded
    if (videoElement) {
      // Create a MediaStream from the video element
      const audioStream = videoElement.captureStream().getAudioTracks();
      
      if (audioStream.length > 0) {
        // Create a new MediaStream only containing the audio track
        const audioOnlyStream = new MediaStream(audioStream);

        // Use MediaRecorder to record the audio stream
        const mediaRecorder = new MediaRecorder(audioOnlyStream);

        let audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
        };

        // Start recording
        mediaRecorder.start();

        // Stop recording after the duration of the video
        videoElement.onended = () => {
          mediaRecorder.stop();
        };
      } else {
        console.error('No audio tracks found in the video.');
      }
    }
  };
  //interview performance anaysis
  const Analyse=()=>{
    extractAudio()
  }
  //audio to text
  const handleTranscription = () => {
    recognition.lang = 'en-US';  // Set language
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      console.log('Transcript: ', speechToText);
    };

    recognition.onerror = (event) => {
      console.error('Error during transcription: ', event.error);
    };

    recognition.start();
  };

  const fallbackQuestions = {
    python: [
      { question: "What is Python?", solution: "Python is a high-level programming language." },
      { question: "Explain the difference between lists and tuples.", solution: "Lists are mutable, tuples are immutable." },
      { question: "How do you handle exceptions in Python?", solution: "Exceptions are handled using try-except blocks." },
    ],
    java: [
      { question: "What is Java?", solution: "Java is a class-based, object-oriented programming language." },
      { question: "What are the key principles of OOP in Java?", solution: "Abstraction, Encapsulation, Inheritance, and Polymorphism." },
      { question: "What is the difference between JDK, JRE, and JVM?", solution: "JDK is a development kit, JRE is for running programs, JVM is the engine." },
    ],
    hr: [
      { question: "Tell me about yourself.", solution: "Provide a brief summary of your professional background." },
      { question: "What are your strengths and weaknesses?", solution: "Highlight key strengths and a development area." },
      { question: "Where do you see yourself in 5 years?", solution: "Outline career goals that align with the job." },
    ],
  };

  useEffect(() => {
    const storedQuestions = JSON.parse(sessionStorage.getItem('interview-questions')) || [];
    if (storedQuestions.length === 0) {
      const topic = sessionStorage.getItem('topic');
      setQuestions(fallbackQuestions[topic] || []);
    } else {
      setQuestions(storedQuestions);
    }

    window.speechSynthesis.onvoiceschanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    const loadVoices = () => {
      if (voices.length === 0) {
        setVoices(window.speechSynthesis.getVoices());
      }
    };
    loadVoices();
  }, [voices]);

  const requestMediaPermissions = async () => {
    setShow(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      mediaStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((err) => {
            console.error("Error playing video:", err);
          });
        };
      }

      const newRecorder = new RecordRTC(stream, {
        type: "video",
        mimeType: "video/webm",
        video: { width: 1280, height: 720 },
      });

      setRecorder(newRecorder);
      newRecorder.startRecording();
      setIsRecording(true);
      setPermissionError(null);
      speakQuestion(questions[0].question);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setPermissionError("Please allow access to camera and microphone.");
    }
  };

  const speakQuestion = (question) => {
    const utterance = new SpeechSynthesisUtterance(question);

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    if (voices.length > 0) {
      utterance.voice = voices[0];
    }

    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const stopRecording = () => {
    setShow(false);
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const videoUrl = URL.createObjectURL(blob);
        setVideoUrl(videoUrl);
        setInterviewComplete(true);

        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop());
          mediaStreamRef.current = null;
        }
      });
    }
    setIsRecording(false);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      speakQuestion(questions[currentQuestionIndex + 1].question);
    } else {
      stopRecording();
    }
  };

  const repeat = () => {
    setVideoUrl(null);
    setCurrentQuestionIndex(0);
    requestMediaPermissions();
  };
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      marginTop: "20px"
    },
    header: {
      textAlign: "center",
      marginBottom: "20px"
    },
    link: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "5px",
      fontWeight: "bold"
    },
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "bold",
      color: "#fff"
    },
    tryAnother: {
      backgroundColor: "#28a745",
    },
    repeat: {
      backgroundColor: "#ffc107",
    }
  };
  return (
    <>
      <Navb />
      <div className="interview-container">
        {permissionError && <p>{permissionError}</p>}
        {!isRecording && !interviewComplete && (
          <div className="instructions-container">
            <Button onClick={requestMediaPermissions}>Start Interview</Button>
            <h2>Interview Instructions</h2>
            <ol>
              <li>Click the <strong>Start Interview</strong> button to begin the interview process.</li>
              <li>After each question is asked aloud, the system will automatically start listening for your answer.</li>
              <li>Speak your answer clearly.</li>
              <li>Click on the "Next Question" button to proceed.</li>
              <li>If you want to hear the question again, click "Repeat Question".</li>
              <li>Click "Stop Interview" to end the interview at any time.</li>
              <li>After the interview, you can download the recording.</li>
            </ol>
            <p><strong>Note:</strong> Grant camera and microphone permissions when prompted to allow recording.</p>
          </div>
        )}
        <div className="quetions_and_video" style={{ display: "flex" }}>
          <div className="question">
            {isRecording && (
              <>
                <p>{currentQuestionIndex + 1}. {questions[currentQuestionIndex]?.question}</p>
                <ButtonGroup>
                  <Button onClick={nextQuestion} disabled={isSpeaking}>Next Question</Button>
                  <Button onClick={() => speakQuestion(questions[currentQuestionIndex]?.question)} className="bg-warning" disabled={isSpeaking}>Repeat Question</Button>
                  <Button className="bg-danger" onClick={stopRecording} disabled={isSpeaking}>Stop Interview</Button>
                </ButtonGroup>
                <div>
                  {showAns ? (
                    <div>
                      <p>{questions[currentQuestionIndex]?.solution}</p>
                      <Button className="bg-success" onClick={() => setShowAns(false)}>Hide Answer</Button>
                    </div>
                  ) : (
                    <Button className="bg-success" onClick={() => setShowAns(true)}>Show Answer</Button>
                  )}
                </div>
              </>
            )}
            {interviewComplete && (
              <div className="recording-complete">
                {videoUrl && (
                 
                  
                  <>
                    <h2 style={styles.header}>Interview Completed</h2>
                    <div style={styles.container}>
                      <a 
                        href={videoUrl} 
                        download="interview_recording.webm" 
                        style={styles.link}>
                        Download your interview recording
                      </a>

                      <Button 
                        onClick={() => navigate('/ai-interview')} 
                        style={{ ...styles.button, ...styles.tryAnother }}>
                        Try Another Interview
                      </Button>
                      <Button 
                        onClick={repeat} 
                        style={{ ...styles.button, ...styles.repeat }}>
                        Repeat
                      </Button>
                     
                    </div>
                  </>
                  
                )}
              </div>
            )}
          </div>
          <div className="video">
            {show && (
              <div className="video-container">
                <video ref={videoRef} autoPlay muted className="live-video" />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Interview;