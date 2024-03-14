import React, { Fragment, useEffect, useState } from "react";
import { Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {

    return (

        // <Fragment>

        //     <div className="container mt-5">
        //         <div className="row justify-content-center">
        //             <div className="col-md-6">
        //                 <Form className='border rounded p-4'>
        //                     <h2 className="text-center mb-4">Login</h2>
        //                     <div className="text-center mb-3">
        //                         <p className="mb-0">Please insert the Patient ID received in your email after registration.</p>
        //                     </div>
        //                     <Form.Group className="mb-3" controlId="patientId">
        //                         <Form.Label>Patient ID</Form.Label>
        //                         <Form.Control type="text" placeholder="Enter Patient ID" />
        //                     </Form.Group>
        //                     <div className="d-grid">
        //                         <Button variant="primary" type="submit">
        //                             Submit
        //                         </Button>
        //                     </div>
        //                 </Form>
        //             </div>
        //         </div>
        //     </div>

        // </Fragment>

        <Fragment>
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="row col-12 d-flex justify-content-center">
                    <div className="col-md-6">
                        <Form className='border rounded p-4'>
                            <h2 className="text-center mb-4">Login</h2>
                            <div className="text-center mb-3">
                                <p className="mb-0">Please insert the Patient ID received in your email after registration.</p>
                            </div>
                            <Form.Group className="mb-3" controlId="patientId">
                                <Form.Label>Patient ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter Patient ID" />
                            </Form.Group>
                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}