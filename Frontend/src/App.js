// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AppProvider } from './components/AppContext'; // Import the AppProvider
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import MerchentHome from './components/MerchentHome';
import Profile from './components/Profile';
import RecordExpenses from './components/RecordExpenses';
import ManageInventory from './components/ManageInventory';
import RecordTransactions from './components/RecordTransactions';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/merchent"
            element={<ProtectedRoute element={<MerchentHome />} />}
          />
          <Route
            path="/merchent/transactions"
            element={
              <ProtectedRoute element={<RecordTransactions />} />
            }
          />
          <Route
            path="/merchent/expenses"
            element={<ProtectedRoute element={<RecordExpenses />} />}
          />
          <Route
            path="/merchent/inventory"
            element={<ProtectedRoute element={<ManageInventory />} />}
          />
          <Route
            path="/merchent/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route path="/merchent/logout" element={<Logout />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
