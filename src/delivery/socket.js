import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { handleCreateRoom } from "../usecase/createRoom.js";
import { handleJoinRoom } from "../usecase/joinRoom.js";
import { handleSendMessage } from "../usecase/sendMessage.js";

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("пользователь подключился");

    socket.on("createRoom", async (roomName) => {
      try {
        const { roomKey } = await handleCreateRoom(roomName, uuidv4);
        socket.emit("roomCreated", { roomKey });
        console.log(`Комната создана: ${roomName} (key: ${roomKey})`);
      } catch (error) {
        socket.emit("error", "Ошибка при создании комнаты.");
      }
    });

    socket.on("joinRoom", async ({ roomKey, username }) => {
      try {
        const { messages } = await handleJoinRoom(roomKey, username);
        socket.emit("joinedRoom", { messages });
      } catch (error) {
        socket.emit("error", error.message);
      }
    });

    socket.on("sendMessage", async ({ roomKey, username, text }) => {
      try {
        await handleSendMessage(roomKey, username, text);
      } catch (error) {
        socket.emit("error", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("пользователь отключился");
    });
  });
};
