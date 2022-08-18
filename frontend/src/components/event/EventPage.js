import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import CreateEvent from './CreateEvent';
import eventCSS from "./eventStyles.module.css"
import Event from './Event';
function EventPage() {

  useEffect(()=>{
    axios.get("/loginStatus")
    .then((response)=>{
      if(response.data!==false){
        setIsAdmin(response.data.isAdmin);
        setIsLoggedIn(true);
        setUserID(response.data.id)
      }
    })

    
  },[])

  
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userID, setUserID] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    axios.get("/events")
    .then((response)=>{
      setEvents(response.data);
    })
  },[updates])

  function createHandler(){
    setFormVisible(true);
  }
  var arr=[];
  function searchHandler(e){
    e.preventDefault();
    if(search===""){
      setEvents(arr);
    }else{
    events.forEach((event)=>{
      if(event.name===search){
        arr.push(event);
      }
    })
    const temp = events;
    setEvents(arr);
    arr = temp;
  }
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
      <Link className={`navbar-brand ${eventCSS.logo}`}  to="/">RIVIERA</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className={`nav-item ${eventCSS.homeItem}`}>
            <Link className="nav-link active" aria-current="page" to="/events">Events</Link>
          </li>
          
          {(isLoggedIn) && <li className="nav-item">
            <Link className="nav-link" to={"/events/user/"+ userID}>My Events</Link>
          </li>}
          

          {(isAdmin) && <li className="nav-item">
            <Link className="nav-link" to="/verify">Verify User</Link>
          </li>}
      
          <li className="nav-item">
            <Link className="nav-link" to="/map">Map</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input onChange={(event)=>{setSearch(event.target.value)}} className = {`${eventCSS.searchBar} form-control mr-sm-2`}  type="search" placeholder="Search" aria-label="Search" />
          <button onClick={searchHandler} class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
    <div className={eventCSS.eventList}>
        {(isAdmin) && <button onClick={createHandler} class="btn btn-primary">Create Event</button>}
        {(formVisible) && 
        <CreateEvent 
          updates = {updates}
          updater = {setUpdates}
        />
        }

        <div className='events'>
            {events.map((event)=>{
            return(
            <Event 
                key={event._id}
                id={event._id}
                name= {event.name}
                start= {event.start}
                end= {event.end}
                location={event.location}
                seats={event.seats}
                seatsFilled={event.seatsFilled}
                isAdmin={isAdmin}
                userID={userID}
                isLoggedIn={isLoggedIn}
                updates = {updates}
                updater={setUpdates}
            />
            )
            })}
        </div>
        </div>
        {updates}
    </div>
  )
}

export default EventPage