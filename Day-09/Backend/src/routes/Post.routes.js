const express = require("express");
const postModel = require("../models/Post.model");
const { identifyUser } = require("../middleware/Auth.middleware");
const {PostCreateController,PostGetController,PostDetailController} = require("../controllers/Post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const PostRouter = express.Router();

PostRouter.post("/",identifyUser,upload.single("imgUrl"), PostCreateController);
PostRouter.get("/",identifyUser,PostGetController);
PostRouter.get("/details/:postId",identifyUser,PostDetailController);

module.exports = PostRouter;