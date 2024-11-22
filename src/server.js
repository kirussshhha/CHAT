import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import connectToDatabase from "./config/connectToDatabase.js";
import messageModel from "./models/messageModel.js";
import roomModel from "./models/roomModel.js";

dotenv.config();
const httpServer = createServer();
const io = new Server(httpServer);
const port = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("пользователь подключился ");

  socket.on("createRoom", async (roomName) => {
    const roomKey = uuidv4().slice(0, 8);
    const room = new roomModel({ name: roomName, key: roomKey });
    await room.save();
    socket.emit("roomCreated", { roomKey });
    console.log(`Комната создана: ${roomName} (key: ${roomKey})`);
  });

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
