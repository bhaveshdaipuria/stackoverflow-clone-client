import React, {useState} from 'react';
import './ChatOTP.css'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import OTPAlert from './OTPAlert';

function ChatOTP() {

  const navigate = useNavigate();

  const User = useSelector((state)=>state.currentUserReducer);

  const [enteredOTP, setEnteredOTP] = useState();

  const [alertMessage, setAlertMessage] = useState('Generate Your OTP before using Chatbot');

  const onChange = (e)=>{
    setEnteredOTP(e.target.value);
  }


  const sendOTP = async()=>{
    if(User){
      setAlertMessage('Generating your OTP....')
      const response = await fetch('https://stackoverflow-clone-server-v61p.onrender.com/chatbot/chatotp', {
       method: "POST",
       headers: {
        'Content-Type': 'application/json'
       },
       body: JSON.stringify({clientMail: JSON.parse(localStorage.getItem('Profile')).result.email, 
                             user: JSON.parse(localStorage.getItem('Profile')).result._id})
      })
     const json = await response.json();
     if(json.success){
      setAlertMessage('Check your email for OTP');
     }else{
      setAlertMessage('Some error occured. Please try again');
     }
    }else{
      alert('Login Before Using Chatbot');
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(User){
      const response = await fetch('https://stackoverflow-clone-server-v61p.onrender.com/chatbot/verifyotp', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({enteredOTP: enteredOTP, user: JSON.parse(localStorage.getItem('Profile')).result._id})
    })
    const json = await response.json();
    if(json.success){
      setAlertMessage('OTP Matched Successfully.');
      setTimeout(() => {
        navigate('/Chatbot')
      }, 3000);
    }else{
      setAlertMessage('Wrong OTP Entered. Please Try Again.');
    }
    }else{
      alert('Login Before Using Chatbot');
    }
  }

  return (
    <>
    <OTPAlert alertContent={alertMessage}/>
    <div className='otp-container'>
    <div className='otp-second-container'>
    <input type="submit" value='Generate OTP' className='otp-generate-button' onClick={sendOTP}/>
    <form onSubmit={handleSubmit}>
    <label htmlFor="">Enter  OTP: </label>
    <input type="number" className='otp-input' onChange={onChange}/>
    <div className='otp-submit-container'>
    <input type="submit" value='Submit OTP' className='otp-submit-button'/>
    </div>
    </form>
    </div>
    </div>
    </>
  )
}

export default ChatOTP;
