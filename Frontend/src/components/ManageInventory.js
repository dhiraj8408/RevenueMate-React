import React, { useContext, useState } from 'react';
import '../styles/manageInventory.css';
import MerchentOptions from './MerchentOptions';
import DeleteInventory from './DeleteInventory';
import { AppContext } from './AppContext';
import Navbar from './Navbar';

export default function ManageInventory(props) {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const {mode,isAuthenticated,userid,toggleMode} = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://revenuemate-backend.onrender.com/revenueMate/v1/inventory/addInventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:userid,
          itemname:itemName,
          price:price
        }
        ),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        setItemName(''); // Clear the form fields after successful submission
        setPrice('');
         // Refresh the page
      window.location.reload();
      } else {
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className='main' style={{ backgroundColor: mode==='dark' ? '#000' : '#fff', color: mode==='dark'? '#e0e0e0' : '#000' }}>
        <Navbar />
        <MerchentOptions />
        <div className="manage-inventory-container" style={{ backgroundColor: mode==='dark' ? '#000' : '#fff', color: mode==='dark'? '#e0e0e0' : '#000' }}>
        <form onSubmit={handleSubmit} className="manage-inventory-form">
            <div className="form-group">
            <label htmlFor="itemName" className="form-label">Item Name:</label>
            <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className="form-input"
                style={{ backgroundColor: mode==='dark' ? '#333' : '#fff', color: mode==='dark'? '#e0e0e0' : '#000' }}
            />
            </div>
            <div className="form-group">
            <label htmlFor="price" className="form-label">Price:</label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="form-input"
                style={{ backgroundColor: mode==='dark' ? '#333' : '#fff', color: mode==='dark'? '#e0e0e0' : '#000' }}
            />
            </div>
            <button type="submit" className="form-button">Add to Inventory</button>
        </form>
        </div>

       <div className='delInv' style={{ backgroundColor: mode==='dark' ? '#000' : '#fff', color: mode==='dark'? '#e0e0e0' : '#000' }}>
            <DeleteInventory/>
       </div>
        
    </div>
  );
}
