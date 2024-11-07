import React, { useState, useEffect,useContext} from 'react';
import Navbar from './Navbar';
import { AppContext } from './AppContext';
import '../styles/profile.css';

const Profile = () => {
  // console.log('props:', props);
  const [creditScore, setCreditScore] = useState(0);
  const [debitScore, setDebitScore] = useState(0);
  const [items, setItems] = useState([]); // State to hold items after fetching
  const [filterType, setFilterType] = useState('NONE');
  const [filterMode, setFilterMode] = useState('NONE');
  
  const {mode,isAuthenticated,userid,toggleMode} = useContext(AppContext);


  // Sample initial items (optional; you can initialize from API response)
  useEffect(() => {
    const initialItems = [
      // (Your items here)
    ];
    
    let totalCredit = 0;
    let totalDebit = 0;

    initialItems.forEach((item) => {
      if (item.type === 'credit') {
        totalCredit += parseFloat(item.amount);
      } else if (item.type === 'debit') {
        totalDebit += parseFloat(item.amount);
      }
    });

    setCreditScore(totalCredit);
    setDebitScore(totalDebit);
    setItems(initialItems); // Set initial items
  }, []); // Initial load

  // Calculate total scores
  useEffect(() => {
    let totalCredit = 0;
    let totalDebit = 0;

    items.forEach((item) => {
      if (item.type === 'credit') {
        totalCredit += parseFloat(item.amount);
      } else if (item.type === 'debit') {
        totalDebit += parseFloat(item.amount);
      }
    });

    setCreditScore(totalCredit);
    setDebitScore(totalDebit);
  }, [items]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log(userid)
    // Make POST request
    try {
      const response = await fetch('http://localhost:5000/revenueMate/v1/profile/filterTransactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:userid,
          type: filterType,
          nature: filterMode,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      setItems(result); // Set items from the response
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  
  return (
    <div className='main' style={{ backgroundColor: mode=='dark' ? '#000' : '#fff', color: mode=='dark'? '#e0e0e0' : '#000' }}>
      <Navbar heading1="Home" heading2="Profile" heading3="Logout" mode={mode} toggleMode={toggleMode} isAuthenticated={isAuthenticated} />
      <form onSubmit={handleSubmit} className='formprofile' style={{ backgroundColor: mode=='dark' ? '#000' : '#fff', color: mode=='dark'? '#e0e0e0' : '#000' }}>
        <label htmlFor="type">Filter By Type of Transaction: </label>
        <select
          name="type"
          id="type"
          onChange={(e) => setFilterType(e.target.value)}
          style={{ backgroundColor: mode=='dark' ? '#333' : '#fff', color: mode=='dark'? '#e0e0e0' : '#000' }}
        >
          <option value="NONE">None</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select >
        <label htmlFor="nature">Filter By Mode of Payment: </label>
        <select
          name="nature"
          id="nature"
          onChange={(e) => setFilterMode(e.target.value)}
          style={{ backgroundColor: mode=='dark' ? '#333' : '#fff', color: mode=='dark'? '#e0e0e0' : '#000' }}
        >
          <option value="NONE">None</option>
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
          <option value="UPI">UPI</option>
        </select>
        <button type="submit">Filter</button>
      </form>
        
      <div className='display_total'>
        <p>Total credit Score: {creditScore}</p>
        <p>Total debit Score: {debitScore}</p>
        <p>Total Net: {creditScore - debitScore}</p>
      </div>
      <div className="displayArea">
        <table className="table"  id={`table-container ${mode === 'dark' ? 'dark-mode' : ''}`} >
          <thead>
            <tr>
              <th>Date of Transaction</th>
              <th>Nature</th>
              <th>Amount</th>
              <th>Mode of Payment</th>
            </tr>
          </thead>
          <tbody>
            {items.map((ele, index) => (
              <tr key={index}
              style={{
                backgroundColor: index % 2 === 0 ? (mode === 'dark' ? '#333' : '#ebe7e7') : 'transparent',
              }}>
                <td>{ele.date}</td>
                <td>{ele.type}</td>
                <td>{ele.amount}</td>
                <td>{ele.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
