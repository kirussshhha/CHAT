import readline from "readline";
import { io } from "socket.io-client";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = io("http://localhost:4000");

let username = "";
let roomKey = "";

const joinRoom = () => {
  rl.question(
    "Введите ключ для подключения к комнате или нажмите enter для создания: ",
    (input) => {
      if (input.trim() === "") {
        rl.question("Введите название для новой комнаты: ", (roomName) => {
          socket.emit("createRoom", roomName);
        });
      } else {
        roomKey = input.trim();
        rl.question("Ваше имя: ", (name) => {
          username = name;
          socket.emit("joinRoom", { roomKey, username });
        });
      }
    }
  );
};

socket.on("roomCreated", ({ roomKey }) => {
  console.log(`Ваш ключ для комнаты: ${roomKey}`);
  joinRoom();
});

socket.on("joinedRoom", ({ messages }) => {
  if (messages.length === 0) {
    console.log("Нет сообщений в комнате");
  } else {
    messages.forEach((message) => {
      console.log(`${message.username}: ${message.text}`);
    });
  }
  startChat();
});

const startChat = () => {
  rl.question("Введите ваше сообщение: ", (message) => {
    if (message.trim() === "") {
      console.log("Сообщение не может быть пустым!");
      return startChat();
    }

    socket.emit("sendMessage", { roomKey, username, text: message.trim() });

    startChat();
  });
};

joinRoom();
