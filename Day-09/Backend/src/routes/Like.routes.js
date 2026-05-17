const express = require('express');
const likeController = require('../controllers/Like.controller');
const {identifyUser} = require("../middleware/Auth.middleware")
const likeRouter = express.Router();

likeRouter.post("/like/:postID",identifyUser,likeController);

module.exports = likeRouter;