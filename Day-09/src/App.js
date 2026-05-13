const express = require("express");
const CookieParser = require("cookie-parser");
const AuthRouther = require("./routes/Auth.routes");


const app = express();

app.use(express.json());
app.use(CookieParser());

app.use("/api/auth",AuthRouther);

module.exports = app