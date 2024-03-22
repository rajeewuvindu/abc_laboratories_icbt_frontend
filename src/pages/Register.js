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


export default function Register() {

    const [isLoading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [Gender, setGender] = useState("");

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setLoading(true)

        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let street_code = document.getElementById('street_code').value
        let street = document.getElementById('street').value
        let city = document.getElementById('city').value
        let postal_code = document.getElementById('postal_code').value
        let phone = document.getElementById('phone').value
        let gender = ''

        if (Gender == "male") {
            gender = "Male"
        }
        if (Gender == "female") {
            gender = "Female"
        }
        axios.post(`${HOST_URL}api/register`, {
            // axios.post(`http://127.0.0.1:8000/api/register`, {
            name: name,
            email: email,
            street_code: street_code,
            street: street,
            city: city,
            postal_code: postal_code,
            contact_number: phone,
            gender: gender,
        })
            .then(response => {
                // Save token to local storage
                // alert("hri")
                setLoading(false)

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.user);


                if (response.status == 201) {
                    setAlertMessage({ type: "success", text: 'Registered Successfully ...!', color: 'green' });
                    alert("Registered Successfully")
                    navigate('/appointments');
                    // window.location.reload('/appointments')

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
                alert("Failed to Register ", error.response.data.error)
                // alert("Failed to Sign up")
            });
        // setErrors(Validation(values))
    };

    function handleOnGenderChange(e) {
        setGender(e.target.value)
    }
    return (
        // <Fragment>

        //     <div className="d-flex justify-content-center border mt-5">
        //         <div className='h1'>
        //             REGISTER
        //         </div>
        //         <Form className='col-6'>
        //             <Form.Group className="mb-3 col-12" controlId="exampleForm.ControlInput1">
        //                 <Form.Label>Email address</Form.Label>
        //                 <Form.Control type="email" placeholder="name@example.com" />
        //             </Form.Group>
        //             <Form.Group className="mb-3 col-12" controlId="exampleForm.ControlInput2">
        //                 <Form.Label>Email address</Form.Label>
        //                 <Form.Control type="email" placeholder="name@example.com" />
        //             </Form.Group>
        //         </Form>
        //     </div>
        // </Fragment>

        <Fragment>
            {/* <h2 className="text-center">Registration</h2>
            <div className="d-flex justify-content-center border mt-5">
                <Form className='col-6'>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="streetCode">
                        <Form.Label>Street Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter street code" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="street">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" placeholder="Enter street" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter city" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter postal code" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="contactNumber">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="tel" placeholder="Enter contact number" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <div>
                            <Form.Check inline label="Male" type="radio" name="gender" id="male" />
                            <Form.Check inline label="Female" type="radio" name="gender" id="female" />
                            <Form.Check inline label="Other" type="radio" name="gender" id="other" />
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div> */}
            <div className="d-flex justify-content-center mt-5">

                <form className='col-6 border rounded p-4' onSubmit={handleFormSubmit}>

                    <input type="hidden" name="_token" value="{{ csrf_token() }}" />

                    <h2 className="text-center mb-4">Registration</h2>
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
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id='name' placeholder="Enter your name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" id='email' placeholder="Enter email" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="streetCode">
                        <Form.Label>Street Code</Form.Label>
                        <Form.Control type="text" id='street_code' placeholder="Enter street code" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="street">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" id='street' placeholder="Enter street" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" id='city' placeholder="Enter city" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" id='postal_code' placeholder="Enter postal code" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="contactNumber">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="tel" id='phone' placeholder="Enter contact number" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <div>
                            <Form.Check inline label="Male" type="radio" name="gender" id="male" value="male"  onChange={handleOnGenderChange} />
                            <Form.Check inline label="Female" type="radio" name="gender" id="female" value="female"  onChange={handleOnGenderChange} />
                            {/* <Form.Check inline label="Other" type="radio" name="gender" id="other" /> */}
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
                            <input type='submit' className='btn text-white col-12 mt-3' style={{ backgroundColor: "#07a888" }} value={"Register"} />
                        </div>
                        // <div>
                        //     <button className="fluid ui blue basic button">Log in</button>
                        // </div>
                    )}


                    {/* <input type='submit' className='btn btn-primary' /> */}
                </form>
            </div>
        </Fragment>
    );

}