const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:[true,"Username is Required!"],
        unique:[true,"Username Already Exists!"]
    },
    email:{
        type:String,
        require:[true,"Email is Required!"],
        unique:[true,"Email Already Exists!"]
    },
    password:{
        type:String,
        require:[true,"Password is Required!"]
    },
    bio:String,
    Profile_Image:{
        type:String,
        default:"https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107",
    }
})

const userModel = mongoose.model("Users",userSchema);

module.exports = userModel;