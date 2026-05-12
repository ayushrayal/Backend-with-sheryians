const mongoose = require('mongoose');

const ConnectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Database Connected Successfully!");
        
    } catch (e) {
        console.log(e);
    }
}

module.exports = ConnectToDB;