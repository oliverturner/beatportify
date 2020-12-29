const arc = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("../../shared/utils");

async function getPlaylists(_req, headers) {
  const result = await get({
    url: "https://api.spotify.com/v1/me/playlists",
    headers,
  });

  return result.body;
}

exports.handler = arc.http.async(makeResponse(getPlaylists));
