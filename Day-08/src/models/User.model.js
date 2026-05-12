const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:[true,"This Email Already Exists!"]
    },
    password:String 
});

const userModel = mongoose.model("Users",userSchema);

module.exports = userModel;