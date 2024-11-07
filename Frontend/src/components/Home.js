import React, { useContext } from 'react';
import Navbar from './Navbar';
import MainContent from './MainContent';
import { AppContext } from './AppContext'; // Make sure to use curly braces for named import

// import Footer from './components/Footer'; // Uncomment if you wish to add the footer

const Home = () => {
  const { mode, toggleMode, isAuthenticated } = useContext(AppContext);

  return (
    <div className={mode}> 
      <Navbar/>
      <MainContent />
    </div>
  );
};

export default Home;
