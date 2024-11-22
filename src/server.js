import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToDatabase from "./config/connectToDatabase.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is listening on port ${port}`);
});
