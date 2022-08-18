import axios from 'axios';
import React, { useState } from 'react'
import verifyCSS from "./verifyCSS.module.css";
function Verify() {
    const [code, setCode] = useState();

    function SubmitHandler(event){
        event.preventDefault();
        const eventID = code.substring(0,24);
        const userID = code.substring(24);
        axios.post("/verify",{eventID,userID})
        .then((response)=>{
            if(response.data===true){
                alert("User Is Verified");
            }else{
                alert("Incorrect Unique Code");
            }
        })
    }
  return (
    <div className={verifyCSS.container}>
        <h2>Enter Unique Code :</h2>
        <input onChange={(event)=>{setCode(event.target.value)}} class="form-control"  />
        <button onClick={SubmitHandler} type="submit" class="btn btn-primary">Verify</button>
    </div>
  )
}

export default Verify;