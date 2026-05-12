const mongoose = require("mongoose");

const ConnectToDB = async (req,res)=>{
    await mongoose.connect(process.env.MONgO_URI)
    .then(()=>{
        console.log("MongoDB Connects Successfully!");
    })
    .catch((err)=>{
        console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = ConnectToDB;