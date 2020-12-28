const arc = require("@architect/functions");
const { buildUrl } = require("../../shared/utils");

const loginURL = buildUrl({
  rootUrl: "https://accounts.spotify.com/authorize",
  params: {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.SPOTIFY_REDIRECT,
    response_type: "code",
    scope: "playlist-read-private user-top-read",
  },
});

async function login(req) {
  const account = req.session && req.session.account;

  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    statusCode: 200,
    body: JSON.stringify({
      user: account.user,
      loginURL,
      message: "Hello from Svelte + your Begin API!",
    }),
  };
}

exports.handler = arc.http.async(login);
