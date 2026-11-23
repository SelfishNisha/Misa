import { login } from "./core/login.js";
import { getClient } from "./env.js";
import { Events } from "discord.js";

const client = getClient();

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}.`);
});

await login();