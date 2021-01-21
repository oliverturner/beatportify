import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";

const getTrack: ApiRequest = async (req, headers) => {
  const trackId = req.params.trackId;
  const market = req.session.user.country;

  // TODO: get track analysis from https://api.spotify.com/v1/audio-analysis/{id}
  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/tracks/${trackId}`,
    params: { market },
  });

  const result = await get({ url, headers });

  console.log({ result });

  return result.body;
};

export const handler = http.async(makeResponse(getTrack));
