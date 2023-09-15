import styles from '../Components/InputControl.module.css';
import { useState } from 'react';
import './AddTask.css'
import { addRecord, getByID, updateRecord } from '../Utility/db';
import Button from '../Components/Button';
export function AddTask({user}){
    const [errorMsg, setErrorMsg] = useState("");
    const formatDate= (date) => {
        let newDate=date.slice(8,10)+'-'+date.slice(5,7)+'-'+date.slice(0,4)
        return newDate
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let record=[];
        if(e.target.AssignID.value!==""){
            record={
                AssignedBy:user.id,
                Comments:[],
                Description:e.target.Desc.value,
                Status:'Incomplete',
                Title:e.target.title.value,
                User:e.target.AssignID.value,
                dueDate:formatDate(e.target.dueDate.value)
            }
        }
        else{
            record={
                AssignedBy:'',
                Comments:[],
                Description:e.target.Desc.value,
                Status:'Incomplete',
                Title:e.target.title.value,
                User:user.id,
                dueDate:formatDate(e.target.dueDate.value)
        }
    }
    if(e.target.AssignID.value!==''){
        getByID('Users',localStorage.getItem('isLoggedIn')).then((manager)=>{
            let notrec={
                Notifications:[...manager.Notifications,`${user.Username} has assigned a task to you.`]
            }
            updateRecord("Users",e.target.AssignID.value,notrec).then(()=>{
                addRecord('Tasks',record).then(()=>{
                    e.target.AssignID.value=''
                    e.target.title.value=''
                    e.target.Desc.value=''
                    e.target.dueDate.value=''
                }
                ).catch((err)=>setErrorMsg(err))
            })
        })
    }else{
        addRecord('Tasks',record).then(()=>{
            e.target.AssignID.value=''
            e.target.title.value=''
            e.target.Desc.value=''
            e.target.dueDate.value=''
        }
        ).catch((err)=>setErrorMsg(err))
    }}
    return(
        <div id='AddTask'>
            <div className={styles.innerBox} id="outerform">
          <h1 className={styles.heading}>Add Task</h1>
          <form className="loginform" onSubmit={handleSubmit}>
            <div className={styles.container} id='section'>
                <label>Title</label>
                <input required type="text" id='title' placeholder='Enter Title' />
            </div>
            <div className={styles.container} id='section'>
                <label>Due Date</label>
                <input required type="date" id='dueDate' placeholder='Enter Username' />
            </div>
            <div className={styles.container} id='section'>
                <label>Assign to</label>
                <input required type="text" id='AssignID' placeholder="Enter other user's Id or leave empty" />
            </div>
            <div className={styles.container} id='section'>
                <label>Description</label>
                <textarea required type="text" id='Desc' placeholder='Enter the Description' />
            </div>
              <div className={styles.footer} id='footer'>
                <b className={styles.error} id='loginError'>{errorMsg}</b>
                <Button>Add</Button>
            </div>
          </form>
        </div>
        </div>
    )
}