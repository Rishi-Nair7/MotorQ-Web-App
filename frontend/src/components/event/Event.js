import axios from 'axios';
import React, { useEffect, useState } from 'react';
import eventCSS from "./eventStyles.module.css";
import {useNavigate, Link, Route } from 'react-router-dom';
function Event(props) {
    const [isRegistered , setIsRegistered] = useState(false);
    const userID = props.userID;
    const eventID = props.id;
    useEffect(()=>{
      axios.post("/status",{userID: userID, eventID: eventID})
      .then((response)=>{
        if(response.data===true){
          setIsRegistered(true);
        }
      })
    },[])

    const s = new Date(props.start);
    const e = new Date(props.end);
    const seatsLeft = props.seats-props.seatsFilled;
    function deleteHandler(){
        const id = props.id;
        const url = "/events/"+ id;
        axios.delete(url)
        .then((response)=>{
          props.updater(!props.updates);
        })
    }


    function registerHandler(){
      if(seatsLeft==0){
        alert("No Seats Left");
      }else{
        const url = "/events/"+ eventID;
        axios.post(url,{userID,start:s,end:e})
        .then((response)=>{
          alert(response.data);
          if(response.data=="Registered"){
            setIsRegistered(true);
          }
          props.updater(!props.updates);
        })
      }
    }

    function unRegisterHandler(){
      axios.post("/unregister",{userID,eventID})
      .then((response)=>{
        if(response.data==true){
          alert("Unregistered from the event");
          setIsRegistered(false);
        }
        props.updater(!props.updates);
      })
    }
  return (
    <div className={eventCSS.eventBox}>
        <h1>{props.name}</h1>
        <h4>Start :</h4>
        <p>{s.toLocaleString()}</p>
        <h4>end :</h4>
        <p>{e.toLocaleString()}</p>
        <h4>Location :</h4>
        <p className={eventCSS.text}>lat : {props.location.lat} </p>
        <p className={eventCSS.text}>lon : {props.location.lon}</p>
        <h4>Total Seats :</h4>
        <p>{props.seats}</p>
        <h4>Seats Left:</h4>
        <p>{seatsLeft}</p>
        {(props.isLoggedIn) ?
        ((props.isAdmin) ? <div><button onClick={deleteHandler} class="btn btn-primary">Delete</button>
                            <Link to={"/events/"+props.id}><button class="btn btn-primary">Modify</button></Link></div>
                        :
                        
                        (!isRegistered) ? <button onClick={registerHandler}  class="btn btn-primary">Register</button> : <button onClick={unRegisterHandler}  class="btn btn-primary">Unregister</button>
        )

        : <p className={eventCSS.altText}>Login To Register</p>}
    </div>
  )
}

export default Event