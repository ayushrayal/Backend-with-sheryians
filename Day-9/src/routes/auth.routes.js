const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authRouter = express.Router();


authRouter.post("/signup",async (req,res)=>{
    const {name ,email , password} = req.body;
    const userAlreadyExists = await userModel.findOne({email});
    if(userAlreadyExists){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex");
    const user = await userModel.create({
        name, email, password:hash
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

authRouter.post("/protected", (req,res)=>{
    res.status(200).json({
        message: "You have accessed the protected route",
    })
    console.log('cookies:', req.cookies);

})

authRouter.post("/login",async (req,res)=>{
    const {email, password} = req.body;
    const validUser = await userModel.findOne({email});
    if(!validUser){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }
    if(validUser.password !== crypto.createHash("md5").update(password).digest("hex")){
        return res.status(400).json({
            message:"Invalid password"
        })
    }
    const token = jwt.sign({
        id:validUser._id,
        email:validUser.email,
    },
    process.env.JWT_KEY,);
    res.cookie("token",token)
    res.status(200).json({
        message:"Login Successful",
        user:validUser,
        token
    })
})

authRouter.get("/users", async(req,res)=>{
    const users = await userModel.find()
    res.status(200).json({
        message:"All users Data",
        users:users
    })
})
module.exports = authRouter;