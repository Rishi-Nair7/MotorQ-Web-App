import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = mongoose.Schema({
    username: "string",
    password: "string",
    isAdmin: Boolean,
    events:[]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);

export default User;
