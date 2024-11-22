import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI);

    console.log("База данных подключена");
  } catch (err) {
    console.error("Ошибка подключения к базе данных: ", err.message);
  }
};

export default connectToDatabase;
