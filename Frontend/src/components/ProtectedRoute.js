import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AppContext);

  // Check if the user is authenticated
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
