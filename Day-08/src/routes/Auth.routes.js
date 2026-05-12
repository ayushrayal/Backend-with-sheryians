const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User.model");
const crypto = require("crypto");
const AuthRouter = express.Router();

AuthRouter.post("/register", async(req,res)=>{
    const {username,email,password} = req.body;
    const isEmailAlreadyExist = await userModel.findOne({email});
    if(isEmailAlreadyExist){
        return res.status(409).json({
            message:"This Email Already Used By Another User!"
        })
    }
    const user = await userModel.create({
        username,email,password:crypto.createHash("md5").update(password).digest("hex")
    })
    const Token = jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_TOKEN
)
res.cookie("TOKEN",Token)
res.status(201).json({
    message:"User Created Successfully!",
    Token,
    user:{
        username:user.username,
        email:user.email
    }
})
    
})

AuthRouter.get("/get-me",async(req,res)=>{
    const Token = req.cookies.TOKEN;
    const Decoded = jwt.verify(Token,process.env.JWT_TOKEN);
    const user = await userModel.findById(Decoded.id);
    res.status(200).json({
        username:user.username,
        email:user.email
    })
})

module.exports = AuthRouter;