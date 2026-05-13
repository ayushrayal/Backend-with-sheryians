const express = require("express");
const { registerUser, loginUser } = require("../controllers/Auth.controller");

const AuthRouther = express.Router();

AuthRouther.post("/register", registerUser);
AuthRouther.post("/login", loginUser);

module.exports = AuthRouther;