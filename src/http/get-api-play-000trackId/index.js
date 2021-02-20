/**
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 */

const { http } = require("@architect/functions");
const { put } = require("tiny-json-http");

const { makeResponse } = require("@architect/shared/utils");

/** @type {ApiRequest} */
const playTrack = async (req, headers) => {
  const trackId = req.params.trackId;

  try {
    const result = await put({
      url: `https://api.spotify.com/v1/me/player/play`,
      headers,
      data: {
        uris: [`spotify:track:${trackId}`],
      },
    });

    return { ...result };
  } catch (error) {
    // no device available for playback
    if (error.statusCode === 404) {
      return error.body;
    }

    throw error;
  }
};

module.exports = {
  handler: http.async(makeResponse(playTrack)),
};
