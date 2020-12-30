const arc = require("@architect/functions");
const { get } = require("tiny-json-http");

const { buildUrl, makeResponse } = require("../../shared/utils");

async function getTrack(req, headers) {
  const trackId = req.params.trackId;
  const market = req.session.user.country;

  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/tracks/${trackId}`,
    params: { market },
  });

  const result = await get({ url, headers });

  return result.body;
}

exports.handler = arc.http.async(makeResponse(getTrack));
