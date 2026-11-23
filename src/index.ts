import { login } from "./core/login.js";
import { initializeDatabase } from "./database/db.js";
import { handleCommand } from "./commands/commandHandler.js";
import { getClient } from "./env.js";
import { Events } from "discord.js";

const client = getClient();
initializeDatabase();

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}.`);
});

client.on(Events.MessageCreate, msg => handleCommand(msg));

await login();