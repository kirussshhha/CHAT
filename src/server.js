import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import connectToDatabase from "./config/connectToDatabase.js";
import messageModel from "./models/messageModel.js";

dotenv.config();
const httpServer = createServer();
const io = new Server(httpServer);
const port = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("пользователь подключился ");

  socket.on("joinRoom", async () => {
    const messages = await messageModel.find();

    if (!messages) {
      console.log("сообщений нет");
      return;
    }

    socket.emit("joinedRoom", { messages });
  });

  socket.on("sendMessage", async ({ username, text }) => {
    const message = new messageModel({ username, text });
    await message.save();
    io.emit("newMessage", { username, text });
    console.log(`${username}: ${text}`);
  });

  socket.on("disconnect", () => {
    console.log("пользователь отключился");
  });
});

httpServer.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is listening on port ${port}`);
});
