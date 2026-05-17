const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true,"username is required!"]
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        unique: [true,"postID is required!"],
        ref:"Posts"
    }
}, { timestamps: true });
likeSchema.index({ userID: 1, postID: 1 }, { unique: true });
const likeModel = mongoose.model('Like', likeSchema);
module.exports = likeModel;