import React from "react";
import { Navbar, Nav, Container, Offcanvas, Dropdown } from "react-bootstrap";
import { House, Book, Person ,Pen} from "react-bootstrap-icons";
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
                    label: "Practice", 
                    icon: <Pen size={20} />,
                    dropdown: true,
                  },
                
          
               
                  { 
                    label: "Interview preparation", 
                    icon: <Book size={20} />,
                    dropdown: true,
                  },
                 
                  {
                    to: user ? "/profile" : "/login",
                    icon: <Person size={20} />,
                    label: user ? user.user.username : "Account",
                  },
                ].map((navItem, index) => (
                  <div key={index}>
                    {navItem.dropdown ? (
                      <Dropdown>
                        <Dropdown.Toggle as={Nav.Link}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            {navItem.icon}
                            <h6 style={{ margin: "0 10px" }}>{navItem.label}</h6>
                            
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown">
  {navItem.label === "Interview preparation" && (
    <>
      <Dropdown.Item as={Link} to="/ai-interview">
        Mock Interviews  <br/>Simulate real-time interviews with AI-driven feedback.
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/courses">
        Interview MCQs with Explanation  <br/> Multiple-choice questions with detailed explanations.
      </Dropdown.Item>
    </>
  )}
  {navItem.label === "Practice" && (
    <>
      <Dropdown.Item as={Link} to="/dsa">
        DSA Problems  <br/> Practice data structures and algorithms challenges.
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/sql-queries">
        SQL Queries  <br/> Solve problems to improve your SQL query skills.
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/aptitude">
        Aptitude Questions 
        <br/>
         Hone your logical, quantitative, and verbal reasoning.
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/contest">
        Contests  <br/> Participate in coding contests to test your skills.
      </Dropdown.Item>
    </>
  )}
</Dropdown.Menu>

                      </Dropdown>
                    ) : (
                      <Nav.Link as={Link} to={navItem.to}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {navItem.icon}
                          <h6 style={{ margin: "0 10px" }}>{navItem.label}</h6>
                        </div>
                      </Nav.Link>
                    )}
                  </div>
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
