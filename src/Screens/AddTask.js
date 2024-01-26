import styles from '../Components/InputControl.module.css';
import { useState } from 'react';
import './AddTask.css';
import { addRecord, getByID, getUserIdbyEmail, updateRecord } from '../Utility/db';
import Button from '../Components/Button';

export function AddTask({user,reload}){
    const [errorMsg, setErrorMsg] = useState("");
    const formatDate= (date) => {
                let newDate=date.slice(8,10)+'-'+date.slice(5,7)+'-'+date.slice(0,4)
                return newDate;
    }

    const handleSubmit = (e) => {
        try{
            e.preventDefault();
            if (new Date(e.target.dueDate.value) >= Date.now()) {
                let record=[];
                if(e.target.AssignMail.value!==""){
                    record={
                        AssignedBy:user.id,
                        Comments:[],
                        Description:e.target.Desc.value,
                        Status:'Incomplete',
                        Title:e.target.title.value,
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
            if(e.target.AssignMail.value!==''){
                getByID('Users',localStorage.getItem('isLoggedIn')).then((manager)=>{
                    let notrec={
                        Notifications:[...manager.Notifications,`${user.Username} has assigned a task to you.`]
                    }
                    getUserIdbyEmail(e.target.AssignMail.value).then(id=>{
                        if(id!==localStorage.getItem('isLoggedIn')){
                            updateRecord("Users",id,notrec).then(()=>{
                                addRecord('Tasks',{...record,User:id}).then(()=>{
                                    e.target.AssignMail.value='';
                                    e.target.title.value='';
                                    e.target.Desc.value='';
                                    e.target.dueDate.value='';
                                    setErrorMsg(null);
                            }
                            ).catch((err)=>setErrorMsg(err.message))
                        })
                    }
                    else{
                        setErrorMsg("To self-assign task, Leave \"Assign to\" field empty");
                    }
                    }).catch(()=>setErrorMsg("User Not Found. Enter Correct Email ID."))
                    
                }).catch((err)=>setErrorMsg(err.message))
            }else{
                addRecord('Tasks',record).then(()=>{
                    e.target.title.value='';
                    e.target.Desc.value='';
                    e.target.dueDate.value='';
                    setErrorMsg(null);
                }
                ).catch((err)=>setErrorMsg(err.message))   
            }
        }
        else{
            setErrorMsg("Deadline can not be less than current date.")
        }
    }
    catch{
        setErrorMsg("An Error Occured.")
    }
    reload();
    }
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
                <input type="email" id='AssignMail' placeholder="Assignee's mail or leave empty" />
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