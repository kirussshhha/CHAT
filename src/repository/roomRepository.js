import roomModel from "../models/roomModel.js";

export const createRoom = async (name, key) => {
  const room = new roomModel({ name, key });
  return await room.save();
};

export const findRoomByKey = async (key) => {
  return await roomModel.findOne({ key }).populate({
    path: "messages",
    populate: {
      path: "userId",
      select: "username",
    },
  });
};

export const addMessagesToRoom = async (room, messageId) => {
  room.messages.push(messageId);
  return await room.save();
};
