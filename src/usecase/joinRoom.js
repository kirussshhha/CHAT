import { findRoomByKey } from "../repository/roomRepository.js";
import {
  findUserByRoomAndName,
  createUser,
} from "../repository/userRepository.js";

export const handleJoinRoom = async (roomKey, username) => {
  const room = await findRoomByKey(roomKey);

  if (!room) {
    throw new Error("Комната не найдена.");
  }

  const messages = room.messages.map((message) => ({
    text: message.text,
    username: message.userId?.username || "Неизвестный пользователь",
  }));

  let user = await findUserByRoomAndName(roomKey, username);

  if (!user) {
    user = await createUser(roomKey, username);
  }

  return { messages };
};
