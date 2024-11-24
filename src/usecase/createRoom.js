import { createRoom } from "../repository/roomRepository.js";

export const handleCreateRoom = async (roomName, uuidv4) => {
  const roomKey = uuidv4().slice(0, 8);
  await createRoom(roomName, roomKey);
  return { roomKey };
};
