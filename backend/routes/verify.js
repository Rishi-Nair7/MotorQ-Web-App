import  express  from "express";
import Event from "../models/event.js";
import User from "../models/user.js";
const router = express.Router();

router.post("/verify", function(req,res){
    const eventID = req.body.eventID;
    const userID = req.body.userID;
    User.findById(userID, function(err,user){
        if(err){
            console.log(err);
        }else{
            if(user==null){
                res.send(false);
            }else{
                const events = user.events;
                var flag=true;
                events.forEach((event, index) => {
                    if(flag===true){
                    const id = event.eventID;
                    if(id===eventID){
                        const arr = events.slice(0,index).concat(events.slice(index+1));
                        User.findByIdAndUpdate(userID,{events: arr}, (err,result)=>{
                            if(err){
                                console.log(err);
                            }
                        })
                        res.send(true);
                        flag=false;
                    }
                    }
                });
                if(flag===true){
                    res.send(false);
                }
            }
        }
    })
})

router.post("/status", function(req,res){
    const eventID = req.body.eventID;
    const userID = req.body.userID;
    if(userID===""){
        res.send(false);
    }else{
    User.findById(userID, function(err,user){
        if(err){
            console.log(err);
        }else{
                const events = user.events;
                var flag=true;
                events.forEach((event) => {
                    if(flag===true){
                    const id = event.eventID;
                    if(id===eventID){
                        res.send(true);
                        flag=false;
                    }
                    }
                });
                if(flag===true){
                    res.send(false);
                }
            
        }
    })
    }
})

router.post("/unregister", function(req,res){
    const eventID = req.body.eventID;
    const userID = req.body.userID;
    User.findById(userID, function(err,user){
        if(err){
            console.log(err);
        }else{
            if(user==null){
                res.send(false);
            }else{
                const events = user.events;
                var flag=true;
                events.forEach((event, index) => {
                    if(flag===true){
                    const id = event.eventID;
                    if(id===eventID){
                        const arr = events.slice(0,index).concat(events.slice(index+1));
                        User.findByIdAndUpdate(userID,{events: arr}, (err,result)=>{
                            if(err){
                                console.log(err);
                            }
                        })
                        Event.findById(id, function(err,event){
                            const seatsFilled=event.seatsFilled;
                            Event.findByIdAndUpdate(id,{seatsFilled : seatsFilled-1}, (err,result)=>{
                                if(err){
                                    console.log(err);
                                }
                            })
                        })
                        
                        res.send(true);
                        flag=false;
                    }
                    }
                });
                if(flag===true){
                    res.send(false);
                }
            }
        }
    })
})
export default router