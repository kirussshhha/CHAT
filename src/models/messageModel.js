import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    roomKey: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
