import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";
import { ArcHeaders } from "@typings/arc";

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
 * // TODO: only extract useful keys:
 * acousticness: 0.000802 
 * analysis_url: "https://api.spotify.com/v1/audio-analysis/7oHqjeTUFu0nUsawxYzmaP"
 * danceability: 0.779
 * duration_ms: 452231
 * energy: 0.894
 * id: "7oHqjeTUFu0nUsawxYzmaP"
 * instrumentalness: 0.923
 * key: 7
 * liveness: 0.0744
 * loudness: -7.095
 * mode: 1
 * speechiness: 0.0638
 * tempo: 120.992
 * time_signature: 4
 * track_href: "https://api.spotify.com/v1/tracks/7oHqjeTUFu0nUsawxYzmaP"
 * type: "audio_features"
 * uri: "spotify:track:7oHqjeTUFu0nUsawxYzmaP"
 * valence: 0.234
 */
function addItemAudio(
  audioFeatures: SpotifyApi.AudioFeaturesObject[],
  items: SpotifyApi.PlaylistTrackObject[]
) {
  return items.map((item, index) => ({ ...item, audio: audioFeatures[index] }));
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
