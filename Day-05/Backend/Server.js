require("dotenv").config();
const app = require("./src/App");
const connectToDB = require("./src/config/database");
connectToDB()
app.listen(process.env.PORT,()=>{
    console.log("Servers Starts Succesfully");
})
