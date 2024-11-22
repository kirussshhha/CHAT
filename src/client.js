import readline from "readline";
import { io } from "socket.io-client";

let username;

const socket = io("http://localhost:4000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
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

rl.question("Введите ваше имя: ", (name) => {
  if (name.trim() === "") {
    console.log("Имя не может быть пустым!");
    return rl.close();
  }

  username = name;
  console.log(`Привет, ${username}! Вы можете отправлять сообщения.`);

  startChat();
});
