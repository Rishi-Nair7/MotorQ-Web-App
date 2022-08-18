import User from "../models/user.js";
import passport from "passport";
export  function postLogin(req,res){
    const credentials=req.body;
    const user = new User(credentials);
    
     req.login(user, function(err){
        if(err){
            console.log("error");
            
        }else{
             passport.authenticate("local",{ failureRedirect: '/fail' })(req,res,function(){
                const info = {
                    auth: true
                }
                res.send(info);
            })
        }
    })
    

};

export function postRegister(req,res){
    const credentials=req.body;
    User.findOne({username: credentials.username}, function(err,result){
        if(err){
            console.log(err);
        }else{
            if(result===null){
                const newUser = new User({
                    username: credentials.username,
                    isAdmin: credentials.isAdmin,
                    events: []
                });
                
                User.register(newUser, credentials.password, function(err,user){
                    if(err){
                        console.log(err);
                    }else{
                         passport.authenticate("local",{ failureRedirect: '/fail' })(req,res,function(){
                            
                            const info = {
                                auth: true
                            }
                            res.send(info);

                        })
                    }
                })
            }else{
                res.send(false);
            }
            
            
        }
    })
};

export function getLoginStatus(req,res){
    if(req.isAuthenticated()){
        const obj = {
            isAdmin:req.user.isAdmin,
            id:req.user._id
        }
        res.send(obj);
    }else{
        res.send(false);
    }
}