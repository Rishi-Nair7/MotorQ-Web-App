import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateEvent(props) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [seats, setSeats] = useState(0);

    function SubmitHandler(event){
        event.preventDefault();
        const location = {
            lat,lon
        }
        const obj = {
            name,
            start: start,
            end: end,
            location,
            seats,
            seatsFilled:0
        }
        axios.post("/events",obj)
        .then((response)=>{
          props.updater(!props.updates);
        })
    }
  return (
    <div>
            <label class="form-label">Event Name</label>
            <input onChange={(event)=>{setName(event.target.value)}}class="form-control"  />
            <label class="form-label">Start Timestamp</label>
            <input onChange={(event)=>{setStart(event.target.value)}} class="form-control"  />
            <label class="form-label">End Timestamp</label>
            <input onChange={(event)=>{setEnd(event.target.value)}} class="form-control"  />
            <label class="form-label">Latitude</label>
            <input onChange={(event)=>{setLat(event.target.value)}} class="form-control"  />
            <label class="form-label">Longitude</label>
            <input onChange={(event)=>{setLon(event.target.value)}} class="form-control"  />
            <label class="form-label">Seats</label>
            <input onChange={(event)=>{setSeats(event.target.value)}} class="form-control"  />

            <button onClick={SubmitHandler} type="submit" class="btn btn-primary">Create</button>
    </div>
  )
}

export default CreateEvent