import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HOST_URL from './config';

function NavigationBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkAuth()
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            // API request
            await axios.get(`${HOST_URL}api/check-login`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then(response => {
                if (response) {
                    setIsLoggedIn(true)
                }

            })
        } catch (error) {
            console.log(error)
            setIsLoggedIn(false)
        }
    }

    return (
        // <Navbar bg="dark" variant="dark" expand="lg">
        //     <Container>
        //         <Navbar.Brand href="#">ABC Laboratories</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="me-auto">
        //                 <Nav.Link href="#home">Appointments</Nav.Link>
        //                 <Nav.Link href="#features">Features</Nav.Link>
        //                 <Nav.Link href="#pricing">Pricing</Nav.Link>
        //             </Nav>
        //             <Nav>
        //                 <Nav.Link href="#login">Login</Nav.Link>
        //                 <Nav.Link href="#signup">Sign Up</Nav.Link>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#171717"}}>
            <div className="container">
                <Link className="navbar-brand text-white" to="/">ABC Laboratories</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    !isLoggedIn ?
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/register">Register</Link>
                            </li>
                        </ul>
                        : null
                }

                {
                    isLoggedIn &&
                    <div className="ms-auto">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/appointments">Appointments</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/payments">Payments</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/reports">Reports</Link>
                            </li>
                        </ul>
                    </div>
                }

            </div>
        </nav>
    );
}

export default NavigationBar;