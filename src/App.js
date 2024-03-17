import React, { Fragment } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import NavigationBar from './NavBar';
import Appointments from './pages/Appointments';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Home from './pages/Home';

function App() {
  return (

    <>
      <BrowserRouter>
      <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </>


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
