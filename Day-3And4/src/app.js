const express = require("express");
const app = express();
app.use(express.json());
const notes = [];
app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.send("Task Created");
})
app.get("/notes",(req,res)=>{
    res.send(notes);
})

// Delete
app.delete("/notes/:index",(req,res)=>{
    //console.log(req.params.index);
    delete notes[req.params.index];
    res.send(`Task Deleted at index ${req.params.index}`);
    
})

// update
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].Task = req.body.Task;
    res.send(`Task Updated at index ${req.params.index}`);
})
module.exports = app