const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name:String,
    task:String,
});