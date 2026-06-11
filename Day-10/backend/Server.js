require("dotenv").config();
const app = require("./src/App");
const { connectToDB } = require("./src/config/Database");

connectToDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});