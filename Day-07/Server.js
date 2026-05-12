require("dotenv").config();
const app = require("./src/App");
const ConnectToDB = require("./src/config/Database");

try{
    ConnectToDB();
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}catch(err){
    console.log("Error : ",err);
}