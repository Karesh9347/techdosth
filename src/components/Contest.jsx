import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import { Container, ListGroup, Button } from 'react-bootstrap';
import '../css/contest.css'

const Contest = () => {
  const [contest, setContest] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-contest");
        if (response) {
          setContest(response.data);
        }
      } catch (error) {
        console.error("Error fetching contest data", error);
      }
    };
    fetchContests();
  }, []);

  const goTo = (link) => {
    window.open(link);
  };
const changeColor=(level)=>
{
  if(level=="Easy"){
    return "green"
  }else if(level=="Medium"){
    return "orange"
  }else{
    return "red"
  }
}
  return (
    <div>
      <Navb />
      <Container className="my-5">
        <h3 className="text-center mb-4">Available Contests</h3>
        <ListGroup>
          {contest.length > 0 ? contest.map((cont, index) => (
            <ListGroup.Item key={index} className="contest-item">
              <div className="contest-info">
                <h5 className="contest-name">{cont.contestName}</h5>
                <small className="contest-level" >Level:<span style={{color:changeColor(cont.contestLevel)}}> {cont.contestLevel}
                  </span>
                </small>
              </div>
              <button className='sbtn' onClick={() => goTo(cont.contestLink)}>
                Solve
              </button>
            </ListGroup.Item>
          )) : <p className="text-center">No contests available at the moment.</p>}
        </ListGroup>
      </Container>
      <Footer />
    </div>
  );
};

export default Contest;
