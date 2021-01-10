import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";

const getPlaylist: ApiRequest = async (req, headers) => {
  const playlistId = req.params.playlistId;
  const market = req.session.user.country;

  // TODO: 1) use the result of this request to create comma-separated list of track ids
  // TODO: 2) Make a request to https://api.spotify.com/v1/audio-features 
  // TODO: 3) Return combined results
  // TODO: 4) Switch to store-based data
  const playlistTracksUrl = buildUrl({
    rootUrl: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    params: {
      market,
      // fields:
      //   "items(added_at,track(album.id,album.images,artists(id,name),id,name))",
    },
  });

  const result = await get({ url: playlistTracksUrl, headers });

  return result.body;
};

export const handler = http.async(makeResponse(getPlaylist));
