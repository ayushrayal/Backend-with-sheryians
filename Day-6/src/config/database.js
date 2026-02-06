
const mongoose = require("mongoose");
function connectToDb() {
  mongoose
    .connect(
      process.env.MONG_URL,
    )
    .then(() => {
      console.log("Connect to database.");
    });
}
module.exports = connectToDb;