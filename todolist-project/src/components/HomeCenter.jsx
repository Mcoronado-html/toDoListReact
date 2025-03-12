import { useState, useEffect } from "react";
import UsersCallers from "../services/UsersCallers"
import Swal from 'sweetalert2'

const HomeCenter = () => {
    
    const [userTask, SetUserTask]=useState([])
    const [newTask, SetNewTask]=useState()
    const [reload, SetReload]=useState(false)
    const [taskCompleted, SetTaskCompleted]=useState(0)



    useEffect(() =>{
        async function fetchDataUsers() {
            const userLogin = await UsersCallers.getUsers("tasks")
            const filterUser = userLogin.filter(index=>index.userId == localStorage.getItem("userId"))
            SetUserTask(filterUser)
        };
        
        async function contTasks() {
          const userLogin = await UsersCallers.getUsers("tasks")
          const filterUser = userLogin.filter(index=>index.userId == localStorage.getItem("userId"))
          SetTaskCompleted(filterUser.length)
          
        }    
      fetchDataUsers();
      contTasks()
      },[reload]);
    
    function addTask(event) {

        SetNewTask(event.target.value)
    }

    function registerTask(){
            
        let tasksAdded = {
            "tasks": newTask,
            "userId": localStorage.getItem("userId"),
            "userName": localStorage.getItem("userName"),
            "userLast": localStorage.getItem("userLast")
    }
        UsersCallers.postUsers(tasksAdded, "tasks")
        SetReload (!reload)
    }

    function deleteTask(id){

        Swal.fire({
            title: "Just checking. Do you want to delete this task?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Keep question`
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Question deleted", "", "success");
              UsersCallers.deleteUser("tasks",id)
              SetReload (!reload)
              

            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });


    }
    
    async function editTask(id) {
 	
    const { value: formValues } = await Swal.fire({
    title: "Edit Question",
    html: `  
      <input id="swal-input1" class="swal2-input">
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        ];
    }
});
  if (formValues) {
    SetReload (!reload)
    const editNewTask = {

        "tasks": document.getElementById("swal-input1").value
    }
    UsersCallers.updateUsers(editNewTask, "tasks", id)
  }
}
    return(
    <>
    <h3>Website Todo</h3>
    <h1>{taskCompleted}</h1>
    <div className="home-Container">   
        <input value={newTask} onChange={addTask} type="text" placeholder="New Task" />
        <button onClick={registerTask}>Add new task</button> 
        <ul className="ulList">
        {userTask.map((task, index) => (
         <li key={index}>
            <p>{task.tasks}</p>
            <button onClick={e=>deleteTask(task.id)}>Delete</button>
            <button onClick={e=>editTask(task.id)}>Edit</button>

         </li>
        )    
    )}
        </ul>
    </div>
    </>
    )
}
export default HomeCenter