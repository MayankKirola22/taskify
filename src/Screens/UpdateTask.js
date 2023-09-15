import styles from '../Components/InputControl.module.css';
import { useState } from 'react';
import './UpdateTask.css'
import { updateRecord } from '../Utility/db';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Components/Button';

export function UpdateTask({tasks}){
    const navigate=useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    let {id}=useParams();
    let task=tasks!==0?tasks.filter((item)=>id===item.id)[0]:null;
    const ReFormatDate= (date) => {
        let newDate=date.slice(6,10)+'-'+date.slice(3,5)+'-'+date.slice(0,2)
        return newDate
    }
    const formatDate= (date) => {
        let newDate=date.slice(8,10)+'-'+date.slice(5,7)+'-'+date.slice(0,4)
        return newDate
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let record=[];
        let redirectLink;
        if(e.target.AssignID.value!==""){
            record={
                AssignedBy:task.User,
                Description:e.target.Desc.value,
                Status:'Incomplete',
                Title:e.target.title.value,
                User:e.target.AssignID.value,
                dueDate:formatDate(e.target.dueDate.value)
            }
            redirectLink='/'
        }
        else{
            record={
                Description:e.target.Desc.value,
                Status:'Incomplete',
                Title:e.target.title.value,
                dueDate:formatDate(e.target.dueDate.value)
        }
        redirectLink=`/task/${task.id}`
    }
        updateRecord('Tasks',id,record).then(()=>{
            navigate(redirectLink);
            window.location.reload()
        }
        ).catch((err)=>setErrorMsg(err))
    }
    return(
        <div id='UpdateTask'>
            {task!==null&&task!==undefined?<div className={styles.innerBox} id="outerform">
          <h1 className={styles.heading}>Update Task</h1>
          <form className="loginform" onSubmit={handleSubmit}>
            <div className={styles.container} id='section'>
                <label>Title</label>
                <input required type="text" id='title' placeholder='Enter Title' defaultValue={task.Title}/>
            </div>
            <div className={styles.container} id='section'>
                <label>Due Date</label>
                <input required type="date" id='dueDate' placeholder='Enter Username' defaultValue={ReFormatDate(task.dueDate)}/>
            </div>
            <div className={styles.container} id='section'>
                <label>Assign to</label>
                <input required type="text" id='AssignID' placeholder="Enter other user's Id or leave empty"/>
            </div>
            <div className={styles.container} id='section'>
                <label>Description</label>
                <textarea required type="text" id='Desc' placeholder='Enter the Description' defaultValue={task.Description}/>
            </div>
              <div className={styles.footer} id='footer'>
                <b className={styles.error} id='loginError'>{errorMsg}</b>
                <Button>Update</Button>
            </div>
          </form>
        </div>:<div>Loading Task</div>}
        </div>
    )
}