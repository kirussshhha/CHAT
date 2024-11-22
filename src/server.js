import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import connectToDatabase from "./config/connectToDatabase.js";

dotenv.config();
const httpServer = createServer();
const io = new Server(httpServer);
const port = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("пользователь подключился ");

  socket.on("message", (message) => {
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log("пользователь отключился");
  });
});

httpServer.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is listening on port ${port}`);
});
