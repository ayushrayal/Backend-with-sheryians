const mongoose = require('mongoose');

const ConnectToDB = async(req,res)=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Connects Successfully!");})
    .catch((err)=>{
        console.log("Error : ",err); 
    })
}

module.exports = ConnectToDB;