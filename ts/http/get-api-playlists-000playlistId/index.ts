import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";
import { getTracksAudio } from "@architect/shared/audio";

import type { ArcHeaders } from "@typings/arc";
import type { ApiPageRequest } from "@typings/index";
import type * as Portify from "@typings/app";
import type * as Spotify from "@typings/spotify";

function getTracks(
  playlistId: string,
  params: Record<string, string>,
  headers: ArcHeaders
): Promise<{ body: Spotify.ApiResponsePlaylist }> {
  const url = buildUrl({ endpoint: `/playlists/${playlistId}/tracks`, params });

  return get({ url, headers });
}

const getPlaylist: ApiPageRequest<Portify.Track> = async (req, headers) => {
  const playlistId = req.params.playlistId;
  const params = {
    offset: req.query.offset || "0",
    limit: req.query.limit || "10",
    market: req.session.user.country,
  };

  // TODO: optimise with fewer iterations & more composition
  const page = (await getTracks(playlistId, params, headers)).body;
  const tracks = page.items
    .filter(({ is_local }) => !is_local)
    .map(({ track }) => track as Spotify.Track);
  const items = await getTracksAudio(tracks, headers);
  const isCollection = new Set(items.map((item) => item.album?.id)).size === 1;

  return { ...page, isCollection, items };
};

export const handler = http.async(makeResponse(getPlaylist));
