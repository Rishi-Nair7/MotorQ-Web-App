import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/events");
    })
    return (
        <div></div>
    )
}

export default Home