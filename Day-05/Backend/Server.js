require("dotenv").config();
const app = require("./src/App");
const connectToDB = require("./src/config/database");

const PORT = process.env.PORT || 3000;

connectToDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(() => {
        console.error("Failed to start server due to DB connection error.");
        process.exit(1);
    });
