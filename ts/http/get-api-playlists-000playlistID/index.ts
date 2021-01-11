import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";
import { ArcHeaders } from "@typings/arc";

// Camelot keys indexed by pitch index
// https://en.wikipedia.org/wiki/Pitch_class
const PITCH_CLASS = ["5A", "12A", "7A", "2A", "9A", "4A", "11A", "6A", "1A", "8A", "3A", "10A"];

function getTracks(playlistId: string, market: string, headers: ArcHeaders) {
  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    params: { market },
  });
  return get({ url, headers });
}

function getTrackAudio(trackIds: string[], headers: ArcHeaders) {
  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/audio-features`,
    params: { ids: trackIds.join(",") },
  });
  return get({ url, headers });
}

/**
 * key: 7
 * mode: 1
 * energy: 0.894
 * danceability: 0.779
 * tempo: 120.992
 * analysis_url: "https://api.spotify.com/v1/audio-analysis/7oHqjeTUFu0nUsawxYzmaP"
 *
 * valence: 0.234
 * time_signature: 4
 * acousticness: 0.000802
 * instrumentalness: 0.923
 * liveness: 0.0744
 * loudness: -7.095
 * speechiness: 0.0638
 */
function addItemAudio(
  audioFeatures: SpotifyApi.AudioFeaturesObject[],
  items: SpotifyApi.PlaylistTrackObject[]
) {
  return items.map((item, index) => {
    const { key, tempo, analysis_url: analysisUrl } = audioFeatures[index];
    const camelotKey = PITCH_CLASS[key];
    return {
      ...item,
      audio: { key, camelotKey, tempo, analysisUrl },
    };
  });
}

const getPlaylist: ApiRequest = async (req, headers) => {
  const playlistId = req.params.playlistId;
  const market = req.session.user.country;

  // TODO: 4) Switch to store-based data

  const trackRes = await getTracks(playlistId, market, headers);
  const tracksPage: SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject> = trackRes.body;
  const trackIds = tracksPage.items.map((item) => item.track.id);
  const audioRes = await getTrackAudio(trackIds, headers);

  trackRes.body.items = addItemAudio(audioRes.body.audio_features, tracksPage.items);

  return trackRes.body;
};

export const handler = http.async(makeResponse(getPlaylist));
