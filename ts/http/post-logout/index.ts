import arc from "@architect/functions";

async function logout() {
  return {
    session: {},
    location: "/",
  };
}

export const handler = arc.http.async(logout);
