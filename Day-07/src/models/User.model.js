const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:[true,"User of this email already exists."]
    },
    password:String
})

const userModel = new mongoose.model("Users",userSchema);

module.exports = userModel;