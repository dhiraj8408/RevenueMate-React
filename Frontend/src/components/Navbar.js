import React, { useCallback, useContext, useState } from 'react'; // Import useState for managing toggle state
import logo from './../images/logo.png'; // Adjust the image path if needed
import { AppContext } from './AppContext';
import '../styles/header.css';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; // Using react-icons for sun and moon icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the mobile menu is open
  const {mode,toggleMode,isAuthenticated} = useContext(AppContext);
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close state
  };
  
  const renderLinks = () => (
    <>
      <li><Link to={isAuthenticated ? "/merchent/transactions" : "/"}>Home</Link></li>
      <li><Link to={isAuthenticated ? "/merchent/profile" : "/signup"}>{isAuthenticated ? "Profile" : "Signup"}</Link></li>
      <li><Link to={isAuthenticated ? "/merchent/logout" : "/login"}>{isAuthenticated ? "Logout" : "Login"}</Link></li>
    </>
  );

  return (
    <header>
      <nav>
        <div className='div1'>
          <div className="logo-container">
            <img src={logo} alt="Revenue Mate Logo" className="logo" />
            <span className="brand-name">Revenue Mate</span>
          </div>
          <div className='mobile_btns'>
            <button 
              onClick={toggleMode} 
              className="toggle-button" 
              aria-label="Toggle dark/light mode"
            >
              {mode === 'light' ? <FaMoon /> : <FaSun />}
            </button>
            <button 
              className="menu-toggle" 
              onClick={toggleMenu} 
              aria-label="Toggle mobile menu"
            >
              ☰
            </button>
          </div>
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li>
              <button 
                onClick={toggleMode} 
                className="toggle-button" 
                aria-label="Toggle dark/light mode"
              >
                {mode === 'light' ? <FaMoon /> : <FaSun />}
              </button>
            </li>
            {renderLinks()}
          </ul>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile_menus">
          <ul>
            {renderLinks()}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
