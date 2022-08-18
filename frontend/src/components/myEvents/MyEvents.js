import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import myEventsCSS from "./myEventsCSS.module.css";

function MyEvents() {
    const {id} = useParams();
    const [events, setEvents] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const url = "/events/"+id;
    useEffect(()=>{
        axios.get(url)
        .then((response)=>{

            setEvents(response.data);
            console.log(response.data);
        })
    },[])

    
  return (
    <div>
    <h1>My Registered Events</h1>
    <div >
        {events.map((event)=>{
            return(
                <div className={myEventsCSS.events}>
                    <h4>Name :- {event.name}</h4>
                    <h4>Start :- {event.start}</h4>
                    <h4>End :- {event.end}</h4>
                    <h4>Latitude :- {event.location.lat}</h4>
                    <h4>Longitude :- {event.location.lon}</h4>
                </div>
            )
        })}
    </div>
    </div>
  )
}

export default MyEvents