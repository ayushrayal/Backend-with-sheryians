const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes",(req,res)=>{
    notes.push(req.body);
    res.status(201).json({
        message:"Note Created Successfully."
    })
})

app.get("/notes",(req,res)=>{
    res.status(201).json({
        notes
    })
})

app.delete("/notes/:id",(req,res)=>{
    const id = req.params.id;
    delete notes[id];
    res.status(201).json({
        message:"Notes delete successfully."
    })
})

app.patch("/notes/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const {description} = req.body;
    notes[id].description= description;
    res.status(200).json({
        message:"Notes update successfully."
    })
})

module.exports = app