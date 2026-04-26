const express = require("express");
const noteModel = require("./models/notes.model");
const app = express();
app.use(express.json());
app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body;
    const notes = await noteModel.create({
        title,description
    })
    res.status(202).json({
        message:"Note Created Successfully",
        notes
    })
})
app.get("/api/notes",async(req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"Notes fetched Successfully.",
        notes
    })
})
app.delete("/api/notes/:id",async(req,res)=>{
    const {id}= req.params;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message:"Note Deleted Successfully."
    })
})
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    const {description} = req.body;
    await noteModel.findByIdAndUpdate(id,{description});
    res.status(200).json({
        message:"Note Updated Successfully."
    })
})
module.exports = app