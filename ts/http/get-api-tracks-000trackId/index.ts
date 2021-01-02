import arc from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";

const getTrack: ApiRequest = async (req, headers) => {
  const trackId = req.params.trackId;
  const market = req.session.user.country;

  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/tracks/${trackId}`,
    params: { market },
  });

  const result = await get({ url, headers });

  return result.body;
};

export const handler = arc.http.async(makeResponse(getTrack));
