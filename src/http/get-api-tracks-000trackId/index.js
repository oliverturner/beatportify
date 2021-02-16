/**
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { buildUrl, makeResponse } = require("@architect/shared/utils");

/** @type {ApiRequest} */
const getTrack = async (req, headers) => {
  const trackId = req.params.trackId;
  const market = req.session.user.country;

  // TODO: get track analysis from https://api.spotify.com/v1/audio-analysis/{id}
  const url = buildUrl({ endpoint: `/tracks/${trackId}`, params: { market } });
  const result = await get({ url, headers });

  return result.body;
};

module.exports = {
  handler: http.async(makeResponse(getTrack)),
};
