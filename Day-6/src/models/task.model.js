const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    Name:String,
    Task:String,
    Age:Number
});

const taskModel = mongoose.model("task",taskSchema);

module.exports = taskModel;