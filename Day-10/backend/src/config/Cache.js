const Redis = require("ioredis").default;

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})

redisClient.on("connect", () => {
    console.log("Server Connected to the REDIS");

})

redisClient.on("error", (Error) => {
    console.log(Error);
})

module.exports = { redisClient }