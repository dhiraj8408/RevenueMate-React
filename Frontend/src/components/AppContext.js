import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AppContext = createContext();

// Define the provider component
export const AppProvider = ({ children }) => {
  // Initialize isAuthenticated from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  // Initialize mode from localStorage or default to 'light'
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('mode') || 'light';
  });

  // Initialize userid from localStorage or default to 0
  const [userid, setId] = useState(() => {
    return localStorage.getItem('userid') || 0;
  });

  // Function to toggle between light and dark modes
  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', newMode); // Update localStorage
      return newMode;
    });
  };

  // Update localStorage when isAuthenticated changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  // Update localStorage when userid changes
  useEffect(() => {
    localStorage.setItem('userid', userid);
  }, [userid]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        mode,
        toggleMode,
        userid,
        setId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
