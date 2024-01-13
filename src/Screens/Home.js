import './Home.css';
import { FaBell } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { deleteRecord, getByID, updateRecord } from '../Utility/db';

export default function Home({tasks,user,reload}){
    const handleDelete=(id,AssignedBy)=>{
        if(AssignedBy!==''){
        getByID('Users',AssignedBy).then((manager)=>{
            let record={
                Notifications:[...manager.Notifications,`${user.Username} has deleted your assigned task.`]
            }
            updateRecord("Users",AssignedBy,record)
        })}
        deleteRecord("Tasks",id);
        reload();
    }
    return(
        <div className="Screen" id='Home'>
            {tasks!==null && tasks.length!==0?tasks.map((item)=>(
                <div>
                <FaCircleXmark className="Cross" size={24} color='#aaaaaa' onClick={()=>handleDelete(item.id,item.AssignedBy)}/>
                <Link className="TaskFrame" key={item.id} to={`/task/${item.id}`}>
                    <font id='Title'>{item.Title}</font>
                    <font id='Status'>{item.Status}</font>
                    <div className='TimeStamp'><FaBell size={20} color='#999' /><font className='dueDate'>{item.dueDate}</font></div>
                </Link>
                </div>
            )):<div id="noTasks">No Tasks Found</div>}
        </div>
    )
}