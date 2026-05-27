const express = require("express");
const CookieParser = require("cookie-parser");
const cors = require("cors");

const AuthRouter = require("./routes/Auth.routes");
const PostRouter = require("../src/routes/Post.routes");
const UserRouter = require("./routes/UserFollow.routes");
const likeRouter = require("./routes/Like.routes");

const app = express();

app.use(express.json());
app.use(CookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Debug: Log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use("/api/auth",AuthRouter);
app.use("/api/posts",PostRouter);
app.use("/api",UserRouter)
app.use("/api",likeRouter)

module.exports = app