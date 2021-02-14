const { http } = require("@architect/functions");

async function logout() {
  return {
    session: {},
    location: "/",
  };
}

module.exports = {
  handler: http.async(logout),
};
