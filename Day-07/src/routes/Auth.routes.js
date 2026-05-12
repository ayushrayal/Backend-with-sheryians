const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User.model");
const crypto = require("crypto");
const AuthRouter = express.Router();

AuthRouter.post("/register",async(req,res)=>{
    const {username,email,password} = req.body;
    const isUserAlreadyExists = await userModel.findOne({email});
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"This email already exists!"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex");
    const user = await userModel.create({
        username,email,password:hash
    })
    const Token = jwt.sign(
    {
        email:user.email,
        id:user._id
    },
    process.env.JWT_Token
    )
    res.cookie("Token",Token)
    res.status(201).json({
        message:"User Created Successfully!",
        user,
        Token
    })
})

AuthRouter.post("/protected",async(req,res)=>{
    console.log(res.cookie);
    
    res.status(200).json({
        message:"This is a protected route!",
    })
})

AuthRouter.post("/login",async(req,res)=>{
    const {email, password} = req.body;
    const User = await userModel.findOne({email});
    if(!User){
        return res.status(404).json({
            message:"No User Exists With This Email!"
        })
    }
    const isPasswordIsCorrect =  User.password === crypto.createHash("md5").update(password).digest("hex");
    if(!isPasswordIsCorrect){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }
    const Token = jwt.sign({
        email:User.email,
        id:User._id
    },process.env.JWT_Token);

    res.status(200).json({
        message:"Login Successful!",
        Token
    })
})

module.exports = AuthRouter;