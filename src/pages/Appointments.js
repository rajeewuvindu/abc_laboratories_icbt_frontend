import React, { useState, useEffect } from 'react';
import { Card, Table, Modal, Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';

import HOST_URL from '../config';

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
        event.preventDefault();

        let card_number = document.getElementById('card_number').value
        let expiry_date = document.getElementById('expiry_date').value
        let cvv = document.getElementById('cvv').value
        let selected_appointment_id = document.getElementById('selected_appointment_id').value
        let selected_appointment_price = document.getElementById('selected_appointment_price').value

        console.log(card_number, "card_number")
        console.log(expiry_date, "expiry_date")
        console.log(cvv, "cvv")
        console.log(selected_appointment_id, "selected_appointment_id")
        console.log(selected_appointment_price, "selected_appointment_price")

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
            // console.log(response)
            if (response.status == 200) {
                alert(response.data.message)

                // alert("Payment Done Successfully")

                // history.push('/');
                // window.location.reload('/appointments')

            } else {
                // console.log
                // alert("Failed to Signup")
                // window.location.reload('/appointments')
            }
            // console.log(response)
            // localStorage.setItem('token', );
        })
            .catch(error => {
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
        if (appointment.status != "paid") {
            setSelectedAppointment(appointment);
            setShowModal(!showModal);
        }

    };

    const handleModalClose = (state) => {
        setShowModal(!showModal);
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
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }}>Date</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }}>Time</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }}>Status</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }}>Test Type</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }}>Doctor</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Appointments.map(appointment => (
                            <tr key={appointment.id} onClick={() => handleModal(appointment)} style={{height: '93.4px'}}>
                                {
                                    appointment.date ? <td>{appointment.date}</td> : <td>Not Assigned</td>
                                }

                                {
                                    appointment.time ? <td>{appointment.time}</td> : <td>Not Assigned</td>
                                }

                                <td>{appointment.status}</td>
                                <td>{appointment.test_type.test_type}</td>

                                {
                                    appointment.doctor ? <td>{appointment.doctor.name}</td> : <td>Not Given</td>
                                }

                                {
                                    appointment.price ? <td>{appointment.price}</td> : <td>Not Given</td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal for showing appointment details */}
                <Modal show={showModal} onHide={handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Appointment Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedAppointment && (
                            <div>
                                <p><strong>Date:</strong> {selectedAppointment.date}</p>
                                <p><strong>Time:</strong> {selectedAppointment.time}</p>
                                <p><strong>Doctor:</strong> {selectedAppointment.doctor.name}</p>
                                <p><strong>Price:</strong> {selectedAppointment.price}</p>
                                <input type='hidden' id='selected_appointment_id' value={selectedAppointment.id} />
                                <input type='hidden' id='selected_appointment_price' value={selectedAppointment.price} />
                            </div>
                        )}
                        <form onSubmit={handleOnFormSubmit}>

                            <Form.Group controlId="cardNumber">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control type="text" id='card_number' placeholder="Enter card number" />
                            </Form.Group>
                            <Form.Group controlId="expiryDate">
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control type="text" id='expiry_date' placeholder="MM/YY" />
                            </Form.Group>
                            <Form.Group controlId="cvv">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control type="text" id='cvv' placeholder="CVV" />
                            </Form.Group>
                            <input type='submit' className='btn btn-primary' />

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
