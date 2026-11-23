import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

function getToken(): string {
  const token = process.env.token;
  return token ? token : "";
}

function getClient(): Client {
  return client;
}

export { getToken, getClient };