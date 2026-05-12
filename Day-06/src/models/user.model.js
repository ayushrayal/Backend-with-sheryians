const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:String,
    email:{
        unique:[true, "User already Exists"],
        type:String
    },
    password:String,
})

const userModel = new mongoose.model("Users", userSchema);

module.exports = userModel;