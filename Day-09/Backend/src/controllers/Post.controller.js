const postModel = require("../models/Post.model");
const likeModel = require("../models/Like.model");
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require("jsonwebtoken");
const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
async function PostCreateController(req, res) {

    try {
        const decoded = req.user;
        const userId = decoded.id;

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            })
        }

        // Upload Image
        const file = await imageKit.files.upload({

            file: await toFile(
                Buffer.from(req.file.buffer),
                req.file.originalname
            ),

            fileName: Date.now() + req.file.originalname,

            folder: "/InstaClone/InstaPosts"

        });

        try {

            // Save DB
            const post = await postModel.create({

                caption: req.body.caption,

                imgUrl: file.url,

                userId: decoded.id

            });

            return res.status(201).json({
                message: "Post created successfully!",
                post
            });

        } catch (dbError) {

            // Delete uploaded image
            await imageKit.files.deleteFile(file.fileId);

            return res.status(500).json({
                message: "Database error!",
                error: dbError.message
            });

        }

    } catch (err) {

        return res.status(401).json({
            message: "Unauthorized Access!",
            error: err.message
        })

    }

}

async function PostGetController(req,res){
    const decoded = req.user;
    const userId = decoded.id;
    const posts = await postModel.find({
        userId
    })
    res.status(200).json({
        message:"Users All Post!",
        posts
    })
}

async function PostDetailController(req, res) {
    const decoded = req.user;
    const userId = decoded.id;
    const postId = req.params.postId;


    try {
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found!"
            });
        }

        const isUserValid = post.userId.toString() === userId;
        if (!isUserValid) {
            return res.status(403).json({
                message: "Forbidden Access!"
            });
        }

        return res.status(200).json({
            message: "Post Details!",
            post
        });
    } catch (err) {
        // Handle CastError for invalid ObjectId
        if (err.name === 'CastError') {
            return res.status(400).json({
                message: "Invalid Post ID format."
            });
        }
        // Handle any other unexpected errors
        return res.status(500).json({
            message: "Internal server error.",
            err: err.message
        });
    }
}   

async function FeedController(req, res) {
    const user = req.user;
    const userId = user.id;
    const posts = await Promise.all((await postModel.find().populate("userId", "username profileImage").lean())
        .map(async (post) => {
            const isliked = await likeModel.findOne({
               username: user.username,
                postID: post._id,
                
            }) 
            post.isliked = !!isliked;
            return post;
        }));

    res.status(200).json({
        message: "Feed Posts!",
        posts
    })
}
module.exports = {
    PostCreateController ,PostGetController,PostDetailController,FeedController
}