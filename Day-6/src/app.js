const express = require("express");
const taskModel = require("./models/task.model")
const app = express();
app.use(express.json());
app.post("/tasks",async (req,res)=>{
    const {Name,Task,Age} = req.body;
    const taskCreated = await taskModel.create({
        Name,Task,Age
    })
    res.status(201).json({
        message: "Task Created Successfully",
        taskCreated
    })
})

module.exports = app