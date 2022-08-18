import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import modifyCSS from "./modifyCSS.module.css"
function Modify() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [seats, setSeats] = useState(0);
    const {id} = useParams();

    function SubmitHandler(event){
        event.preventDefault();
        var obj = {}
        if(name!==""){
            obj["name"]=name;
        }
        if(start!==""){
            obj["start"]=start;
        }
        if(end!==""){
            obj["end"]=end;
        }
        if(lat!==""){
            obj["location"]={lat,lon};
        }
        if(seats!==0){
            obj["seats"]=seats;
        }
        const url = "/events/"+id;
        axios.patch(url,obj)
        .then(()=>{
            navigate("/events");
        })
    }

  return (
    <div className={modifyCSS.formBox}>   
    <h1>Enter New Details</h1>
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
            <input onChange={(event)=>{
                const val = event.target.value;
                if(val===''){
                    setSeats(0);
                }else{
                    setSeats(val);
                }
            }} class="form-control"  />

            <button onClick={SubmitHandler} type="submit" class="btn btn-primary">Update</button>
    </div>
  )
}

export default Modify