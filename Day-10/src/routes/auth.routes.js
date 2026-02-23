const express = require("express");
const userModel = require("../models/users.model");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/*
  @route POST /api/auth/signup
  @desc Register a new user
  @access Public
*/
authRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password, bio, profileImg } = req.body;
    const isUserExists = await userModel.findOne({ $or: [{ email }, { username }] });
    if (isUserExists) {
      const conflictField = isUserExists.email === email ? "email" : "username";
      return res.status(409).json({ message: `${conflictField} already exists.` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { username, email, password: hashedPassword, bio };
    if (profileImg && profileImg.toString().trim().length > 0) userData.profileImg = profileImg;
    const user = new userModel(userData);
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    res.cookie("token", token);
    res.status(201).json({
      message: "user created successfully",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImg: user.profileImg,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/*
  @route POST /api/auth/login
  @desc Authenticate user and return token
  @access Public
*/
authRouter.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const uservalid = await userModel.findOne({ $or: [{ email: email }, { username: username }] });
    if (!uservalid) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, uservalid.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: uservalid._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    res.cookie("token", token);
    res.status(200).json({
      message: "Login successful",
      user: {
        username: uservalid.username,
        email: uservalid.email,
        bio: uservalid.bio,
        profileImg: uservalid.profileImg,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
module.exports = authRouter;