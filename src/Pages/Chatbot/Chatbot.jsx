import React, { useState } from 'react';
import './Chatbot.css';
import ChatbotSpinner from './ChatbotSpinner';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function Chatbot() {

  const [botQuestion, setBotQuestion] = useState({chatbotQues: ""});

  const [chatResult, setChatResult] = useState();

  const [spinnerStatus, setSpinnerStatus] = useState();

  const User = useSelector((state)=>state.currentUserReducer);

  const handleSubmit = async(e)=>{
    setSpinnerStatus(true);
    e.preventDefault();
    if(User){
      console.log(User);
      setChatResult('');
      const {chatbotQues} = botQuestion;
      const response = await fetch('https://stackoverflow-clone-server-v61p.onrender.com:7001/chatbot/askchatbot', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({chatbotQues})
      });
      const json = await response.json();
      console.log(json.message);
      setChatResult(json.message);
      setSpinnerStatus(false);
    }else{
      setSpinnerStatus(false);
      setChatResult('');
      alert('Please login before using out chatbot');
    }
  }  

  const onChange = (e)=>{
    setBotQuestion({...botQuestion, [e.target.name]: e.target.value});
  }

  return (
    <>
    <div className="chatbot-question">
      <div className="ask-chatbot-container">
        <h1>Welcome to StackOverflow Chatbot</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-chatbotForm-container">
            <label htmlFor="ask-chatbot-title">
              <h4>Ask me anything</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                name='chatbotQues'
                type="text"
                id="ask-chatbot-title"
                placeholder="What do you want to know?"
                onChange={onChange}
              />
            </label>
          </div>
          <input
            type="submit"
            value="Get Result"
            className="chatbot-review-btn"
          />
        </form>
        <div className='ask-chatbotResult-container'>
        {spinnerStatus?<ChatbotSpinner/>:<p className='ask-chatbotResult-para'>{chatResult}</p>}
        </div>
      </div>
    </div>
    </>
  )
}

export default Chatbot;
