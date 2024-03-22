import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Route, Router, Routes, Navigate } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import NavigationBar from './NavBar';
import Appointments from './pages/Appointments';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Home from './pages/Home';
import Profile from './pages/Profile';
import axios from 'axios';
import HOST_URL from './config';

function App() {



  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth()
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      // API request
      await axios.get(`${HOST_URL}api/check-login`, {
        headers: { 'Authorization': `Bearer ${token}` },
      }).then(response => {
        if (response) {
          setIsLoggedIn(true)
        }

      })
    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
    }
  }
  function handleOnLoginSuccess(state) {
    setIsLoggedIn(state)
  }

  return (

    <>
      <BrowserRouter>
        <NavigationBar loggedIn={isLoggedIn}/>
        {isLoggedIn && (
          < Routes >
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLoginSuccess={handleOnLoginSuccess} />} />
            <Route path="/" element={<Home />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        )
        }

        {
          !isLoggedIn &&
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLoginSuccess={handleOnLoginSuccess} />} />
            <Route path="/" element={<Home />} />

            <Route path="/appointments" element={<Navigate to="/login" replace />} />
            <Route path="/payments" element={<Navigate to="/login" replace />} />
            <Route path="/reports" element={<Navigate to="/login" replace />} />
            <Route path="/profile" element={<Navigate to="/login" replace />} />

          </Routes>
        }

      </BrowserRouter >
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
