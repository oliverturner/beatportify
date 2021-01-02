import arc from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";

const getPlaylist: ApiRequest = async (req, headers) => {
  const playlistId = req.params.playlistId;
  const market = req.session.user.country;

  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    params: {
      market,
      // fields:
      //   "items(added_at,track(album.id,album.images,artists(id,name),id,name))",
    },
  });

  const result = await get({ url, headers });

  return result.body;
};

export const handler = arc.http.async(makeResponse(getPlaylist));
