require("dotenv").config();
const app = require("./src/App");
const ConnectToDb = require("./src/config/Database");

try{
    ConnectToDb()
    app.listen(process.env.PORT,()=>{
        console.log("Server Run Successfully!");
        
    })
}catch(err){
    console.log("Error : ",err);
}