const userModel = require('../models/user.model');
const express = require("express");
const authRouter = express.Router();

authRouter.get("/users",async(requestAnimationFrame, res)=>{
    const users = await userModel.find();
    res.status(200).json({
        message:"All USERS",
        users
    })
})

module.exports = authRouter