import { createServer } from "http";
import { Server } from "socket.io";
import app from './src/app.js'

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log(`New connection id : ${socket.id}`);
  socket.on("message",(msg)=>{
    io.emit("abc",msg)
  })
});
httpServer.listen(5000,()=>{
    console.log("server runs successfully");
})