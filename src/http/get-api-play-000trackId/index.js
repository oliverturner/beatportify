const arc = require("@architect/functions");
const { put } = require("tiny-json-http");

const { makeResponse } = require("../../shared/utils");

async function playTrack(req, headers) {
  const trackId = req.params.trackId;

  const result = await put({
    url: `https://api.spotify.com/v1/me/player/play`,
    headers,
    data: {
      uris: [`spotify:track:${trackId}`],
    },
  });

  return result.body;
}

exports.handler = arc.http.async(makeResponse(playTrack));
