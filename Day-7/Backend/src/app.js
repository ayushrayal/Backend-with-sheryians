const express = require('express');
const cors = require('cors');
const path = require('path');
const noteModel = require("./models/task.model");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
/*
* - Post /api/notes
* - Create a new note with the provided Title and Description in the req.body.
* - Response should include a message and the created note.
*/ 
app.post("/api/notes", async (req,res)=>{
    const { Title, Description } = req.body;

    const note = await noteModel.create({
        Title: Title,
        Description: Description
    });
    res.status(201).json({
        message: "Note Created Successfully.",
        note
    });
});

/*
* - Get /api/notes
* - Fetch all the notes from the database and return them in the response.
* - Response should include a message and the list of notes.
*/
app.get("/api/notes", async (req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Notes Fetched Successfully.",
        notes
    })
})

/*
* - Delete /api/notes/:id
* - Delete the note with the specified ID from the req.params.id.
*/
app.delete("/api/notes/:id", async (req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "Note Deleted Successfully."
    })
})

/*
* - Patch /api/notes/:id
* - Update the note with the specified ID from the req.params.id.
* - req.body = {Description}
*/
app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id;
    const { Title, Description } = req.body;
    await noteModel.findByIdAndUpdate(id,{Title, Description});
    res.status(200).json({
        message:"Notes Updated successfully."
    })
})

app.use("*name", (req,res)=>{
    res.sendFile(path.join(__dirname, "..","/public/index.html"));
})

module.exports = app