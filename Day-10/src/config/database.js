const mongoose = require("mongoose");
async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb connected.");
}

module.exports = connectToDb