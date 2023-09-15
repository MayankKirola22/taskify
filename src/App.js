import { Routes, Route,Navigate} from 'react-router-dom';
import Home from './Screens/Home';
import Nav from './Components/Nav';
import Login from './Screens/Login';
import './App.css';
import Signup from './Screens/Signup';
import { getByID, getbyUserId } from './Utility/db';
import { useEffect, useState } from 'react';
import Task from './Screens/Task';
import { AddTask } from './Screens/AddTask';
import { UpdateTask } from './Screens/UpdateTask';
import ResetPassword from './Screens/ResetPassword';

export default function App() {
  let [user,setUser]=useState(0);
  let [tasks,setTasks]=useState(0);
  useEffect(()=>{
    getByID('Users',localStorage.getItem('isLoggedIn')).then((value)=>{
      setUser(value)
    })
    getbyUserId(localStorage.getItem('isLoggedIn')).then((value)=>{
      setTasks(value)
    })
  },[])
  return (
    <div className="App">
      <div>
      <Nav user={user}/>
      {localStorage.getItem('isLoggedIn')!=='false' && localStorage.getItem('isLoggedIn')!==null?
        <Routes>
          <Route path="/" element={<Home user={user} tasks={tasks}/>}/>
          <Route path='/AddTask' element={<AddTask user={user} />}/>
          <Route path='/UpdateTask/:id' element={<UpdateTask tasks={tasks}/>} />
          <Route path='/task/:id' element={<Task user={user} tasks={tasks}/>}/>
          <Route path='/*' element={<Navigate to='/'/>}/>
        </Routes>:
        <Routes>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/ResetPassword' element={<ResetPassword/>}/>
          <Route path='/*' element={<Navigate to='/Login'/>}/>
        </Routes>
        }  
      </div>
    </div>
  );
}
