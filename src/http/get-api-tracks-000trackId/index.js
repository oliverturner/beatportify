const arc = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("../../shared/utils");

async function getTrack(req, headers) {
  const trackId = req.params.trackId;

  const result = await get({
    url: `https://api.spotify.com/v1/tracks/${trackId}`,
    headers,
  });

  return result.body;
}

exports.handler = arc.http.async(makeResponse(getTrack));
