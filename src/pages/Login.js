import React, { Fragment, useEffect, useState } from "react";
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import HOST_URL from '../config';
import { Oval } from 'react-loader-spinner'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Login({onLoginSuccess}) {

    const [isLoading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        let patient_id = document.getElementById('patient_id').value
        axios.post(`${HOST_URL}api/login`, {
            patient_id: patient_id,
        })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.user_id);

                navigate('/appointments');

                if (response.status == 201) {
                    setAlertMessage({ type: "success", text: 'Logged in Successfully ...!', color: 'green' });
                    onLoginSuccess(true)
                    // alert("Logged in Successfully")
                    setLoading(false);

                    // history.push('/');
                    // window.location.reload('/appointments')

                } else {
                    onLoginSuccess(false)
                    // setLoading(false);
                    // setAlertMessage({ type: "success", text: 'Failed to Login.', color: 'red' });
                    // alert("Failed to Login")
                    // window.location.reload('/login')
                }
            })
            .catch(error => {
                console.log(error.response.data);
                onLoginSuccess(false)
                if (error.response.status === 401) {
                    setLoading(false);
                    setAlertMessage({ type: "error", text: error.response.data.error, color: 'red' });
                    // alert("Invalid Username or Password")
                }
                else {
                    setLoading(false);
                    setAlertMessage({ type: "error", text: error.response.data.error, color: 'red' });
                    // alert("Failed to Login")
                }
            });
        // setErrors(Validation(values))
    };

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
                        {
                            alertMessage && (
                                <p style={{ color: alertMessage.color }}>
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity={alertMessage.type}>{alertMessage.text}</Alert>
                                    </Stack>
                                </p>
                            )
                        }
                        <form className='border rounded p-4' onSubmit={handleFormSubmit}>
                            <h2 className="text-center mb-4">Login</h2>
                            <div className="text-center mb-3">
                                <p className="mb-0">Please insert the Patient ID received in your email after registration.</p>
                            </div>
                            <Form.Group className="mb-3" controlId="patientId">
                                {/* <Form.Label>Patient ID</Form.Label> */}
                                <Form.Control type="text" id="patient_id" placeholder="Enter Patient ID" required />
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
                                    {/* <Button variant="primary" type="submit">
                                        Submit
                                    </Button> */}
                                    <input type='submit' className='btn text-white col-12 mt-3' style={{ backgroundColor: "#07a888" }} value={"Login"} />

                                </div>
                                // <div>
                                //     <button className="fluid ui blue basic button">Log in</button>
                                // </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}