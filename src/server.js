import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
});
