import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import MainBg from "../assets/main_bg.png"
import axios from 'axios';
import HOST_URL from '../config';
import Register from './Register';
import Login from './Login';
import { Oval } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const Home = () => {
    const [isLoading, setLoading] = useState(false);
    const [isLoginLoading, setLoginLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [TestTypes, setTestTypes] = useState([]);
    const [User, setUser] = useState({});
    const [TestType, setTestType] = useState("");
    const [Gender, setGender] = useState("");

    useEffect(() => {
        checkAuth()
        getTestTypes()
        getUser()
    }, []);

    const checkAuth = async () => {
        setLoginLoading(true)
        try {
            const token = localStorage.getItem('token');
            // API request
            await axios.get(`${HOST_URL}api/check-login`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then(response => {
                setLoginLoading(false)
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

    const getUser = async () => {
        try {
            const token = localStorage.getItem('token');
            // API request
            await axios.get(`${HOST_URL}api/user`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then(response => {
                console.log("response", response)
                if (response) {
                    setUser(response.data)
                }

            })
        } catch (error) {
            console.log(error)
            // setIsLoggedIn(false)
        }
    }


    function handleOnTestTypeChange(event) {
        setTestType(event.target.value)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        const token = localStorage.getItem('token');
        if (TestType == "" || TestType == null || TestType == "choose") {
            setAlertMessage({ type: "warning", text: 'Please Choose a Test Type.', color: 'orange' });
            setLoading(false)
            return null;
        }
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
                setLoading(false)
                if (response.status == 201) {
                    setAlertMessage({ type: "success", text: 'Appointment Added Successfully ...!', color: 'green' });
                    // alert(response.data.message)
                    // name.value = ""
                    // age.value = ""
                    // setGender("")
                    // setTestType("")
                } else {
                    // console.log
                    // alert("Failed to Signup")
                    // window.location.reload('/register')
                }
                // console.log(response)
                // localStorage.setItem('token', );
            })
            .catch(error => {
                setLoading(false)
                console.log(error.response.data.error);
                setAlertMessage({ type: "error", text: error.response.data.error, color: 'red' });
                alert("Failed to Add Appointment ", error.response.data.error)
                // alert("Failed to Sign up")
            });
        // setErrors(Validation(values))
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>

            {
                isLoginLoading ?
                    <div className="spinner" style={{
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Oval
                            height={40}
                            width={40}
                            color="#4fa94d"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#4fa94d"
                            strokeWidth={2}
                            strokeWidthSecondary={2}

                        />
                    </div>
                    :
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
                                            {
                                                alertMessage && (
                                                    <p style={{ color: alertMessage.color }}>
                                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                                            <Alert severity={alertMessage.type}>{alertMessage.text}</Alert>
                                                        </Stack>
                                                    </p>
                                                )
                                            }
                                            <form onSubmit={handleFormSubmit}>
                                                <Form.Group controlId="formGender">
                                                    <Form.Group controlId="formName">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control type="text" id='name' placeholder="Enter your name" value={User.name} disabled />
                                                    </Form.Group>
                                                    <Form.Label>Gender</Form.Label>
                                                    {/* <Form.Control as="select" id='gender' onChange={handleOnGenderChange}>
                                                    <option value={"Male"}>Male</option>
                                                    <option value={"Female"}>Female</option>
                                                </Form.Control> */}
                                                    <Form.Control type="text" id='gender' placeholder="Gender" value={User.gender} disabled />
                                                </Form.Group>

                                                <Form.Group controlId="formAge">
                                                    <Form.Label>Age</Form.Label>
                                                    <Form.Control type="number" id='age' placeholder="Enter your age" required />
                                                </Form.Group>
                                                <Form.Group controlId="formTestType">
                                                    <Form.Label>Test Type</Form.Label>
                                                    <Form.Control as="select" id='test_type' onChange={handleOnTestTypeChange} required>
                                                        <option value="choose">Choose ...</option>
                                                        {TestTypes.map(type => (
                                                            <option key={type.id} value={type.id}>{type.test_type}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>

                                                {isLoading ? (
                                                    <div className="spinner" style={{
                                                        marginBottom: "20px",
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}>
                                                        <Oval
                                                            height={40}
                                                            width={40}
                                                            color="#4fa94d"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                            visible={true}
                                                            ariaLabel='oval-loading'
                                                            secondaryColor="#4fa94d"
                                                            strokeWidth={2}
                                                            strokeWidthSecondary={2}

                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="d-grid">
                                                        <input type='submit' className='btn text-white col-12 mt-3' style={{ backgroundColor: "#07a888" }} value={"Make Appointment"} />
                                                    </div>
                                                )}


                                                {/* <Button variant="" type="submit" className="w-100 mt-3 text-white" style={{ backgroundColor: "#07a888" }}>Make Appointment</Button> */}
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
