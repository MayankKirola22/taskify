import React, { useState } from "react";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Utility/firebase";
import "./Login.css";
import styles from '../Components/InputControl.module.css';
import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/Button";

export default function ResetPassword() {
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.email.value) {
      setErrorMsg("Enter Email");
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    sendPasswordResetEmail(auth, e.target.email.value)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate('/Login');
        window.location.reload(); 
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };  

  return (
    <div id='Login' className="Screen">
        <div className={styles.innerBox} id="outerform">
          <h1 className={styles.heading}>Reset Password</h1>
          <form className="loginform" onSubmit={handleSubmit}>
            <div className={styles.container} id='section'>
                <label>Email</label>
                <input type="email" required id='email' placeholder='Enter Email Address' />
            </div>
              <div className={styles.footer} id='footer'>
                <b className={styles.error} id='loginError'>{errorMsg}</b>
                <Button>Send Link</Button>
            </div>
          </form>
          
        </div>
      </div>
  );
}