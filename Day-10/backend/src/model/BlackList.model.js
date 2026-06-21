const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required!"]
    }
}, {
    timestamps: true
})

const blckListModel = mongoose.model("blacklist", blackListSchema)

module.exports = blckListModel;