import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import { Container, Spinner } from 'react-bootstrap';
import '../css/solution.css'
const Solution = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);


  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`https://techdosth-backend-1.onrender.com/aquestions/${id}`);
        setQuestion(response.data);
       
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestion();
  }, [id]);
  
  return (
    <div>
      <Navb/>
      {question ? (
        <Container>
          <strong className='head'>Question:</strong>
        <br/>
          <strong style={{color:"red"}}>{question.questionName}</strong>
          <br />
          <strong className='head'>Description:</strong>
        
          <p> {question.description}</p>
       
         <div style={{width:"100%",height:"100%"}}>
          <strong>Solutions:</strong>
        <hr/>
         <img src={question.solution} alt='solution' style={{width:"90%",height:"90%"}}/>
         </div>
        </Container>
      ) : (
       <div>
         <Spinner/><p>loading</p>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Solution;
