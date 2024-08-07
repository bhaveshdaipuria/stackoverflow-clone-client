import React, { useState } from "react";
import "./ChatOTP.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import OTPAlert from "./OTPAlert";

function ChatOTP() {
  const navigate = useNavigate();

  const User = useSelector((state) => state.currentUserReducer);

  const [enteredOTP, setEnteredOTP] = useState();

  const [alertMessage, setAlertMessage] = useState(
    "Generate Your OTP before using Chatbot"
  );

  const onChange = (e) => {
    setEnteredOTP(e.target.value);
  };

  const sendOTP = async () => {
    if (User) {
      setAlertMessage("Please Wait...");
      const response = await fetch(
        "https://stackoverflow-clone-server-gds6.onrender.com/chatbot/chatotp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientMail: JSON.parse(localStorage.getItem("Profile")).result
              .email,
            user: JSON.parse(localStorage.getItem("Profile")).result._id,
          }),
        }
      );
      const json = await response.json();
      console.log(json);

      if (json.success) {
        setAlertMessage("Check your email for OTP");
      } else {
        setAlertMessage("Some error occured. Please try again");
      }
    } else {
      alert("Login Before Using Chatbot");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (User) {
      const response = await fetch(
        "https://stackoverflow-clone-server-gds6.onrender.com/chatbot/verifyotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enteredOTP: enteredOTP,
            user: JSON.parse(localStorage.getItem("Profile")).result._id,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        setAlertMessage("OTP Matched Successfully.");
        setTimeout(() => {
          navigate("/Chatbot");
        }, 3000);
      } else {
        setAlertMessage("Wrong OTP Entered. Please Try Again.");
      }
    } else {
      alert("Login Before Using Chatbot");
    }
  };

  return (
    <>
      <OTPAlert alertContent={alertMessage}></OTPAlert>
      <section className="auth-section">
        <div className="auth-container-2">
          <button
            type="submit"
            className="otp-generate-button"
            onClick={sendOTP}
          >
            Generate
          </button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="otp">
              <h4>Enter OTP</h4>
              <input type="number" name="otp" id="otp" onChange={onChange} />
            </label>
            <button type="submit" className="auth-btn">
              Validate
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ChatOTP;
