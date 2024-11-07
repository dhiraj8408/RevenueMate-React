import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import homepageImage from '../images/homepageimage.png'; // Adjust the image path if needed
import '../styles/main_content.css'

const MainContent = () => {
  const {mode} = useContext(AppContext);
  return (
    <main style={{ backgroundColor: mode=='dark' ? '#000000' : '#fff', color: mode=='dark'? '#e0e0e0' : '#000' }}>
      <div className="card" style={{ backgroundColor: mode=='dark' ? '#161a1d' : '#fff', color: mode=='dark'? '#e0e0e0' : '#000' }}>
        <div className="homepagetext">
          <h1>Worried about your business finances?</h1>
          <h1>Welcome to Revenue Mate, your one-stop solution!</h1>
          <h2>Streamline Your Sales, Simplify Your Success</h2>
        </div>
      </div>
      <div className="homepageimage">
        <img src={homepageImage} alt="Homepage Image" />
      </div>
    </main>
  );
};

export default MainContent;

