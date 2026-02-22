const express = require("express");
const userModel = require("../models/users.model");
const authRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password, bio, profileImg } = req.body;
    const isUserExists = await userModel.findOne({ $or: [{ email }, { username }] });
    if (isUserExists) {
      const conflictField = isUserExists.email === email ? "email" : "username";
      return res.status(409).json({ message: `${conflictField} already exists.` });
    }
    const hashedPassword = crypto.createHash("md5").update(password).digest("hex");
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      bio,
      profileImg,
    });
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

module.exports = authRouter;