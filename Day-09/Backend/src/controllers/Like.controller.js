const likeModel = require("../models/Like.model");
const postModel = require("../models/Post.model");

async function likeController(req, res) {
    try {

        const username = req.user.username;
        const { postID } = req.params;
        console.log("Post ID:", postID);
        // Check post exists
        const isPostExists = await postModel.findById(postID);

        if (!isPostExists) {
            return res.status(404).json({
                message: "Post does not exist!"
            });
        }

        // Check already liked
        const alreadyLiked = await likeModel.findOne({
            username: username,
            postID: postID
        });

        if (alreadyLiked) {
            return res.status(400).json({
                message: "Post already liked!"
            });
        }

        // Create like
        const like = await likeModel.create({
            username: username,
            postID: postID
        });

        const totalLikes = await likeModel.countDocuments({ postID: postID });
        await postModel.findByIdAndUpdate(postID, { likesCount: totalLikes });

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

async function unlikeController(req,res){
    try{
        const username = req.user.username;
        const { postID } = req.params;

        const isPostExists = await likeModel.findOne({
            username: username,
            postID: postID
        });

        if (!isPostExists) {
            return res.status(404).json({
                message: "Like does not exist!"
            });
        }

        // Delete like
        await likeModel.findByIdAndDelete(isPostExists._id);

        const totalLikes = await likeModel.countDocuments({ postID });
        await postModel.findByIdAndUpdate(postID, { likesCount: totalLikes });

        res.status(200).json({
            message: "Post unliked successfully!"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports = {likeController, unlikeController};