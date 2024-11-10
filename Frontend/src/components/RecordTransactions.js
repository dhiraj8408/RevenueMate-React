import React, { useState, useEffect,useContext} from 'react';
import Navbar from './Navbar';
import MerchentOptions from './MerchentOptions';
import AlertComp from './AlertComp';
import { AppContext } from './AppContext';
import '../styles/recordTransactions.css';

export default function RecordTransactions(props) {
  const [items, setItems] = useState([]);
  const [itemsBought, setItemsBought] = useState([]);
  const [selectedItem, setSelectedItem] = useState('NONE');
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [paymentMode, setPaymentMode] = useState('CASH');
  const [totalAmount, setTotalAmount] = useState(0);
  const [status, setStatus] = useState(false);
  const { mode, toggleMode, userid, isAuthenticated } = useContext(AppContext);

  // Function to fetch items from the endpoint with the ID
  const fetchItems = async () => {
    try {
      const response = await fetch('https://revenuemate-backend.onrender.com/revenueMate/v1/merchant/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userid }), // Send ID in the request body
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setItems(data); // Assuming the API returns an array of items
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Fetch items when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to handle adding the selected item to itemsBought
  const handleAddItem = () => {
    if (selectedItem !== 'NONE' && quantity && Number(quantity) > 0) {
      const selectedItemData = items.find(item => item.itemname === selectedItem); // Adjust if your item structure is different
      const price = selectedItemData.price || 0; // Adjust accordingly
      setItemsBought([...itemsBought, { item: selectedItem, quantity: Number(quantity), price: price }]);
      setQuantity(''); // Clear the quantity field after adding the item
      setSelectedItem('NONE'); // Reset the selected item
    } else if (selectedItem === 'NONE') {
      alert('Please select an item to proceed.');
    } else {
      alert('Please enter a valid quantity');
    }
  };

  // Update total amount dynamically
  useEffect(() => {
    const total = itemsBought.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalAmount(total);
  }, [itemsBought]);

  // Concatenate items function
  const concat_items = () => {
    return itemsBought.map(item => item.item).join('+'); // Join the item names with '+'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://revenuemate-backend.onrender.com/revenueMate/v1/merchant/recordSale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: userid,
          customername: name,
          amount: totalAmount,
          items: concat_items(),
          payment: paymentMode,
        }), 
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setStatus(true);
      handleTransactClear(); // Clear the transaction form after submission
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  const handleClear = () => {
    setQuantity('');
  };

  const handleTransactClear = () => {
    setName('');
    setPaymentMode('CASH');
    setTotalAmount(0);
    setItemsBought([]);
  };

  return (
    <div className='main' style={{ backgroundColor: mode === 'dark' ? '#000000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
      <Navbar />
      <MerchentOptions  />
      <div className="record-transactions-container" style={{ backgroundColor: mode === 'dark' ? '#000000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
        <div className="form-container" style={{ backgroundColor: mode === 'dark' ? '#000000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
          <label htmlFor="items" className="label-items">
            <p className="label-text">Select Item to add:</p>
          </label>
          <select
            name="items"
            id="items"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="select-items"
            style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}
          >
            <option value="NONE" style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>NONE</option>
            {items.map((item, index) => (
              <option key={index} value={item.itemname} className="select-option">
                {item.itemname}
              </option>
            ))}
          </select>

          <label htmlFor="quantity" className="label-quantity">
            <p className="label-text">Quantity:</p>
          </label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            placeholder="Quantity"
            min="1"
            className="input-quantity"
            style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}
          />

          <button type="button" className="button-submit" onClick={handleAddItem}>
            Add
          </button>
          <button type="button" className="button-clear" onClick={handleClear}>
            Clear
          </button>
        </div>
        <div className="items-bought-container">
          <h3 className="items-bought-title">Items Bought:</h3>
          <table className="items-bought-table">
            <thead>
              <tr>
                <th className="table-header">Product Name</th>
                <th className="table-header">Quantity</th>
                <th className="table-header">Price</th>
              </tr>
            </thead>
            <tbody>
              {itemsBought.map((item, index) => (
                <tr key={index}>
                  <td className="table-data">{item.item}</td>
                  <td className="table-data">{item.quantity}</td>
                  <td className="table-data">₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="transactioncontainer" style={{ backgroundColor: mode === 'dark' ? '#000000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
          <form onSubmit={handleSubmit} className="transaction-form" style={{ backgroundColor: mode === 'dark' ? '#000000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
            <input
              name="name"
              type="text"
              placeholder="Customer Name"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}
            />
            <label htmlFor="nature" className="label-payment-mode">
              <p className="label-text">Payment Mode:</p>
            </label>
            <select
              name="payment"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="select-payment-mode"
              style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}
            >
              <option value="CASH">CASH</option>
              <option value="CARD">CARD</option>
              <option value="UPI">UPI</option>
            </select>
            <div className="total-amount-container">
              <h4 className="total-amount-label">Total Amount: ₹{totalAmount}</h4>
            </div>
            <button type="submit" className="button-submit">
              Record Transaction
            </button>
          </form>
          {status && <AlertComp message="Transaction successful !"/>}
        </div>
      </div>
    </div>
  );
}
