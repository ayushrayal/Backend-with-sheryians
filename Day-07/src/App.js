const express = require("express");
const cookieParser = require("cookie-parser");
const AuthRouter = require("../src/routes/Auth.routes")
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",AuthRouter);

module.exports = app