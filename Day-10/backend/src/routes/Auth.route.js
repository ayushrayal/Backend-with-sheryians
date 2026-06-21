const mongoose = require("mongoose");
const express = require("express");
const AuthController = require("../controllers/Auth.controller");
const AuthRouter = express.Router();
const { identifier } = require("../middleware/Auth.middleware");

AuthRouter.post("/register", AuthController.registerController);

AuthRouter.post("/login", AuthController.loginController);

AuthRouter.post("/logout", AuthController.logoutController)

AuthRouter.get("/getme", identifier, AuthController.getProfileController)

module.exports = { AuthRouter };
