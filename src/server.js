import dotenv from "dotenv";
import { createServer } from "http";
import connectToDatabase from "./config/connectToDatabase.js";
import { initializeSocket } from "./delivery/socket.js";

dotenv.config();
const httpServer = createServer();
initializeSocket(httpServer);

const port = process.env.PORT || 4000;

httpServer.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is listening on port ${port}`);
});
