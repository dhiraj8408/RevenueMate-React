import React, { useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import AlertComp from './AlertComp'; // Import your alert component

const Logout = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const {mode,isAuthenticated,id,toggleMode,setIsAuthenticated} = useContext(AppContext);


  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Send a POST request to log out
        const response = await fetch('https://revenuemate-backend.onrender.com/revenueMate/v1/logout', {
          method: 'POST', // Changed to POST as requested
          headers: {
            'Content-Type': 'application/json', // Set content type if necessary
          },
          credentials: 'include',
        });

        if (response.ok) {
          // Logout successful
          const data = await response.json(); // Parse the response as JSON
          console.log('Logout successful:', data);

          // Clear the authentication status
          setIsAuthenticated(false);
          localStorage.removeItem('isAuthenticated');

          // Show success alert
          setAlertMessage('You have logged out successfully!');
          setShowAlert(true);

          // Redirect to the login page after a 500ms delay
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        } else {
          // Handle logout failure
          console.error('Logout failed:', response.statusText);
          setAlertMessage('Logout failed. Please try again.');
          setShowAlert(true);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Logout failed:', error);
        setAlertMessage('An error occurred. Please try again later.');
        setShowAlert(true);
      }
    };

    logoutUser(); // Call the logout function
  }, [navigate, setIsAuthenticated]);

  return (
    <>
      {showAlert && <AlertComp message={alertMessage} />} {/* Display the alert */}
    </>
  );
};

export default Logout;
