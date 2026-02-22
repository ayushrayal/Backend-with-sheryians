require("dotenv").config();
const app = require("./src/app");
const connectTodb = require("./src/config/database")

const port = 3000;
connectTodb()
app.listen(port,()=>{
    console.log("Server successfully connected.");
})