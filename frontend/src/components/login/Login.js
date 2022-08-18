import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import loginCSS from "./loginStyles.module.css";
function Login() {
  const navigate = useNavigate();
  const url="/login";
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function UChangeHandler(event){
    setUsername(event.target.value);
  }

  function PChangeHandler(event){
    setPassword(event.target.value);
  }

  
  function LoginHandler(event){
    event.preventDefault();
    const credentials = {username:username, password:password}
    axios.post(url,credentials)
    .then((response) => {
        const data=response.data;
        if(data.auth===true){ 
          navigate("/events");
        }else{  
          setError("Incorrect Username or Password");
        }
    });
  }
  return(
    <main className={loginCSS.formSignin}>
  <form>
    <h1 className={loginCSS.heading}>Login</h1>

    <div className={`${loginCSS.inputText} form-group`}>
    {(error!=="") && <p className={loginCSS.errorMessage}>{error}</p>}
      <input onChange={UChangeHandler} type="text" className="form-control" id="floatingInput" placeholder="Username" />
    </div>
    <div className={`${loginCSS.inputText} form-group`}>
      <input onChange={PChangeHandler} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
    </div>

    <button onClick={LoginHandler} className={`${loginCSS.loginButton} w-100 btn btn-lg btn-primary`} type="submit">Sign in</button>

    <button onClick={()=>{
      navigate("/register");
    }} type="button" class="btn btn-link">Register</button>
  </form>
</main>
  )
}

export default Login