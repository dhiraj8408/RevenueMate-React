// src/components/Login.js
import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import {AppContext} from './AppContext'
import AlertComp from './AlertComp';
import '../styles/login.css';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const navigate = useNavigate();
  const { mode, toggleMode, isAuthenticated,setIsAuthenticated,setId} = useContext(AppContext);


  useEffect(() => {
    let timer;
    if (showAlert) {
      // Set a timer to hide the alert after 2 seconds and then navigate
      timer = setTimeout(() => {
        setShowAlert(false); // Hide alert after 2 seconds
        navigate('/merchent'); // Redirect to MerchentHome after the alert is hidden
      }, 1000); // Duration can be adjusted as needed
    }

    // Cleanup function to clear the timer when the component unmounts or showAlert changes
    return () => clearTimeout(timer);
  }, [showAlert, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (email && password) {
      try {
        const response = await fetch('https://revenuemate-backend.onrender.com/revenueMate/v1/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error if the response is not ok
        }
  
        const data = await response.json(); // Parse the response data
        console.log('Login successful:', data);
        setIsAuthenticated(true); // Set authenticated state
        localStorage.setItem('isAuthenticated', 'true'); // Store as string
        setId(data.id); // Set user ID in App component 
        localStorage.setItem('userid', data.id); // Store user ID in local storage
        setShowAlert(true); // Show alert on successful login
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.'); // Simple error handling
      }
    } else {
      alert('Invalid credentials'); // Simple error handling
    }
  };

  return (
    <>
      <Navbar />
      <div className="page" style={{ backgroundColor: mode === 'dark' ? '#000000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
        <div className="register" style={{ backgroundColor: mode === 'dark' ? '#161a1d' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
          <div className="registerform">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className='formlogin'>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: mode === 'dark' ? '#000000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: mode === 'dark' ? '#000000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}
              />
              <button type="submit" id="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
      {showAlert && <AlertComp message="You have logged in successfully!" />} {/* Display the alert */}
    </>
  );
};

export default Login;
