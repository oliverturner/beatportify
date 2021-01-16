import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";
import { processTrack } from "@architect/shared/data";
import { getTrackAudio, processAudio } from "@architect/shared/audio";

import type { ArcHeaders } from "@typings/arc";
import type { ApiPageRequest } from "@typings/index";
import type * as Portify from "@typings/app";
import type * as Spotify from "@typings/spotify";

function getTracks(
  playlistId: string,
  market: string,
  headers: ArcHeaders
): Promise<{ body: Spotify.ApiResponsePlaylist }> {
  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    params: { market },
  });

  return get({ url, headers });
}

const getPlaylist: ApiPageRequest<Portify.Track> = async (req, headers) => {
  const playlistId = req.params.playlistId;
  const market = req.session.user.country;

  const res = (await getTracks(playlistId, market, headers)).body;

  if (req.query.debug === "true") return { debug: res };

  const tracksDict: Record<string, Portify.Track> = {};
  for (const item of res.items) {
    if (item.track.is_playable === false) continue;

    const track = processTrack(item.track as Spotify.Track);
    tracksDict[track.id] = track;
  }

  const trackIds = Object.keys(tracksDict);
  const audioFeatures = (await getTrackAudio(trackIds, headers)).body.audio_features;

  for (const audio of audioFeatures) {
    const item = tracksDict[audio.id];
    item.audio = processAudio(audio);
  }

  return { ...res, items: Object.values(tracksDict) }
};

export const handler = http.async(makeResponse(getPlaylist));
