import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";
import { getTracksAudio } from "@architect/shared/audio";

import type { ArcHeaders } from "@typings/arc";
import type { ApiPageRequest, ApiRequest } from "@typings/index";
import type * as Portify from "@typings/app";
import type * as Spotify from "@typings/spotify";

function getTracks(
  playlistId: string,
  params: Record<string, string>,
  headers: ArcHeaders
): Promise<{ body: Spotify.ApiResponsePlaylist }> {
  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    params,
  });

  return get({ url, headers });
}

const getPlaylist: ApiPageRequest<Portify.Track> = async (req, headers) => {
  const playlistId = req.params.playlistId;
  const params = {
    offset: req.query.offset || "0",
    limit: req.query.limit || "10",
    market: req.session.user.country,
  };

  const page = (await getTracks(playlistId, params, headers)).body;
  const tracks = page.items
    .filter(({ is_local }) => !is_local)
    .map(({ track }) => track as Spotify.Track);

  console.log({ tracks });

  const items = await getTracksAudio(tracks, headers);

  return { ...page, items };
};

export const handler = http.async(makeResponse(getPlaylist));
