import React, { Fragment, useEffect } from 'react'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import HOST_URL from '../config';
export default function Register() {


    const handleFormSubmit = (event) => {
        event.preventDefault();

        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let street_code = document.getElementById('street_code').value
        let street = document.getElementById('street').value
        let city = document.getElementById('city').value
        let postal_code = document.getElementById('postal_code').value
        let phone = document.getElementById('phone').value
        let male = document.getElementById('male').value
        let female = document.getElementById('female').value
        let gender = ''

        if (male) {
            gender = "Male"
        }
        if (female) {
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
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.user);

                localStorage.setItem('isLoggedIn', JSON.stringify(true));

                if (response.status == 201) {
                    alert("Registered Successfully")

                    // history.push('/');
                    window.location.reload('/appointments')

                } else {
                    // console.log
                    // alert("Failed to Signup")
                    window.location.reload('/register')
                }
                // console.log(response)
                // localStorage.setItem('token', );
            })
            .catch(error => {
                console.log(error.response.data.error);
                alert("Failed to Register ", error.response.data.error)
                // alert("Failed to Sign up")
            });
        // setErrors(Validation(values))
    };


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
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id='name' placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" id='email' placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="streetCode">
                        <Form.Label>Street Code</Form.Label>
                        <Form.Control type="text" id='street_code' placeholder="Enter street code" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="street">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" id='street' placeholder="Enter street" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" id='city' placeholder="Enter city" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" id='postal_code' placeholder="Enter postal code" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="contactNumber">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="tel" id='phone' placeholder="Enter contact number" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <div>
                            <Form.Check inline label="Male" type="radio" name="gender" id="male" />
                            <Form.Check inline label="Female" type="radio" name="gender" id="female" />
                            {/* <Form.Check inline label="Other" type="radio" name="gender" id="other" /> */}
                        </div>
                    </Form.Group>
                    {/* <Button variant="primary" type="submit">
                        Submit
                    </Button> */}

                    <input type='submit' className='btn btn-primary' />
                </form>
            </div>
        </Fragment>
    );

}