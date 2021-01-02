import arc from "@architect/functions";
import { get } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";

const getPlaylists: ApiRequest = async (_req, headers) => {
  const result = await get({
    url: "https://api.spotify.com/v1/me/playlists",
    headers,
  });

  return result.body;
};

export const handler = arc.http.async(makeResponse(getPlaylists));
