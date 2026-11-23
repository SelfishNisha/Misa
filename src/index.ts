import { login } from "./core/login.js";
import { initializeDatabase } from "./database/db.js";
import { getClient } from "./env.js";
import { Events } from "discord.js";

const client = getClient();
initializeDatabase();

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}.`);
});

await login();