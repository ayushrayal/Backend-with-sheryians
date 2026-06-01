const express = require("express");
const { UserFollowController, UserUnfollowController, getFollowersController,getFollowingController,othersProfileController} = require("../controllers/UserFollow.controller");
const {identifyUser} = require("../middleware/Auth.middleware");

const UserRouter = express.Router();

UserRouter.post("/follow/:username", identifyUser, UserFollowController);
UserRouter.post("/unfollow/:username", identifyUser, UserUnfollowController);
UserRouter.get("/followers",identifyUser,getFollowersController)
UserRouter.get("/following",identifyUser,getFollowingController)
UserRouter.get("/others-profile",identifyUser,othersProfileController)
module.exports = UserRouter;