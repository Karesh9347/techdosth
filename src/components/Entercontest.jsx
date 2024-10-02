import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import '../css/Entercontest.css'; 
import Navb from './Navb';
import Footer from './Footer';

const Entercontest = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`https://techdosth-backend.onrender.com/contest/${id}`);
                setQuestion(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchQuestion();
    }, [id]);

    const goTo = (link) => {
        window.open(link);
    };

    const style = {
        fontWeight: 800,
        color: "green",
        marginBottom: "20px",
    };

    return (
        <div>
            <Navb/>
            {question ? (
                <div className="contest-details">
                    <h4 className="text-center" style={style}>{question.contestName}</h4>
                    <div className="text-center mt-4">
                        <Button 
                            variant="primary" 
                            size="lg" 
                            className="enter-contest-btn" 
                            onClick={() => goTo(question.contestLink)}
                        >
                            Enter Contest
                        </Button>
                    </div>
                    <Container className="enter-contest-container mt-4">
                        <h4>Scoring</h4>
                        <ul className="scoring-list">
                            <li>Each challenge has a pre-determined score.</li>
                            <li>A participant’s score depends on the number of test cases successfully passed.</li>
                            <li>If multiple submissions, the highest score is considered.</li>
                            <li>In game challenges, the score reflects the last code submission.</li>
                            <li>Participants are ranked by score, with ties broken by the last solution submission time.</li>
                        </ul>
                    </Container>
                </div>
            ) : (
                <p className="loading-text">Loading contest details...</p>
            )}
            <Footer/>
        </div>
    );
};

export default Entercontest;
