import { http } from "@architect/shared/arc";
import { get } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";

const getPlaylists: ApiRequest = async (_req, headers) => {
  const url = new URL("https://api.spotify.com/v1/me/playlists");
  url.searchParams.set("offset", _req.query.offset);
  url.searchParams.set("limit", _req.query.limit);

  const result = await get({ url, headers });

  return result.body;
};

export const handler = http.async(makeResponse(getPlaylists));
