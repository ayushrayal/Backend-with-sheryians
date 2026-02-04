const mongoose = require("mongoose");
function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://ayush:JK05JDlUZM9SUXz0@cluster0.cu28gyj.mongodb.net/Day-6",
    )
    .then(() => {
      console.log("Connect to database.");
    });
}
module.exports = connectToDb;