import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Utility/firebase";
import styles from '../Components/InputControl.module.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addRecord } from "../Utility/db";
import './Signup.css';
import Button from "../Components/Button";

export default function Signup(){
    const [errorMsg, setErrorMsg] = useState("");
    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!e.target.email.value || !e.target.pass.value) {
          setErrorMsg("Fill all fields");
        }
        else if (e.target.pass.value!==e.target.rePass.value){
            setErrorMsg("Passwords at both places should be same.");
        }
        else{
            
            createUserWithEmailAndPassword(auth, e.target.email.value, e.target.pass.value)
                .then((userCredential) => {
                    const record={
                        Email : userCredential.user.reloadUserInfo.email,
                        Username : e.target.username.value,
                        Notification:[],
                    }
                    addRecord("Users",record,userCredential.user.reloadUserInfo.localId);
                    navigate("/login");
                    
                })
                .catch((err) => {
                    setErrorMsg(err.message);
                });
        }
    }
    return(
        <div id='Signup' className="Screen">
        <div className={styles.innerBox} id="outerform">
          <h1 className={styles.heading}>Sign Up</h1>
          <form className="loginform" onSubmit={handleSubmit}>
            <div className={styles.container} id='section'>
                <label>Email</label>
                <input type="email" required id='email' placeholder='Enter Email Address' />
            </div>
            <div className={styles.container} id='section'>
                <label>Username</label>
                <input type="text" required id='username' placeholder='Enter Username' />
            </div>
            <div className={styles.container} id='section'>
                <label>Password</label>
                <input required type="password" id='pass' placeholder='Enter Password' />
            </div>
            <div className={styles.container} id='section'>
                <label>Confirm Password</label>
                <input required type="password" id='rePass' placeholder='Re-enter Password' />
            </div>
              <div className={styles.footer} id='footer'>
                <b className={styles.error} id='loginError'>{errorMsg}</b>
                <Button>Sign Up</Button>
            </div>
            <div id='signUp'>Already have an account? <Link to="/Login" style={{'color':'black'}}>Login</Link></div>
          </form>
        </div>
      </div>
    )
}