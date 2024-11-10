import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import '../styles/deleteInventory.css';

const DeleteInventory = (props) => {
  const {userid,mode} = useContext(AppContext);
  console.log("id",userid);
  console.log("itemName",props.item);

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/revenueMate/v1/merchant/home', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: userid
          }),
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data);
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, [userid,props.item]); // Add userid as a dependency to re-fetch items if the ID changes

  // Handle checkbox selection
  const handleCheckboxChange = (itemName) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemName)) {
        return prevSelected.filter((name) => name !== itemName);
      } else {
        return [...prevSelected, itemName];
      }
    });
  };

  // Handle delete action
  const handleDelete = async () => {
    if (selectedItems.length === 0) {
      alert('Please select items to delete.');
      return;
    }

    // Remove deleted items from state
    setItems((prevItems) =>
      prevItems.filter((item) => !selectedItems.includes(item.itemname)) // Use the correct property name
    );

    console.log(selectedItems);
    
    try {
      const response = await fetch('http://localhost:5000/revenueMate/v1/inventory/removeInventory', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id:userid,
          itemname:selectedItems[0]
         }), // Sending the selected item names
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Items deleted successfully'); // Inform user of successful deletion
    } catch (error) {
      console.error('Error deleting items:', error);
    }

    setSelectedItems([]); // Clear selected items
  };

  return (
    <div className="delete-inventory-container" style={{ backgroundColor: mode === 'dark' ? '#000' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
      <h2 className="delete-inventory-title">Item List</h2>
      <div className="delete-inventory-table-container">
        <table className="delete-inventory-table" style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#e0e0e0' : '#000' }}>
          <thead>
            <tr className="delete-inventory-table-header">
              <th>Select</th>
              <th>Item Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="delete-inventory-table-row">
                <td>
                  <input
                    type="checkbox"
                    className="delete-inventory-checkbox"
                    checked={selectedItems.includes(item.itemname)} // Reflect selected state
                    onChange={() => handleCheckboxChange(item.itemname)} // Use item.itemname
                  />
                </td>
                <td className="delete-inventory-item-name">{item.itemname}</td>
                <td className="delete-inventory-item-price">{item.price}</td> {/* Display the actual price */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="delete-inventory-button" onClick={handleDelete}>
        Delete Selected
      </button>
    </div>
  );
};

export default DeleteInventory;