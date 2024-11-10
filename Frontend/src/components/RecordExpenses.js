import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import { AppContext } from './AppContext'; // Corrected import
import MerchentOptions from './MerchentOptions';
import '../styles/recordExpenses.css';

export default function RecordExpenses(props) {
  const [vendorName, setVendorName] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [paymentMode, setPaymentMode] = useState('CASH');
  const [status, setStatus] = useState('');

  const { mode, toggleMode, userid, isAuthenticated } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that amount is a number
    if (isNaN(amount)) {
      setStatus('Please enter a valid number for the amount.');
      return;
    }

    try {
      const response = await fetch('https://revenuemate-backend.onrender.com/revenueMate/v1/merchant/recordExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:userid,
          vendorname: vendorName,
          amount,
          reason,
          payment: paymentMode,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setVendorName('');
      setAmount('');
      setReason('');
      setPaymentMode('CASH');
      setStatus('Transaction successfully submitted!');
    } catch (error) {
      console.error('Error recording expense:', error);
      setStatus('Transaction failed. Please try again.');
    }
  };

  return (
    <div className="main" style={{ backgroundColor: mode === 'dark' ? '#000000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
      <Navbar />
      <MerchentOptions  />
      <div className="expense-form-container" style={{ backgroundColor: mode === 'dark' ? '#000000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
        <form onSubmit={handleSubmit} className="expense-form">
          <input
            name="name"
            type="text"
            placeholder="Vendor Name"
            required
            id="vendor-name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="input-field"
            style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}
          />
          <input
            name="amount"
            type="text"
            placeholder="Enter Amount"
            required
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
            style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}
          />
          <input
            name="reason"
            type="text"
            placeholder="Reason Of Expenses"
            required
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input-field"
            style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}
          />
          <label htmlFor="nature" className="label-text" style={{ color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
            Mode of Payment:
          </label>
          <select
            name="nature"
            id="nature"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="select-field"
            style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}
          >
            <option value="CASH">Cash</option>
            <option value="CARD">Card</option>
            <option value="UPI">UPI</option>
          </select>
          <button id="transact" type="submit" className="transact-button">
            Transact
          </button>
        </form>
        <p className="transaction-status" style={{ color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
          Previous Transaction Status: {status}
        </p>
      </div>
    </div>
  );
}
