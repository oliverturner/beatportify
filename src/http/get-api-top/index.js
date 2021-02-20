/**
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 * @typedef {import("@typings/spotify").TopTimeRange} TopTimeRange
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("@architect/shared/utils");
const { getTracksAudio } = require("@architect/shared/audio");

const LIMIT = 48;
const TIME_RANGE = "short_term";
const ROOT_URL = "https://api.spotify.com/v1/me/top";

/** @type {ApiRequest} */
const getTop = async (req, headers) => {
  const limit = req.query.limit || LIMIT;
  const timeRange = /** @type {TopTimeRange} */ (req.query.timeRange || TIME_RANGE);

  const url = `${ROOT_URL}/tracks?time_range=${timeRange}&limit=${limit}`;
  const page = (await get({ url, headers })).body;
  const tracks = await getTracksAudio(page.items, headers);

  return req.query.debug ? { page } : { tracks };
};

module.exports = {
  handler: http.async(makeResponse(getTop)),
};
