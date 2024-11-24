import userModel from "../models/userSchema.js";

export const findUserByRoomAndName = async (roomKey, username) => {
  return await userModel.findOne({ roomKey, username });
};

export const createUser = async (roomKey, username) => {
  const user = new userModel({ roomKey, username });
  return await user.save();
};
