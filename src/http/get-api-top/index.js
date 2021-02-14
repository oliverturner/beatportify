import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";
import { getTracksAudio } from "@architect/shared/audio";

const LIMIT = 48;
const TIME_RANGE = "short_term";
const ROOT_URL = "https://api.spotify.com/v1/me/top/";

/**
 * @typedef {import("@typings/index").ApiRequest} ApiPageRequest
 * @typedef {import("@typings/spotify").TopTimeRange} TopTimeRange
 */

/** @type {ApiRequest} */
const getTop = async (req, headers) => {
  const limit = req.query.limit || LIMIT;

  /** @type {TopTimeRange} */
  const timeRange = req.query.timeRange || TIME_RANGE;

  const url = `${ROOT_URL}tracks?time_range=${timeRange}&limit=${limit}`;
  const page = (await get({ url, headers })).body;
  const tracks = await getTracksAudio(page.items, headers);

  return req.query.debug ? { page } : { tracks };
};

export const handler = http.async(makeResponse(getTop));
