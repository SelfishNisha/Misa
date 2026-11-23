import { Message } from "discord.js";
import { getIn } from "./getIn.js";

async function handleCommand(msg: Message) {
  if (!msg.content.startsWith("misa")) return;
  if (msg.author.bot) return;
  if (msg.content == "misa") await getIn(msg);
}

export { handleCommand };