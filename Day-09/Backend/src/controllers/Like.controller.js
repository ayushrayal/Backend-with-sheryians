const likeModel = require("../models/Like.model");
const postModel = require("../models/Post.model");

async function likeController(req, res) {
    try {

        const username = req.user.username;
        const postID = req.params.postID;

        // Check post exists
        const isPostExists = await postModel.findById(postID);

        if (!isPostExists) {
            return res.status(404).json({
                message: "Post does not exist!"
            });
        }

        // Check already liked
        const alreadyLiked = await likeModel.findOne({
            username,
            postID
        });

        if (alreadyLiked) {
            return res.status(400).json({
                message: "Post already liked!"
            });
        }

        // Create like
        const like = await likeModel.create({
            username,
            postID
        });

        res.status(200).json({
            message: "Post liked successfully!",
            like
        });

    } catch (error) {

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });

    }
}
async function unlikeController(req, res) {
    
}
module.exports = likeController;