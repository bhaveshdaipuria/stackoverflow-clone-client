import React from 'react';
import './OTPAlert.css'

function OTPAlert({alertContent}) {
  return (
    <div className='alert-container'>
      <p className='alert-content'>
        {alertContent}
      </p>
    </div>
  )
}

export default OTPAlert;
