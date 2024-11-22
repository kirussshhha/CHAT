import readline from "readline";
import { io } from "socket.io-client";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = io("http://localhost:4000");

let username;

socket.emit("createRoom", "Посиделки");

socket.on("roomCreated", ({ roomKey }) => {
  if (!roomKey) {
    console.log("Ошибка при создании ключа");
    return;
  }
  console.log(`Ваш ключ для комнаты: ${roomKey}`);
});

socket.emit("joinRoom");

socket.on("joinedRoom", ({ messages }) => {
  if (messages.length === 0) {
    console.log("Нет сообщений в комнате");
  } else {
    messages.forEach((message) => {
      console.log(`${message.username}: ${message.text}`);
    });
  }

  rl.question("Введите ваше имя: ", (name) => {
    if (name.trim() === "") {
      console.log("Имя не может быть пустым!");
      return rl.close();
    }

    username = name;
    console.log(`Привет, ${username}! Вы можете отправлять сообщения.`);

    startChat();
  });
});

const startChat = () => {
  rl.question("Введите ваше сообщение: ", (message) => {
    if (message.trim() === "") {
      console.log("Сообщение не может быть пустым!");
      return startChat();
    }

    socket.emit("sendMessage", { username, text: message });

    startChat();
  });
};
