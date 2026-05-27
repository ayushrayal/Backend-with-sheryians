const express = require('express');
const {likeController, unlikeController} = require('../controllers/Like.controller');
const {identifyUser} = require("../middleware/Auth.middleware")
const likeRouter = express.Router();

// Debug endpoint to verify routing works
likeRouter.get("/test", (req, res) => {
    res.json({ message: "Like router is working!" });
});

likeRouter.post("/like/:postID",identifyUser,likeController);
likeRouter.post("/unlike/:postID",identifyUser,unlikeController);

module.exports = likeRouter;