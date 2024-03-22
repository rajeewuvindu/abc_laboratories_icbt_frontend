import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HOST_URL from './config';
import { useNavigate } from 'react-router-dom';

function NavigationBar({loggedIn}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth()
    }, [loggedIn]);

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
    const handleOnLogoutClicked = async () => {
        // alert("CICKE")
        try {
            const token = localStorage.getItem('token');
            // API request
            await axios.post(`${HOST_URL}api/logout`, {}, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then(response => {
                // alert(response.data.message)
                if (response) {
                    setIsLoggedIn(false)
                    localStorage.setItem('token', null);
                    localStorage.setItem('user', null);
                    navigate('/login');
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
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#171717" }}>
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
                        <ul className="navbar-nav d-flex">
                            <li className="nav-item btn_nav">
                                <Link className="nav-link text-white" to="/appointments">Appointments</Link>
                            </li>
                            <li className="nav-item btn_nav">
                                <Link className="nav-link text-white" to="/payments">Payments</Link>
                            </li>
                            <li className="nav-item btn_nav">
                                <Link className="nav-link text-white" to="/reports">Reports</Link>
                            </li>
                            <li className="nav-item btn_nav">
                                <Link className="nav-link text-white" to="/profile">Profile</Link>
                            </li>
                            
                            <div className='d-flex justify-content-center btn_nav'>
                                <button className="nav-link text-white btn-sm ms-auto" onClick={handleOnLogoutClicked}>Logout</button>
                            </div>

                            {/* <li className="nav-item d-flex justify-content-center">
                                <button className="btn btn-outline-light btn-sm" onClick={handleOnLogoutClicked}>Logout</button>
                            </li> */}
                        </ul>
                    </div>
                }

            </div>
        </nav>
    );
}

export default NavigationBar;