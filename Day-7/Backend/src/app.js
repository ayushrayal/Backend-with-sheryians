const express = require('express');
const noteModel = require("./models/task.model");
const app = express();
app.use(express.json());
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


module.exports = app