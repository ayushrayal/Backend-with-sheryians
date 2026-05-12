const mongoose = require("mongoose");

const connectToDB = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database Connected Successfully.");
    })
    .catch(e=>console.log("Error ",e)
    )
}

module.exports = connectToDB;