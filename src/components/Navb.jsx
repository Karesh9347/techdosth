import React from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { House, Book, Person } from 'react-bootstrap-icons';
import '../css/nav.css';
import {Link} from 'react-router-dom'
function Navb() {
  const isLogin=localStorage.getItem("isLogin")

  return (
    
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#home">
          <div className="logo-container">
            <div className="logo-icon">T</div>
            <div className="logo-text">ech<span>Dosth</span></div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <div className="logo-container">
                  <div className="logo-icon">T</div>
                  <div className="logo-text">ech<span>Dosth</span></div>
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/"  >
                <div style={{display:"flex"}}>
                  <House className="me-2" size={25} />
                  <h5>Home</h5>
                  </div>

                </Nav.Link>
          
                <Nav.Link  as={Link} to="/courses">
                  <div style={{display:"flex"}}>
                  <Book className="me-2" size={25}/>
                  <h5>Courses</h5>

                  </div>
                </Nav.Link>
               <div>
                <Nav.Link as={Link} to='/login'>
                <div style={{display:"flex"}}>
                  <Person className="me-2" size={25}/>
                  <h5>Account</h5>
                  </div>
                </Nav.Link>
              </div>  
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
