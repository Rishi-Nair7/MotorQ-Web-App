import React from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Event from "./components/event/EventPage";
import Home from "./components/Home";
import Login from "./components/login/Login";
import Modify from "./components/modify/Modify";
import MyEvents from "./components/myEvents/MyEvents";
import Register from "./components/register/Register";
import Verify from "./components/verify/Verify";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/events" element={<Event />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/:id" element={<Modify />} />
      <Route path="/events/user/:id" element={<MyEvents />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
    </Router>
  );
}

export default App;
