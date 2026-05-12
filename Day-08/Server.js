require("dotenv").config();
const app = require("./src/App");
const ConnectToDB = require("./src/config/Database");

try{
    ConnectToDB();
    app.listen(process.env.PORT,()=>{
        console.log("Server Runs Successfully!");   
    })
} catch (err) {
    console.log("Error : ",err)
}