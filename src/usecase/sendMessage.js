import { findUserByRoomAndName } from "../repository/userRepository.js";
import {
  findRoomByKey,
  addMessagesToRoom,
} from "../repository/roomRepository.js";
import { createMessage } from "../repository/messageRepository.js";

export const handleSendMessage = async (roomKey, username, text) => {
  const user = await findUserByRoomAndName(roomKey, username);
  if (!user) {
    throw new Error("Пользователь не найден.");
  }

  const room = await findRoomByKey(roomKey);
  if (!room) {
    throw new Error("Комната не найдена.");
  }

  const message = await createMessage(text, user._id);
  await addMessagesToRoom(room, message._id);
};
