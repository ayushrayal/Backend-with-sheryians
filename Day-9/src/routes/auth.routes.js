const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
    const {name ,email , password} = req.body;
    const userAlreadyExists = await userModel.findOne({email});
    if(userAlreadyExists){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }
    const user = await userModel.create({
        name, email, password
    })
    const token = jwt.sign({
        id:user._id,
        email:user.email,
    },
    process.env.JWT_KEY,);
    res.cookie("token",token)
    res.status(201).json({
        message:"User Created Successfully",
        user,
        token
    })
})

module.exports = authRouter;