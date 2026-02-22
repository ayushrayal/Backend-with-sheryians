const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already exists."],
        required:[true,"Username is required."],
    },
    email:{
        type:String,
        unique:[true,"Email already exists."],
        required:[true,"Email is Required."],
    },
    password:{
        type:String,
        required:[true,"Password is Required."],
    },
    bio:String,
    profileImg:{
        type:String,
        default:"https://ik.imagekit.io/astro4Kz/profiledefaultimg.jpg",
    }
});

const userModel = mongoose.model("users",userSchema);

module.exports = userModel; 