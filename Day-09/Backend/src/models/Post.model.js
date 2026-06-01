const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        require:[true,"Image URL is required!"]
    },
    userId:{
        ref:"Users",
        type:mongoose.Schema.Types.ObjectId,
        require:[true,"User ID is required!"]
    },
    likesCount:{
        type:Number,
        default:0
    },
}, { timestamps: true })

const postModel = mongoose.model("Posts",postSchema);

module.exports = postModel;