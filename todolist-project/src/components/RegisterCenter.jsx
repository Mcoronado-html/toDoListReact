import React, { useState} from "react"
import UserCallers from "../services/UsersCallers"


const RegisterCenter = () => {

    const [nameUser, SetNameUser]=useState()
    const [lastUser, SetLastUser]=useState()
    const [emailUser, SetEmailUser]=useState()
    const [passUser, SetPassUser]=useState()

    function firstName(event){

        SetNameUser(event.target.value)
    }
    function lastName(event){

        SetLastUser(event.target.value)
    }
    function email(event){

        SetEmailUser(event.target.value)
    }
    function password(event){

        SetPassUser(event.target.value)
    }
    function registerInfo(){
        
        let users = {
            "userName": nameUser,
            "userLast": lastUser,
            "userEmail": emailUser,
            "userPass": passUser
        }
        UserCallers.postUsers(users, "usersInfo")
    }


    return(
    <>
    <div className="register-Continer">
        <div className="register-Info">
            <h3>Register</h3>
            <input value={nameUser} onChange={firstName} type="text" placeholder="First Name"/>
            <input value={lastUser} onChange={lastName} type="text" placeholder="Last Name"/>
            <input value={emailUser} onChange={email} type="text" placeholder="Email"/>
            <input value={passUser} onChange={password} type="text" placeholder="Password"/>
            <button onClick={registerInfo} className="register-Btn">Register</button>            
        </div>
    </div>
    </>
    )
}
export default RegisterCenter