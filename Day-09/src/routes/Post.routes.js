const express = require("express");
const postModel = require("../models/Post.model");
const {PostCreateController,PostGetController,PostDetailController} = require("../controllers/Post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const PostRouter = express.Router();

PostRouter.post("/",upload.single("imgUrl"), PostCreateController);
PostRouter.get("/",PostGetController);
PostRouter.get("/details/:postId",PostDetailController);

module.exports = PostRouter;