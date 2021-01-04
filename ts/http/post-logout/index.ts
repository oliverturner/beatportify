import { http } from "@architect/shared/arc";

async function logout() {
  return {
    session: {},
    location: "/",
  };
}

export const handler = http.async(logout);
