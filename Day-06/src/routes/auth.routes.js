const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const cookieParser = require("cookie-parser");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    try {

        const { username, email, password } = req.body;

        // Check user already exists
        const isUserAlreadyExist = await userModel.findOne({ email });

        if (isUserAlreadyExist) {
            return res.status(400).json({
                message: "Email already exists."
            });
        }

        // Create user
        const user = await userModel.create({
            username,
            email,
            password
        });

        // Generate token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
        );

        res.cookie("CookieToken",token)
        res.status(201).json({
            message: "User created successfully.",
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
});

module.exports = authRouter;