import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Utility/firebase";
import "./Login.css";
import styles from '../Components/InputControl.module.css';
import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/Button";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.email.value || !e.target.pass.value) {
      setErrorMsg("Fill all fields");
    }
    setErrorMsg("");
    signInWithEmailAndPassword(auth, e.target.email.value, e.target.pass.value)
      .then(async (res) => {
        localStorage.setItem('isLoggedIn',res.user.uid)
        window.location.reload(); 
        navigate('/');
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };  

  return (
    <div id='Login' className="Screen">
        <div className={styles.innerBox} id="outerform">
          <h1 className={styles.heading}>Login</h1>
          <form className="loginform" onSubmit={handleSubmit}>
            <div className={styles.container} id='section'>
                <label>Email</label>
                <input required type="email" id='email' placeholder='Enter Email Address' />
            </div>
            <div className={styles.container} id='section'>
                <label>Password</label>
                <input required type="password" id='pass' placeholder='Enter Password' />
                <Link to='/ResetPassword' id="forgot">Forgot password?</Link>
            </div>
              <div className={styles.footer} id='footer'>
                <b className={styles.error} id='loginError'>{errorMsg}</b>
                <Button>Login</Button>
            </div>
            <div id='signUp'>Don't have an account? <Link to="/Signup" style={{'color':'black'}}>Sign Up</Link></div>
          </form>
          
        </div>
      </div>
  );
}