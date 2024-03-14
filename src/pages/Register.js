import React, { Fragment, useEffect } from 'react'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Register() {



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
                <Form className='col-6 border rounded p-4'>
                    <h2 className="text-center mb-4">Registration</h2>
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
            </div>
        </Fragment>
    );

}