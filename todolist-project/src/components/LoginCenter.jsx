import React, {useState, useEffect} from "react"
import UsersCallers from "../services/UsersCallers"
import { useNavigate } from "react-router-dom"

const LoginCenter = () => {

    const [emailUser, SetEmailUser]=useState("")
    const [passUser, SetPassUser]=useState("")
    const [LoginAccess, SetLoginInfo]=useState([])
    const navigate = useNavigate()
     
    useEffect(() =>{
        async function fetchDataUsers() {
            const userLogin = await UsersCallers.getUsers("usersInfo")
            SetLoginInfo(userLogin)            
        };
        fetchDataUsers();
    },[]);

    function email(event) {

        SetEmailUser(event.target.value)

    }
    function password(event) {

        SetPassUser(event.target.value)

    }
    function loginInfo() {
       const FindUser = LoginAccess.find(users => users.userEmail == emailUser && users.userPass == passUser)
        console.log(FindUser);
        
       if (FindUser) {
            navigate("/Home")
            localStorage.setItem("userId", FindUser.id)
            localStorage.setItem("userName", FindUser.userName)
            localStorage.setItem("userLast", FindUser.userLast)
       }
        
    }
    return(
    <>
    <div className="login-Container">
        <div className="login-Info">
        <h3>Glad to see you again!</h3>
        <input value={emailUser} onChange={email} type="text" placeholder="Email"/>
        <input value={passUser} onChange={password} type="text" placeholder="Password"/>
        <button onClick={loginInfo}>Login</button>
        <p>Forgot password?</p>
        </div>
    </div>
    </>
    )
}
export default LoginCenter