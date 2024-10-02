import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navb from './Navb';
import Footer from './Footer';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import '../css/contest.css';
import { Link } from 'react-router-dom';

const Contest = () => {
  const [contest, setContest] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("https://techdosth-backend.onrender.com/get-contest");
        if (response) {
          setContest(response.data);
        }
      } catch (error) {
        console.error("Error fetching contest data", error);
      }
    };
    fetchContests();
  }, []);

  const changeColor = (level) => {
    if (level === "Easy") {
      return "green";
    } else if (level === "Medium") {
      return "orange";
    } else {
      return "red";
    }
  };

  useEffect(() => {
    // Adding first ad script dynamically
    const allContestsAd = document.getElementById("all-contests-ad");
    if (allContestsAd) {
      const adScript = document.createElement("script");
      adScript.type = "text/javascript";
      adScript.innerHTML = `
        atOptions = {
          'key' : 'ce2dd5ab84296fc772bdb4166850308d',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      `;
      allContestsAd.appendChild(adScript);

      const adSrcScript = document.createElement("script");
      adSrcScript.type = "text/javascript";
      adSrcScript.src = "//www.topcreativeformat.com/ce2dd5ab84296fc772bdb4166850308d/invoke.js";
      allContestsAd.appendChild(adSrcScript);
    }

    // Adding second ad script dynamically
    const containerAd = document.getElementById("container-f2c1ca9ffe46af45e4160982710441a9");
    if (containerAd) {
      const secondAdScript = document.createElement("script");
      secondAdScript.async = true;
      secondAdScript.setAttribute("data-cfasync", "false");
      secondAdScript.src = "//pl24572181.cpmrevenuegate.com/f2c1ca9ffe46af45e4160982710441a9/invoke.js";
      containerAd.appendChild(secondAdScript);
    }
  }, []);

  return (
    <div>
      <Navb />
      <Container className="my-5">
        <h3 className="text-center mb-4 text-warning">Available Contests</h3>
        <ListGroup>
          {contest.length > 0 ? (
            contest.map((cont, index) => (
              <ListGroup.Item key={index} className="contest-item">
                <div className="contest-info">
                  <h5 className="contest-name">{cont.contestName}</h5>
                  <small className="contest-level">
                    Level:
                    <span style={{ color: changeColor(cont.contestLevel) }}>
                      {" "}
                      {cont.contestLevel}
                    </span>
                  </small>
                </div>
                <Link to={`/contest/${cont._id}`} className="sbtn">
                  Solve
                </Link>
              </ListGroup.Item>
            ))
          ) : (
            <div>
              <center>
                <Spinner />
              </center>
              <p className="text-center">Loading</p>
            </div>
          )}
        </ListGroup>

       
        <div id="container-f2c1ca9ffe46af45e4160982710441a9" className="text-center mt-4"></div>
      </Container>
      <Footer />
    </div>
  );
};

export default Contest;
