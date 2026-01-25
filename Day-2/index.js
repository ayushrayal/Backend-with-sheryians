let express = require('express');

let app = express();

app.get("/",(req,res)=>{
    res.send("This is main page!!")
})
app.get("/about",(req,res)=>{
    res.send("This is about page!!")
})
app.get("/content",(req,res)=>{
    res.send("This is Content page!!")
})
app.listen(3000);