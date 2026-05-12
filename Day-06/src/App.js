const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouther = require("../src/routes/auth.routes");
const authGetTouther = require("../src/routes/authget.routes");
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authGetTouther)
app.use("/api/auth",authRouther);
module.exports = app

