import readline from "readline";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("message", (message) => {
  console.log(message);
});

socket.emit("message", "hello");
