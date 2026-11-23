import { Message } from "discord.js";
import { getIn } from "./getIn.js";

// handles the prefix commands
async function handleCommand(msg: Message) {
  if (!msg.content.startsWith("misa")) return;
  if (msg.author.bot) return;

  // if the user inputs "misa", register them into the database
  if (msg.content == "misa") await getIn(msg);
  
  if (msg.content == "misa help") {
    const { help } = await import("./help.js");
    await help(msg);
  }
}

export { handleCommand };