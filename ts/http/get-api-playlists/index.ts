import arc from "@architect/functions";
import { get } from "tiny-json-http";

import type { ApiRequest } from "../../../typings";

import { makeResponse } from "../../shared/utils";

const getPlaylists: ApiRequest = async (_req, headers) => {
  const result = await get({
    url: "https://api.spotify.com/v1/me/playlists",
    headers,
  });

  return result.body;
};

export const handler = arc.http.async(makeResponse(getPlaylists));
