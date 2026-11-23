import type { Message } from "discord.js";
import { createPlayer, getPlayer } from "../database/db.js";

// register the user into the database

async function getIn(msg: Message) {
  const userId = msg.author.id;
  const existingPlayer = getPlayer(userId);

  if (existingPlayer) {
    await msg.reply("-");
    return;
  }

  const newPlayer = createPlayer(userId);
  msg.reply(`Welcome to Misa, ${msg.author}! You start with **${newPlayer.balance}** coins.`);
}

export { getIn };