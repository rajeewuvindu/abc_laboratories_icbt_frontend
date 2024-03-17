import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import MainBg from "../assets/main_bg.png"
import axios from 'axios';
import HOST_URL from '../config';
import Register from './Register';
import Login from './Login';

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [TestTypes, setTestTypes] = useState([]);
    const [TestType, setTestType] = useState("");
    const [Gender, setGender] = useState("");

    useEffect(() => {
        checkAuth()
        getTestTypes()
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
    const getTestTypes = async () => {
        try {
            const token = localStorage.getItem('token');
            // API request
            await axios.get(`${HOST_URL}api/test-types`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then(response => {
                if (response) {
                    setTestTypes(response.data)
                }

            })
        } catch (error) {
            console.log(error)
            // setIsLoggedIn(false)
        }
    }

    function handleOnGenderChange(event) {
        setGender(event.target.value)
    }

    function handleOnTestTypeChange(event) {
        setTestType(event.target.value)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        let name = document.getElementById('name').value
        let age = document.getElementById('age').value
        axios.post(`${HOST_URL}api/add-appointment`, {
            // axios.post(`http://127.0.0.1:8000/api/register`, {
            name: name,
            gender: Gender,
            test_type_id: TestType,
            age: age,
        }, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(response => {
                if (response.status == 201) {
                    alert(response.data.message)
                    name.value = ""
                    age.value = ""
                    setGender("")
                    setTestType("")
                } else {
                    // console.log
                    // alert("Failed to Signup")
                    // window.location.reload('/register')
                }
                // console.log(response)
                // localStorage.setItem('token', );
            })
            .catch(error => {
                console.log(error.response.data.error);
                alert("Failed to Add Appointment ", error.response.data.error)
                // alert("Failed to Sign up")
            });
        // setErrors(Validation(values))
    };

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
                                        <form onSubmit={handleFormSubmit}>
                                            <Form.Group controlId="formAge">
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control type="number" id='age' placeholder="Enter your age" />
                                            </Form.Group>
                                            <Form.Group controlId="formGender">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Control as="select" id='gender' onChange={handleOnGenderChange}>
                                                    <option value={"Male"}>Male</option>
                                                    <option value={"Female"}>Female</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" id='name' placeholder="Enter your name" />
                                            </Form.Group>
                                            <Form.Group controlId="formTestType">
                                                <Form.Label>Test Type</Form.Label>
                                                <Form.Control as="select" id='test_type' onChange={handleOnTestTypeChange}>
                                                    {TestTypes.map(type => (
                                                        <option key={type.id} value={type.id}>{type.test_type}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                            {/* <input type='submit' className='btn text-white' style={{ backgroundColor: "#07a888" }} value={"Make Appointment"}/> */}

                                            <Button variant="" type="submit" className="w-100 mt-3 text-white" style={{ backgroundColor: "#07a888" }}>Make Appointment</Button>
                                        </form>
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
