import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import MainBg from "../assets/main_bg.png"
import axios from 'axios';
import HOST_URL from '../config';
import Register from './Register';
import Login from './Login';

const Home = () => {

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
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>

            {
                isLoggedIn ?
                    <div className="d-flex justify-content-around" style={{ width: '100%' }}>
                        <Container className="d-flex justify-content-center align-items-center" style={{ width: "65%" }}>
                            <div style={{ flex: '70%', borderRadius: "15px", paddingRight: '0px', paddingLeft: '0px' }}>
                                <img src={MainBg} alt="Lab" style={{ borderRadius: "15px", width: '100%', height: 'auto' }} />
                            </div>
                        </Container>

                        <Container className="d-flex justify-content-center align-items-center" style={{ width: "35%" }}>
                            <div style={{ flex: '30%', paddingLeft: '20px', width: "100%" }}>
                                <Card style={{ padding: '20px', borderRadius: '15px', backgroundColor: '#f8f9fa', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                                    <Card.Body>
                                        <h2 className="text-center mb-4">Make an Appointment</h2>
                                        <Form>
                                            <Form.Group controlId="formAge">
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control type="number" placeholder="Enter your age" />
                                            </Form.Group>
                                            <Form.Group controlId="formGender">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter your name" />
                                            </Form.Group>
                                            <Form.Group controlId="formTestType">
                                                <Form.Label>Test Type</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Blood Test</option>
                                                    <option>Urine Test</option>
                                                    <option>X-Ray</option>
                                                    {/* Add more options as needed */}
                                                </Form.Control>
                                            </Form.Group>
                                            <Button variant="" type="submit" className="w-100 mt-3 text-white" style={{ backgroundColor: "#07a888" }}>Make Appointment</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Container>

                    </div>

                    :
                    <div className="d-flex justify-content-around" style={{ width: '100%' }}>
                        <Container className="d-flex justify-content-center align-items-center" style={{ width: "65%" }}>
                            {/* <div style={{ flex: '70%', borderRadius: "15px", paddingRight: '0px', paddingLeft: '0px' }}> */}
                                <img src={MainBg} alt="Lab" style={{ borderRadius: "15px", width: '100%', height: 'auto' }} />
                            {/* </div> */}
                        </Container>
                        <Login style={{ width: "100%" }} />

                    </div>

            }
        </Container>
    );
};

export default Home;
