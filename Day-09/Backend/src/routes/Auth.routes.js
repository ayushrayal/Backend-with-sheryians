const express = require("express");
const { registerUser, loginUser, PrivateRoute,getMe } = require("../controllers/Auth.controller");
const {identifyUser} = require("../middleware/Auth.middleware")
const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.patch("/privateorpublic", identifyUser,PrivateRoute);
AuthRouter.get("/get-me",identifyUser, getMe);
module.exports = AuthRouter;