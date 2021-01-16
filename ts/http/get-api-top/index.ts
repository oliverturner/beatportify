import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";
import { processTrack } from "@architect/shared/data";
import { getTrackAudio, processAudio } from "@architect/shared/audio";

import type { ApiRequest } from "@typings/index";
import type * as Portify from "@typings/app";
import type { PagingObject, Track } from "@typings/spotify";

const LIMIT = 10;
const TIME_RANGE = "long_term";

const getTop: ApiRequest = async (req, headers) => {
  const rootUrl = "https://api.spotify.com/v1/me/top/";
  const url = `${rootUrl}tracks?time_range=${TIME_RANGE}&limit=${LIMIT}`;
  const tracks: PagingObject<Track> = (await get({ url, headers })).body;

  if (req.query.debug === "true") return { tracks };

  const tracksDict: Record<string, Portify.Track> = {};
  for (const item of tracks.items) {
    if (item.is_playable === false) continue;

    const track = processTrack(item);
    tracksDict[track.id] = track;
  }

  const trackIds = Object.keys(tracksDict);
  const audioFeatures = (await getTrackAudio(trackIds, headers)).body.audio_features;

  for (const audio of audioFeatures) {
    const item = tracksDict[audio.id];
    item.audio = processAudio(audio);
  }

  return {
    tracks: Object.values(tracksDict),
  };
};

export const handler = http.async(makeResponse(getTop));
