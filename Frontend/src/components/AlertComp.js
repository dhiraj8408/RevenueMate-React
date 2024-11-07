import React, { useState, useEffect } from 'react';
import '../styles/AlertComp.css'; // Import the CSS for styling

export default function AlertComp(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the alert after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div className='modal'>
        <div className='msg'>
          <p>{props.message}</p>
        </div>
      </div>
    )
  );
}
