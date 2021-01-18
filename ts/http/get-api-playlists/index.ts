import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import type * as Portify from "@typings/app";
import { makeResponse } from "@architect/shared/utils";

import type { ApiPageRequest } from "@typings/index";
import type { Playlist } from "@typings/spotify";

const getPlaylists: ApiPageRequest<Playlist> = async (req, headers) => {
  const url = new URL("https://api.spotify.com/v1/me/playlists");
  url.searchParams.set("offset", req.query.offset);
  url.searchParams.set("limit", req.query.limit);

  const result = await get({ url, headers });

  return result.body;
};

export const handler = http.async(makeResponse(getPlaylists));
