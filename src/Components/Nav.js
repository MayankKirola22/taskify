import React from "react";
import { FaUserAlt,FaPlus,FaBell } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { updateRecord } from "../Utility/db";
import "./Nav.css";

const Nav = ({user}) => {
  const handleLogout=()=>{
    localStorage.setItem('isLoggedIn','false');
    window.location.reload();
  }
  const notifDelete=(id)=>{
    let record={
      Notifications:user.Notifications.filter((notif,index)=>index!==id)
    }
    updateRecord('Users',user.id,record);
  }
  return (
      <nav className="navbar bg-dark navbar-expand-lg fixed-top">
    
          <Link to='/' style={{textDecoration:'none',color:'black'}} ><h1 id="main-heading"><font id="toDo">Task</font>ify</h1></Link>
        <div className="collapse navbar-collapse" id="navbarNav">
        </div>  
            {localStorage.getItem('isLoggedIn')!=='false' && localStorage.getItem('isLoggedIn')!==null?
            <div id="options">
            <div>
              <ul className="navbar-nav options">
              <li className="nav-item active">
                <Link className="nav-link navIcon" to="/AddTask">
                  <FaPlus size={20}/>
                </Link>
              </li>
              <li className="nav-item">
              <div className="dropdown" id='notif'>
                <div type="button" className="navIcon" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaBell size={20}/>
                </div>
                <ul id="notifications" className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                {user!==0 && user.Notifications!==undefined &&user.Notifications.length!==0?user.Notifications.map((notif,id)=>(
                  <li key={id} ><div id="textlog" onClick={()=>notifDelete(id)}>{notif}</div></li>
                )):<div style={{textAlign:'center'}}>no notifications</div>}   
                </ul>
                </div>
              </li>
              <li className="nav-item">
              </li>
            </ul>
            </div>
            <div id="profile" className="profile">
              <div className="dropdown">
              <div type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {user.Username}
                <FaUserAlt id="FaUserAlt" size={20}/>
              </div>
              <ul id="logout" className="dropdown-menu" style={{marginTop: "8px", textAlign: "center", width: "50%" }} aria-labelledby="dropdownMenuButton1" >
              <li>
                <div id="textlog" style={{ marginBottom: "-2px" }} onClick={handleLogout}>Logout</div>
              </li>
            </ul>
          </div>
        </div></div>:null}
      </nav>
  );
};

export default Nav;
