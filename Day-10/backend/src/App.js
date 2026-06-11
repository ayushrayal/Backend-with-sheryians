const express = require("express");
const { AuthRouter } = require("./routes/Auth.route");
const cookieParser = require("cookie-parser")
const app = express();

app.use(cookieParser())
app.use(express.json());

app.use("/api/auth",AuthRouter);

module.exports = app;