import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // Importing required components from react-bootstrap
import "../css/about.css"; // Importing custom CSS
import Navb from "./Navb";
import Footer from "./Footer";

const About = () => {
  return (
    <div>
      <Navb />
      <Container className="about-container">
        <Row className="text-center mb-4">
          <Col>
            <h1>Welcome to TechDosth!</h1>
            <p>
              At TechDosth, we are passionate about empowering individuals who
              are eager to master Data Structures and Algorithms (DSA). Our
              platform is dedicated to providing comprehensive resources,
              insightful tutorials, and hands-on practice to help you excel in
              the world of algorithms and coding challenges.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Container className="about-card">
              <h4>Why TechDosth?</h4>
              <ul>
                <li>
                  <strong>Expertly Curated Content:</strong> Explore a vast
                  library of articles, video tutorials, and coding problems
                  designed by experts to enhance your understanding of key DSA
                  concepts.
                </li>
                <li>
                  <strong>Interactive Learning:</strong> Engage with interactive
                  coding problems and solutions to test and improve your skills
                  in real-time.
                </li>
                <li>
                  <strong>Community Support:</strong> Join a vibrant community
                  of like-minded individuals who share your enthusiasm for DSA.
                  Participate in discussions, ask questions, and collaborate on
                  projects.
                </li>
                <li>
                  <strong>Practical Insights:</strong> Get access to practical
                  tips, industry insights, and best practices that can help you
                  apply your knowledge to real-world scenarios and interviews.
                </li>
              </ul>
            </Container>
          </Col>
          <Col md={6}>
            <Container className="about-card">
              <h4>What we offer?</h4>
              <ul>
                <li>
                  <strong>In-Depth Tutorials:</strong> Step-by-step guides
                  covering fundamental and advanced topics in DSA.
                </li>
                <li>
                  <strong>Practice Problems:</strong> A wide range of problems
                  to challenge and refine your problem-solving skills.
                </li>
                <li>
                  <strong>Video Content:</strong> Engaging video tutorials that
                  break down complex topics into easy-to-understand lessons.
                </li>
                <li>
                  <strong>Regular Updates:</strong> Stay up-to-date with the
                  latest trends and techniques in the field of DSA.
                </li>
              </ul>
            </Container>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <p>
              Whether you're a beginner looking to build a solid foundation or
              an experienced coder aiming to sharpen your skills, TechDosth is
              here to support your journey. Join us today and take your DSA
              skills to the next level!
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default About;
