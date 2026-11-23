import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

/** A player's persistent life-simulator data. */
interface Player {
  discordId: string;
  balance: number;
  level: number;
  experience: number;
  inventory: Record<string, number>;
}

/** The complete JSON database structure. */
interface DatabaseData {
  players: Record<string, Player>; // Discord ID to player data.
}

// All runtime player data is stored in this JSON file.
const databasePath = "data/db.json";
let data: DatabaseData = { players: {} };

/**
 * Loads the database from disk, or creates an empty database if it does not exist.
 */
function initializeDatabase(): DatabaseData {
  mkdirSync("data", { recursive: true });

  try {
    data = JSON.parse(readFileSync(databasePath, "utf8")) as DatabaseData;
  } catch (error) {
    // ENOENT means the database file has not been created yet.
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }

    saveDatabase();
  }

  return data;
}

/** Writes the current in-memory database to disk. */
function saveDatabase(): void {
  mkdirSync("data", { recursive: true });
  writeFileSync(databasePath, JSON.stringify(data, null, 2), "utf8");
}

/** Returns a player using their Discord ID, or undefined if they do not exist. */
function getPlayer(discordId: string): Player | undefined {
  return data.players[discordId];
}

/** Creates a new player with default values, or returns an existing player. */
function createPlayer(discordId: string): Player {
  if (data.players[discordId]) {
    return data.players[discordId];
  }

  // Starting values for a new life-simulator character.
  const player: Player = {
    discordId,
    balance: 1000,
    level: 1,
    experience: 0,
    inventory: {},
  };

  data.players[discordId] = player;
  saveDatabase();
  return player;
}

/** Applies updates to a player's data and saves the database. */
function updatePlayer(discordId: string, updates: Partial<Player>): Player | undefined {
  const player = data.players[discordId];
  if (!player) return undefined;

  Object.assign(player, updates, {
    // Never allow player updates to change the Discord ID or remove the inventory.
    discordId,
    inventory: updates.inventory ?? player.inventory,
  });

  saveDatabase();
  return player;
}

export {
  databasePath,
  initializeDatabase,
  saveDatabase,
  getPlayer,
  createPlayer,
  updatePlayer,
};

export type { DatabaseData, Player };
