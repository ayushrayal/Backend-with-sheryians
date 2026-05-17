const express = require("express");
const { registerUser, loginUser, PrivateRoute } = require("../controllers/Auth.controller");
const {identifyUser} = require("../middleware/Auth.middleware")
const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.patch("/privateorpublic", identifyUser,PrivateRoute)
module.exports = AuthRouter;