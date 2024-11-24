import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export const sendDiscordWebhook = async (message) => {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: message,
      username: "Notification Bot",
    });
    console.log("Сообщение успешно отправлено!");
  } catch (error) {
    console.error("Ошибка при отправке вебхука:", error.message);
  }
};
