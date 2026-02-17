const mongoose = require('mongoose');

function connetToDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
}

module.exports = connetToDB;