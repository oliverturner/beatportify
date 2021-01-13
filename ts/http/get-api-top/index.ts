import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";
import { purgeTrack, purgeAlbum } from "@architect/shared/data";
import { getTrackAudio, processAudio } from "@architect/shared/audio";

import type { ApiRequest } from "@typings/index";
import type { TrackItemRedux } from "@typings/app";

const LIMIT = 10;
const TIME_RANGE = "long_term";

const getTop: ApiRequest = async (req, headers) => {
  const rootUrl = "https://api.spotify.com/v1/me/top/";
  const url = `${rootUrl}tracks?time_range=${TIME_RANGE}&limit=${LIMIT}`;
  const tracks = await get({ url, headers });

  const tracksDict: Record<string, TrackItemRedux> = {};
  for (const item of tracks.body.items) {
    if (item.is_local === false) {
      const track = purgeTrack(item);
      track.album = purgeAlbum(item.album);
      tracksDict[track.id] = track;
    }
  }

  const trackIds = Object.keys(tracksDict);
  const audioFeatures = (await getTrackAudio(trackIds, headers)).body.audio_features;

  audioFeatures.map((audio: SpotifyApi.AudioFeaturesObject) => {
    const item = tracksDict[audio.id];
    item.audio = processAudio(audio);
  });

  return {
    tracks: Object.values(tracksDict),
  };
};

export const handler = http.async(makeResponse(getTop));
