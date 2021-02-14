import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";

/**
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 */

/** @type {ApiRequest} */
const getTrack = async (req, headers) => {
  const trackId = req.params.trackId;
  const market = req.session.user.country;

  // TODO: get track analysis from https://api.spotify.com/v1/audio-analysis/{id}
  const url = buildUrl({ endpoint: `/tracks/${trackId}`, params: { market } });
  const result = await get({ url, headers });

  return result.body;
};

export const handler = http.async(makeResponse(getTrack));
