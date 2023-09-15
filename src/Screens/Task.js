import { useParams } from "react-router-dom";
import { getByID, updateRecord } from "../Utility/db";
import "./Task.css";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaBell, FaPlus } from "react-icons/fa";
import { FaCircleXmark } from 'react-icons/fa6';
import Select from 'react-select';
import Button from "../Components/Button";

export default function Task({tasks,user}){
    let {id}=useParams();
    let task=tasks!==0?tasks.filter((item)=>id===item.id)[0]:null;
    let [manager,setManager]=useState(null)
    if(task!==undefined&&task!==null&&task.AssignedBy!==''){
            getByID('Users',task.AssignedBy).then((value)=>{
                setManager(value.Username)
    })}
    const [addSection,setAddSection]=useState(null);
    const addCommentSection=()=>{
        setAddSection(<div className="commentBody commentInputBody">
        <form onSubmit={(e)=>addComment(e)} className='commentForm' >
            <textarea required type="text" id='comment' className="commentInput" placeholder='Comment'/>
            <Button className='addCommentsButton'>Add</Button>
        </form>
        </div>)
    }
    const addComment=(e)=>{
        e.preventDefault();
        let record={
            Comments:[...task.Comments,{Body:e.target.comment.value,AddedTime:Timestamp.fromDate(new Date())}]
        }
        updateRecord('Tasks',task.id,record).then(()=>setAddSection(null));
    }
    const statusChange=(value)=>{
        let record={
            Status:value,
        }
        if(task.AssignedBy!==''){
        getByID('Users',task.AssignedBy).then((manager)=>{
            let record={
                Notifications:[...manager.Notifications,`${user.Username} has changed the task status to : ${value}.`]
            }
            updateRecord("Users",task.AssignedBy,record)
        })
        }
        updateRecord('Tasks',task.id,record);
    }
    const deleteComment=(id)=>{
        let record={
            Comments:task.Comments.filter(((Comment,index)=>index!==id))
        }
        updateRecord('Tasks',task.id,record)
    }
    return(
        <div id='Task'>
            {task!==null&&task!==undefined?
            <div>
                <div className="Header">
                <div className="heading">
                    <font className='Title'>{task.Title}</font>
                    {manager!==null?<font className='subText'>This task was assigned by <b>{manager}</b></font>:null}
                </div>
                <div>
                    <div className='Status'><Select className="Select" isSearchable={false} defaultValue={{label:task.Status,value:task.Status}} onChange={(value)=>statusChange(value.value)} options={[{value:'Completed',label:'Completed'},{value:'In Progress',label:'In Progress'},{value:'Incomplete',label:'Incomplete'}]}/></div>
                    <div className='TimeStamp'><FaBell size={20} color='#555' /><font className='dueDate'>{task.dueDate}</font></div>
                </div>
                </div>
                <hr id='hr'/>
                <div id='body'>{task.Description}</div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'0px 20px'}}>
                    <font className='commentHead'>Comments</font>
                    <FaPlus onClick={addCommentSection} aria-disabled />
                </div>
                <hr id='hr'/>
                <div>
                    {addSection}
                    {task.Comments.map((comment,index)=>(
                        <div className="comment" key={index}>
                            <FaCircleXmark className="commentCross" onClick={()=>deleteComment(index)} />
                            <div className="commentBody">{comment.Body}</div>
                            <div className="addedTime">{comment.AddedTime.toDate().toLocaleDateString('en-GB')} {comment.AddedTime.toDate().toLocaleTimeString('en-US')}</div>
                        </div>
                    ))}
                </div>
            </div>:
            <div>
                Task not found
            </div>}
        </div>
    )
}