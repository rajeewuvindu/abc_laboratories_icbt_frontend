import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Table } from 'react-bootstrap';
import '../pages/payment.css'; // Import custom CSS for styling
import axios from 'axios';
import HOST_URL from '../config';

function Payments() {
    // const [Payments, setPayments] = useState([
    //     { id: 1, date: '2024-03-15', amount: 50 },
    //     { id: 2, date: '2024-03-20', amount: 75 },
    //     // Add more payments as needed
    // ]);
    const [Payments, setPayments] = useState([]);
    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        if (isMounted) {
            getUserPayments()
        }
        return () => {
            isMounted = false
        };
    }, [])


    async function getUserPayments() {

        try {
            const token = localStorage.getItem('token');
            // API request
            await axios.get(`${HOST_URL}api/payments`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then(response => {
                // let hh = response.data
                console.log(response.data)
                setPayments(response.data);
                setLoading(false);

            })
        } catch (error) {
            console.log(error)
        }

    }

    const openInvoice = (url) => {
        window.open(url, '_blank');
    };

    return (
        <Container style={{ minHeight: '100%' }}>
            <div className="payments-container">
                <Container className='d-flex justify-content-center align-items-center mt-5 mb-5'>
                    <h1 className="title">Payments</h1>
                </Container>
                <Table striped bordered hover responsive style={{ borderRadius: "15px", borderCollapse: 'separate', borderSpacing: '0 15px', marginTop: '20px', backgroundColor: "#E2EFF0" }} data-height="500" data-pagination={true} data-search={true}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Appointment ID</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Test Type</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Amount</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Payment Date</th>
                            <th style={{ backgroundColor: '#E2EFF0', color: '#fffff' }} className='text-center'>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Payments.map(payment => (
                            <tr key={payment.id} style={{ height: '93.4px' }}>
                                <td className='text-center'>{payment.appointment_id}</td>
                                <td className='text-center'>{payment.test_type}</td>
                                <td className='text-center'>{payment.amount}</td>
                                <td className='text-center'>{new Date(payment.created_at).toLocaleString()}</td>
                                <td className='text-center'>
                                    <Button variant="primary" onClick={() => openInvoice(payment.invoice_file)}>Open Report</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default Payments;
