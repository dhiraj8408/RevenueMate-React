import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import '../styles/merchentOptions.css';

export default function MerchentOptions() {
  const {mode} = useContext(AppContext);
  return (
    <div className='options'  >
      <div className="menu-options"  style={{ backgroundColor: mode=='dark' ? '#343a40' : '#fff', color: mode=='dark'? '#e0e0e0' : '#000' }}>
        <ul>
          <li><Link to="/merchent/transactions">Record Transaction</Link></li>
          <li><Link to="/merchent/expenses">Record Expenses</Link></li>
          <li><Link to="/merchent/inventory">Manage Inventory</Link></li>
        </ul>
      </div>
    </div>
  );
}
