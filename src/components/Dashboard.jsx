import React from 'react';
import Navb from './Navb';
import Footer from './Footer';
import { Container,Button } from 'react-bootstrap';
import '../css/dashboard.css'; // Import custom CSS for additional styling
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate=useNavigate()
    const user = JSON.parse(localStorage.getItem("user"));
    const logOut=()=>{
        localStorage.clear()
        navigate("/")
    }

    return (
        <div>
            <Navb />
            <Container className="text-center mt-5">
                <div className="user-profile">
                    <div className="user-image">
                        <img src="/user.png" alt="user" className="img-fluid" />
                    </div>
                    <h3 className="user-name">{user.user.username}</h3>
                </div>
                <Button className="btn-danger" onClick={logOut}>logout</Button>
            </Container>
            <Footer />
        </div>
    );
};

export default Dashboard;
