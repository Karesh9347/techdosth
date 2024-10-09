import React from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { House, Book, Person, Pen, CodeSquare, Lightbulb } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../css/nav.css";

function Navb() {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">
          <div className="logo-container">
            <div className="logo-icon">T</div>
            <div className="logo-text">
              ech<span>Dosth</span>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <div className="logo-container">
                  <div className="logo-icon">T</div>
                  <div className="logo-text">
                    ech<span>Dosth</span>
                  </div>
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {[
                  { to: "/", icon: <House size={20} />, label: "Home" },
                  {
                    to: "/dsa",
                    icon: <CodeSquare size={20} />,
                    label: "DSA",
                    description: "Practice data structures and algorithms problems for interviews",
                  },
                  {
                    to: "/aptitude",
                    icon: <Lightbulb size={20} />,
                    label: "Aptitude",
                    description: "Learn aptitude to crack first round of interview",
                  },
                  {
                    to: "/sql-queries",
                    icon: <CodeSquare size={20} />,
                    label: "SQL Queries",
                    description: "Practice DBMS and SQL to crack jobs like data analyst and full stack developer",
                  },
                  { to: "/contest", icon: <Pen size={20} />, label: "Contest" },
                  { to: "/courses", icon: <Book size={20} />, label: "Interviews MCQ's" },
                  {
                    to: user ? "/profile" : "/login",
                    icon: <Person size={20} />,
                    label: user ? user.user.username : "Account",
                  },
                ].map((navItem, index) => (
                  <Nav.Link as={Link} to={navItem.to} key={index}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {navItem.icon}
                      <h6 style={{ margin: "0 10px" }}>{navItem.label}</h6>
                      {navItem.description && (
                        <div className="dropdown-content">
                          <span className="text-dark">{navItem.description}</span>
                        </div>
                      )}
                    </div>
                  </Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
