const express = require('express');
const app = express();

app.use(express.json());
// Create Task Array
const Task = []; 

app.post("/task",(req,res)=>{
    Task.push(req.body)
    res.send("Task Completed")
})

app.get("/task",(req,res)=>{
    res.send(Task);
})

app.delete("/task/:index",(req,res)=>{
    delete Task[req.params.index]
})

app.patch("/task/:index",(req,res)=>{
    Task[req.params.index].Task = req.body.Task;
})

module.exports = app;