import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import HOST_URL from '../config';
import { Oval } from 'react-loader-spinner';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function Profile() {

    const [isPageLoading, setPageLoading] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [User, setUser] = useState({});

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [StreetCode, setStreetCode] = useState('');
    const [Street, setStreet] = useState('');
    const [City, setCity] = useState('');
    const [PostalCode, setPostalCode] = useState('');
    const [Contact, setContact] = useState('');
    const [Gender, setGender] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        try {
            const token = localStorage.getItem('token');
            setPageLoading(true)
            // API request
            await axios.get(`${HOST_URL}api/user`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then(response => {
                console.log("response", response)
                if (response) {
                    setUser(response.data)
                    setName(response.data.name)
                    setEmail(response.data.email)
                    setStreetCode(response.data.street_code)
                    setStreet(response.data.street)
                    setCity(response.data.city)
                    setContact(response.data.contact_number)
                    setPostalCode(response.data.postal_code)


                    if (response.data.gender == "Male") {
                        setGender("male")
                    }
                    else {
                        setGender("female")
                    }

                    setPageLoading(false)
                }
                setPageLoading(false)
            })
        } catch (error) {
            console.log(error)
            // setIsLoggedIn(false)
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        let gender = ""
        if (Gender == "male") {
            gender = "Male"
        }
        if (Gender == "female") {
            gender = "Female"
        }

        const token = localStorage.getItem('token');
        axios.post(`${HOST_URL}api/update-profile`, {
            id: User.id,
            name: Name,
            email: Email,
            street_code: StreetCode,
            street: Street,
            city: City,
            postal_code: PostalCode,
            contact_number: Contact,
            gender: gender,
        }, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(response => {
                setLoading(false)

                if (response.status == 200) {
                    setAlertMessage({ type: "success", text: response.data.message, color: 'green' });
                    // window.location.reload('/appointments')

                } else {
                    setAlertMessage({ type: "warning", text: response.data.message, color: 'green' });
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
                if (error.response.data.error) {
                    setAlertMessage({ type: "error", text: error.response.data.error, color: 'red' });
                }
                else {
                    setAlertMessage({ type: "error", text: error.response.data.message, color: 'red' });
                }
                // alert("Failed to Register ", error.response.data.error)
                // alert("Failed to Sign up")
            });
        // setErrors(Validation(values))
    };

    function handleOnNameChange(e) {
        setName(e.target.value)
    }

    function handleOnEmailChange(e) {
        setEmail(e.target.value)
    }

    function handleOnStreetCodeChange(e) {
        setStreetCode(e.target.value)
    }

    function handleOnStreetChange(e) {
        setStreet(e.target.value)
    }


    function handleOnCityChange(e) {
        setCity(e.target.value)
    }

    function handleOnPostalCodeChange(e) {
        setPostalCode(e.target.value)
    }

    function handleOnContactChange(e) {
        setContact(e.target.value)
    }

    function handleOnGenderChange(e) {
        setGender(e.target.value)
    }



    return (
        <Fragment>
            <div className="d-flex justify-content-center mt-5">

                {isPageLoading ? (
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner" style={{
                            marginBottom: "20px",
                        }}>
                            <Oval
                                height={40}
                                width={40}
                                color="#4fa94d"
                                secondaryColor="#4fa94d"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </div>
                    </div>

                ) : (
                    <form className='col-6 border rounded p-4' onSubmit={handleFormSubmit}>

                        <input type="hidden" name="_token" value="{{ csrf_token() }}" />

                        <h2 className="text-center mb-4">Profile</h2>
                        {
                            alertMessage && (
                                <p style={{ color: alertMessage.color }}>
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity={alertMessage.type}>{alertMessage.text}</Alert>
                                    </Stack>
                                </p>
                            )
                        }
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>PATIENT ID</Form.Label>
                            <input className='form-control' type="text" id='name' placeholder="Patient ID" value={User.patient_id} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" id='name' placeholder="Enter your name" value={Name} required onChange={handleOnNameChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" id='email' placeholder="Enter email" required value={Email} onChange={handleOnEmailChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="streetCode">
                            <Form.Label>Street Code</Form.Label>
                            <Form.Control type="text" id='street_code' placeholder="Enter street code" required value={StreetCode} onChange={handleOnStreetCodeChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="street">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" id='street' placeholder="Enter street" required value={Street} onChange={handleOnStreetChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" id='city' placeholder="Enter city" required value={City} onChange={handleOnCityChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control type="text" id='postal_code' placeholder="Enter postal code" required value={PostalCode} onChange={handleOnPostalCodeChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="contactNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="tel" id='phone' placeholder="Enter contact number" required value={Contact} onChange={handleOnContactChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <div>
                                <Form.Check inline label="Male" type="radio" name="gender" id="male" value="male" checked={Gender === "male"} onChange={handleOnGenderChange} />

                                <Form.Check inline label="Female" type="radio" name="gender" id="female" value="female" checked={Gender === "female"} onChange={handleOnGenderChange} />
                            </div>
                        </Form.Group>
                        {/* <Button variant="primary" type="submit">
                            Submit
                        </Button> */}

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
                                <input type='submit' className='btn text-white col-12 mt-3' style={{ backgroundColor: "#07a888" }} value={"Save Changes"} />
                            </div>
                            // <div>
                            //     <button className="fluid ui blue basic button">Log in</button>
                            // </div>
                        )}


                        {/* <input type='submit' className='btn btn-primary' /> */}
                    </form>
                )}

            </div>
        </Fragment>
    );

}