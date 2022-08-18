import Event from "../models/event.js";
import User from "../models/user.js";

export function addEvent(req,res){
    const data = req.body;
    const newEvent = new Event(data);
    newEvent.save();
    res.send(true);
}

export function getEvents(req,res){
    Event.find({}, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
}

export function deleteEvent(req,res){
    const id = req.params.id;
    Event.findByIdAndDelete(id, function(err){
        if(err){
            console.log(err);
        }
    })
    res.send(true);
}

export function updateEvent(req,res){
    const id = req.params.id;
    const change = req.body;
    Event.findByIdAndUpdate(id,change, function(err){
        if(err){
            console.log(err);
        }
    })
    res.send(true);
}

export function registerUser(req,res){
    const eventID = req.params.id;
    const userID = req.body.userID;
    const start = req.body.start;
    const end = req.body.end;
    var s1,e1;
    var name,location;
    Event.findById(eventID, function(err,event){
        if(err){
            console.log(err);
        }else{
            const seatsFilled=event.seatsFilled;
            s1 = new Date(event.start).getTime();
            e1 = new Date(event.end).getTime();
            name = event.name;
            location = event.location;
            User.findById(userID, function(err,user){
                if(err){
                    console.log(err);
                }else{
                    const events = user.events;
                    var flag=true;
                    events.forEach(e => {
                        if(flag===true){
                        const eid = e.eventID;
                        if(eid===eventID){
                            res.send("Already Registered For This Event");
                            flag=false;
                        }else{
                            var s2 = new Date(e.start).getTime();
                            var e2 = new Date(e.end).getTime();
                            if(s1<=e2 && s2<=e1){
                                res.send("Overlapping Events. Cannot Register");
                                flag=false;
                            }
                        }
                        }
                    });
                    if(flag===true){
                                const uniqueCode = eventID+userID;
                                const entry = {
                                    eventID,
                                    uniqueCode,
                                    start,
                                    end,
                                    name,
                                    location
                                }       
                                User.findByIdAndUpdate(userID, { $push: { events: entry  } } ,(err,result)=>{
                                    if(err){
                                        console.log(err);
                                    }else{
                                        res.send("Registered");
                                    }
                                })
                                Event.findByIdAndUpdate(eventID, {seatsFilled: seatsFilled+1} ,(err,result)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                })

                    }
                    
                }
            })
            
        }
    })
    
}

export function getUserEvents(req,res){
    const id = req.params.id;
    User.findById(id, function(err,user){
        if(err){
            console.log(err);
        }else{
            const events = user.events;
            res.send(events);
        }
    })
}

export function getEventDetails(req,res){
    const id = req.params.id;
    Event.findById(id, function(err,event){
        res.send(event);
    })
}