const mongoose = require("mongoose");

function connectToDB(){
    return mongoose.connect(process.env.Mongo_URL)
    .then(()=>{
        console.log("Database Connectivity Done.");
    })
    .catch(err=>{
        console.error("Database Connectivity Error:", err);
        throw err;
    });
}

module.exports = connectToDB