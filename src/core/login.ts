import { getClient, getToken } from "../env.js";

async function login() {
  const client = getClient();
  const token = getToken();

  try {
    await client.login(token);
  } catch (error) {
    console.error("Login failed: ", error);
  }
}

export { login };