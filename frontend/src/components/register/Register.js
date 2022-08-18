import React, { useContext } from 'react'
import { useState } from 'react';
import axios from 'axios';
import registerCSS from "./registerStyles.module.css"
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const url="/register";
  const [usernameError, setUsernameError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  function UNChangeHandler(event){
    setUsername(event.target.value);
  }

  function PChangeHandler(event){
    setPassword(event.target.value);
  }

  function AChangeHandler(event){
    if(event.target.checked){
        setIsAdmin(true);
    }else{
        setIsAdmin(false);
    }
  }


  function RegisterHandler(event){
    event.preventDefault();
    const credentials = {username:username, password:password, isAdmin:isAdmin}
    axios.post(url,credentials)
    .then((response) => {
        console.log(response);
        if(response.data.auth===true){
            navigate("/events");
        }else{
          setUsernameError("Username already in use");
        }
    })
  }

  return(
    <div>
    <h1 class={registerCSS.heading}>Register</h1>
    <form className={registerCSS.registerForm}>
    <div class="mb-3">
    {(usernameError!=="") && <p className={registerCSS.errorMessage}>{usernameError}</p>}
    <label for="exampleInputEmail1" class="form-label">Username</label>
    <input onChange={UNChangeHandler} class="form-control" aria-describedby="emailHelp" />
    <div id="emailHelp" class="form-text"></div>
  </div>
  <div class="mb-3">
  
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input onChange={PChangeHandler} type="password" class="form-control" id="exampleInputPassword1" />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Make Admin Account?</label>
    <input onChange={AChangeHandler} type="checkbox" />
  </div>
  <button onClick={RegisterHandler} type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
  )
  
}

export default Register