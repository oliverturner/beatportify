import { http } from "@architect/functions";

async function logout() {
  return {
    session: {},
    location: "/",
  };
}

export const handler = http.async(logout);
