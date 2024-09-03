import React from "react";
import Login from './Login'
import Navb from "./Navb";
import Footer from "./Footer";
import "../css/couses.css";
import {Container } from "react-bootstrap";
const Courses = () => {
  const isLogin=localStorage.getItem("isLogin")
  console.log(isLogin)
  return (
  
    <div>
      <Navb />
      <div className="courses-container">
        <h1>We will launch new courses very soon, stay tuned!</h1>
        <Container className="img-con">
          <img src="/stay.png" />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
