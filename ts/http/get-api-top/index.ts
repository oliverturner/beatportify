import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";
import { processTrack } from "@architect/shared/data";
import { processAudio, makeAudioRequest } from "@architect/shared/audio";

import type { ApiRequest } from "@typings/index";
import type * as Portify from "@typings/app";
import type * as Spotify from "@typings/spotify";

const LIMIT = 48;
const TIME_RANGE = "long_term";
const ROOT_URL = "https://api.spotify.com/v1/me/top/";

async function processResponse(
  tracks: Spotify.PagingObject<Spotify.Track>,
  getTrackAudio: Portify.TrackAudioFetch
) {
  const tracksDict: Record<string, Portify.Track> = {};
  for (const item of tracks.items) {
    if (item.is_playable === false) continue;

    const track = processTrack(item);
    tracksDict[track.id] = track;
  }

  const trackIds = Object.keys(tracksDict);
  const audioFeatures = (await getTrackAudio(trackIds)).body.audio_features;

  for (const audio of audioFeatures) {
    const item = tracksDict[audio.id];
    item.audio = processAudio(audio);
  }

  return {
    tracks: Object.values(tracksDict),
  };
}

const getTop: ApiRequest = async (req, headers) => {
  const url = `${ROOT_URL}tracks?time_range=${TIME_RANGE}&limit=${LIMIT}`;
  const tracks = (await get({ url, headers })).body;
  const getTrackAudio = makeAudioRequest(headers);

  return req.query.debug === "true" ? { tracks } : processResponse(tracks, getTrackAudio);
};

export const handler = http.async(makeResponse(getTop));
