import React, { useContext } from 'react';
import Navbar from './Navbar';
import { AppContext } from './AppContext';
import MerchentOptions from './MerchentOptions';
// import Footer from './components/Footer'; // Uncomment if you wish to add the footer

const MerchentHome = () => {
   const {mode,toggleMode,isAuthenticated,userid} = useContext(AppContext);
   console.log(userid);
  return (
    <div className='main' style={{ height:'100vh' ,backgroundColor: mode=='dark' ? '#000000' : '#fff', color: mode=='dark'? '#e0e0e0' : '#000' }}>
      <Navbar/>
      <MerchentOptions />
    </div>
  );
};

export default MerchentHome;
