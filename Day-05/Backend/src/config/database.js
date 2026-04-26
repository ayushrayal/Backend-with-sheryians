const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect(process.env.Mongo_URL)
    .then(()=>{
        console.log("Database Connectivity Done.");
    })
    .catch(err=>console.log("Error : ",err));
}

module.exports = connectToDB