import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import HOST_URL from '../config';

import '../pages/reports.css'; // Import custom CSS for styling

function Reports() {
    // const [reports, setReports] = useState([
    //     { id: 1, title: 'Report 1', url: 'https://example.com/report1.pdf' },
    //     { id: 2, title: 'Report 2', url: 'https://example.com/report2.pdf' },
    //     // Add more reports as needed
    // ]);

    const [Reports, setReports] = useState([]);
    const [isLoading, setLoading] = useState(false);

    // Function to open report in a new tab
    const openReport = (url) => {
        window.open(url, '_blank');
    };

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        if (isMounted) {
            getUserReports()
        }
        return () => {
            isMounted = false
        };
    }, [])


    async function getUserReports() {

        try {
            const token = localStorage.getItem('token');
            // API request
            await axios.get(`${HOST_URL}api/reports`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then(response => {
                // let hh = response.data
                console.log(response.data)
                setReports(response.data);
                setLoading(false);

            })
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Container style={{ minHeight: '100%' }}>
            <div className="reports-container">
                <Container className='d-flex justify-content-center align-items-center mt-5 mb-5'>
                    <h1 className="title">Reports</h1>
                </Container>
                <Table striped bordered hover responsive style={{ borderRadius: "15px", borderCollapse: 'separate', borderSpacing: '0 15px', marginTop: '20px', backgroundColor: "#E2EFF0" }} data-height="500" data-pagination={true} data-search={true}>
                    <thead>
                        <tr>
                            <th className='text-center'>Appointment ID</th>
                            <th className='text-center'>File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Reports.map(report => (
                            <tr key={report.id}>
                                <td className='text-center'>{report.appointment_id}</td>
                                <td className='text-center'>
                                    <Button variant="primary" onClick={() => openReport(report.file)}>Open Report</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default Reports;
