import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/aptitude.css';
import Footer from './Footer';
import Navb from './Navb';
import AptitudeQuestions from './AptitudeQuestions';

const Aptitude = () => {
  
  const questions = [
    { id: 1, title: 'Percentages', url: 'percentages', image: '/percentages.jpeg', description: 'Understand how to calculate percentages effectively.',content:"The percentage is a mathematical term that represents a part of a whole. It is often denoted by the symbol % and is calculated by dividing the part by the whole and multiplying the result by 100.*For example, if you have 20 apples out of a total of 100 apples, the percentage of apples you have is calculated as follows:*(20 apples / 100 apples) * 100 = 20%*This means that 20% of the total apples are in your possession.*Percentages are used in various fields, *including:*Finance: To calculate interest rates, returns on investments, and discounts.*Statistics: To describe the distribution of data and to measure the variability of a dataset.*Science: To express measurements, concentrations, and probabilities.*Everyday life: To calculate tips, discounts, and sales tax." },
    { id: 2, title: 'Ratios and Proportions', url: 'ratios-proportions', image: '/ratios.jpeg', description: 'Master the concept of ratios and proportions.' ,content:"nnn"},
    { id: 3, title: 'Averages', url: 'averages', image: '/avg.png', description: 'Learn how to calculate averages in various scenarios.',content:"nnn" },
    { id: 4, title: 'Time and Work', url: 'time-work', image: '/time.jpeg', description: 'Solve problems related to time and work.',content:"nnn" },
    { id: 5, title: 'Speed and Distance', url: 'speed-distance', image: '/speed.png', description: 'Calculate speed, distance, and time effectively.' ,content:"nnn"}
  ];
  localStorage.setItem("question",JSON.stringify(questions))
  const arr=JSON.parse(localStorage.getItem("question"))
  console.log(arr)


  return (
    <div >
      <Navb />

      <Container fluid className="px-3 questions-section">
       
        
        <div className="horizontal-scroll">
          <Row className="gx-4">
            {questions.map((question) => (
              <Col xs={5} sm={3} md={4} lg={3} key={question.id} className="mb-4">
                <Link to={`/aptitude/${question.url}`} style={{ textDecoration: 'none' }}>
                  <Card className="h-100">
                    <Card.Body style={{ backgroundColor: "#E6E6FA" }}>
                      <Card.Img variant="top" src={question.image} className="img" />
                      <Card.Title>{question.title}</Card.Title>
                      <Card.Text style={{ color: "inherit" }}>
                        {question.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <div className="scroll-indicator">
            &rarr; {/* Arrow symbol for scroll indication */}
          </div>
        </div>
      </Container>
     <div style={{marginTop:"-80px"}} >
     <AptitudeQuestions/>
     </div>
      <Footer />
    </div>
  );
};

export default Aptitude;
