require('dns').setDefaultResultOrder('ipv4first');
require("dotenv").config();
const app = require("./src/App")
const connectDB = require("./src/config/database");

connectDB();
app.listen(process.env.PORT,()=>{
    console.log("Server Starts Successfully");
    
})