import type { Message } from "discord.js";
import { createPlayer, getPlayer } from "../database/db.js";
import { help } from "./help.js";

// register the user into the database
async function getIn(msg: Message) {
  const userId = msg.author.id;
  const existingPlayer = getPlayer(userId);

  if (existingPlayer) {
    await help(msg);
    return;
  }

  const newPlayer = createPlayer(userId);
  await msg.reply(`<@${newPlayer.discordId}> you were registered into the database with ${newPlayer.balance} starting balance.`);
}

export { getIn };