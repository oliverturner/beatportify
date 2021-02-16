/**
 * @typedef {import("@typings/index").ApiPageRequest} ApiPageRequest
 * @typedef {import("@typings/spotify").Playlist} Playlist
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("@architect/shared/utils");

const legalParams = ["limit", "offset"];

/** @type {ApiPageRequest<Playlist>} */
const getPlaylists = async (req, headers) => {
  try {
    const url = new URL("https://api.spotify.com/v1/me/playlists");
    for (const [k, v] of Object.entries(req.query)) {
      if (legalParams.includes(k)) {
        url.searchParams.set(k, v);
      }
    }

    const result = await get({ url, headers });

    return result.body;
  } catch (err) {
    return { err };
  }
};

module.exports = {
  handler: http.async(makeResponse(getPlaylists)),
};
