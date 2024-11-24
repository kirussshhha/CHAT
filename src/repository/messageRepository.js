import messageModel from "../models/messageModel.js";

export const createMessage = async (text, userId) => {
  const message = new messageModel({ text, userId });
  return await message.save();
};
