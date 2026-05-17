const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
    followerID:{
        type: String,
    },
    followingID:{
        type: String,
    },},
    {
    timestamps:true
})

followerSchema.index({followerID:1,followingID:1},{unique:true});

const followerModel = mongoose.model("Followers",followerSchema);

module.exports = followerModel;