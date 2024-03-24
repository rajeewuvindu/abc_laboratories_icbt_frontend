import React, { useState, useEffect } from 'react';
import { Card, Table, Modal, Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';

import HOST_URL from '../config';
import { Oval } from 'react-loader-spinner';

function Appointments() {
    // Sample appointments data
    // const [Appointments, setAppointments] = useState([
    //     { id: 1, date: '2024-03-15', time: '10:00 AM', doctor: 'Dr. Smith' },
    //     { id: 2, date: '2024-03-20', time: '11:30 AM', doctor: 'Dr. Johnson' },
    //     // Add more appointments as needed
    // ]);
    const [Appointments, setAppointments] = useState([]);

    // State for modal
    const [isLoading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        if (isMounted) {
            getUserAppointments()
        }
        return () => {
            isMounted = false
        };
    }, [])

    function handleOnFormSubmit(event) {
        setLoading(true)
        event.preventDefault();

        let card_number = document.getElementById('card_number').value
        let expiry_date = document.getElementById('expiry_date').value
        let cvv = document.getElementById('cvv').value
        let selected_appointment_id = document.getElementById('selected_appointment_id').value
        let selected_appointment_price = document.getElementById('selected_appointment_price').value

        // console.log(card_number, "card_number")
        // console.log(expiry_date, "expiry_date")
        // console.log(cvv, "cvv")
        // console.log(selected_appointment_id, "selected_appointment_id")
        // console.log(selected_appointment_price, "selected_appointment_price")

        const token = localStorage.getItem('token');

        axios.post(`${HOST_URL}api/make-payment`, {
            "card_number": card_number,
            "expiry_date": expiry_date,
            "cvv": cvv,
            "id": selected_appointment_id,
            "price": selected_appointment_price
        }, {
            headers: { 'Authorization': `Bearer ${token}` },
        }).then(response => {
            setLoading(false)
            // console.log(response)
            if (response.status == 200) {
                alert(response.data.message)
                setShowModal(false)
                // alert("Payment Done Successfully")

                // history.push('/');
                window.location.reload('/appointments')

            } else {
                // console.log
                // alert("Failed to Signup")
                // window.location.reload('/appointments')
            }
            // console.log(response)
            // localStorage.setItem('token', );
        })
            .catch(error => {
                setLoading(false)
                console.log(error);
                // alert("Failed to Do Payment ", error.response.data.error)
                // alert("Failed to Sign up")
            });
    }


    async function getUserAppointments() {

        try {
            const token = localStorage.getItem('token');
            // API request
            await axios.get(`${HOST_URL}api/appointments`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then(response => {
                // let hh = response.data
                console.log(response.data)
                setAppointments(response.data);
                setLoading(false);

            })
        } catch (error) {
            console.log(error)
        }

    }
    // Function to handle modal show/hide
    const handleModal = (appointment) => {
        if (appointment.status != "paid" && appointment.doctor && appointment.price != null && appointment.price != '') {
            setSelectedAppointment(appointment);
            setShowModal(!showModal);
        }

    };

    const handleModalClose = (state) => {
        setShowModal(!showModal);
    };

    const convertTo12HourFormat = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const ampm = parseInt(hours, 10) < 12 ? 'AM' : 'PM';
        let formattedHours = parseInt(hours, 10) % 12;
        formattedHours = formattedHours === 0 ? 12 : formattedHours;
        return `${formattedHours}:${minutes} ${ampm}`;
    };

    return (
        <Container style={{ minHeight: '100%' }}>
            <div>
                <Container className='d-flex justify-content-center align-items-center mt-5 mb-5'>
                    <h1 className='text-green'>Appointments</h1>
                </Container>
                <Table striped bordered hover responsive style={{ borderRadius: "15px", borderCollapse: 'separate', borderSpacing: '0 15px', marginTop: '20px', backgroundColor: "#E2EFF0" }} data-height="500" data-pagination={true} data-search={true}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Date</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Time</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Status</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Test Type</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Doctor</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Price</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Requested Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Appointments.map(appointment => (
                            <tr key={appointment.id} onClick={() => handleModal(appointment)} style={{ height: '93.4px' }}>
                                {
                                    appointment.date ? <td>{new Date(appointment.date).toLocaleDateString()}</td> : <td>Not Assigned</td>
                                }

                                {
                                    appointment.time ? <td>{convertTo12HourFormat(appointment.time)}</td> : <td>Not Assigned</td>
                                }

                                <td className='text-center'>{appointment.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                                <td>{appointment.test_type.test_type}</td>

                                {
                                    appointment.doctor ? <td>{appointment.doctor.name}</td> : <td>Not Given</td>
                                }

                                {
                                    appointment.price ? <td>{appointment.price}</td> : <td>Not Given</td>
                                }

                                {
                                    appointment.created_at ? <td>{new Date(appointment.created_at).toLocaleString()}</td> : <td>Not Given</td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal for showing appointment details */}
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Appointment Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedAppointment && (
                            <div>
                                <p><strong>Date:</strong> {selectedAppointment.date}</p>
                                <p><strong>Time:</strong> {selectedAppointment.time}</p>
                                {
                                    selectedAppointment.doctor ? <p><strong>Doctor:</strong> {selectedAppointment.doctor.name}</p> : <p><strong>Doctor:</strong> Not Assigned Yet</p>

                                }
                                {
                                    selectedAppointment.price ? <p><strong>Price:</strong> {selectedAppointment.price}</p> : <p><strong>Price:</strong> Not Assigned Yet</p>
                                }

                                <input type='hidden' id='selected_appointment_id' value={selectedAppointment.id} />
                                {
                                    selectedAppointment.price ? <input type='hidden' id='selected_appointment_price' value={selectedAppointment.price} /> : null

                                }
                            </div>
                        )}
                        <hr></hr>
                        <form onSubmit={handleOnFormSubmit}>

                            <Form.Group controlId="cardNumber">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control type="text" id='card_number' placeholder="Enter card number" required/>
                            </Form.Group>
                            <Form.Group controlId="expiryDate">
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control type="date" id='expiry_date' placeholder="MM/YY" required/>
                            </Form.Group>
                            <Form.Group controlId="cvv">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control type="text" id='cvv' placeholder="CVV" required/>
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
                                    <input type='submit' className='btn text-white col-12 mt-3' style={{ backgroundColor: "#07a888" }} value={"Proceed"} />
                                </div>
                                // <div>
                                //     <button className="fluid ui blue basic button">Log in</button>
                                // </div>
                            )}

                            {/* <input type='submit' className='btn btn-primary' /> */}

                            {/* <Button variant="primary" type="submit">
                            Submit Payment
                        </Button> */}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    );
}

export default Appointments;
