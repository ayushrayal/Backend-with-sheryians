const express = require('express');
const app = express();

app.use(express.json());
// Create Task Array
const Task = []; 

app.post("/task",(req,res)=>{
    Task.push(req.body)
    res.status(201).json({
        message:"Task Created Successfully."
    })
})

app.get("/task",(req,res)=>{
    res.status(200).json({
        Task:Task
    })
})

app.delete("/task/:index",(req,res)=>{
    delete Task[req.params.index]
    res.status(204).json({
        message: "Task Deleted Successfully."
    })
})

app.patch("/task/:index",(req,res)=>{
    Task[req.params.index].Task = req.body.Task;
    res.status(200).json({
        message: "Task Updated Successfully."
    })
})

module.exports = app;