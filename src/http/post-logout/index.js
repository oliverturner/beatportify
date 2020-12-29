const arc = require("@architect/functions");

async function logout(req) {
  return {
    session: {},
    location: "/",
  };
}

exports.handler = arc.http.async(logout);
