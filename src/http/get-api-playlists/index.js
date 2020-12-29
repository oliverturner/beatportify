const arc = require("@architect/functions");
const { get } = require("tiny-json-http");

async function playlist(req) {
  const account = req.session && req.session.account;
  if (!account) return { location: "/" };

  const result = await get({
    url: "https://api.spotify.com/v1/me/playlists",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${account.accessToken}`,
    },
  });

  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    statusCode: 200,
    body: JSON.stringify(result.body.items),
  };
}

exports.handler = arc.http.async(playlist);
