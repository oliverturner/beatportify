import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";
import { ArcHeaders } from "@typings/arc";
import { TrackItem } from "@typings/app";

// Camelot keys indexed by mode -> pitch class
// https://maustsontoast.com/2020/pitch-class-tonal-counterparts-and-camelot-key-equivalents
const PITCH_CLASS = [
  // minor
  ["5A", "12A", "7A", "2A", "9A", "4A", "11A", "6A", "1A", "8A", "3A", "10A"],
  // major
  ["8B", "3B", "10B", "5B", "12B", "7B", "2B", "9B", "4B", "11B", "6B", "1B"],
];

// Musical tones indexed by mode -> pitch class
const TONES = [
  // minor
  ["Cm", "D♭m", "Dm", "E♭m", "Em", "Fm", "G♭m", "Gm", "A♭m", "Am", "B♭m", "Bm"],
  // major
  ["C, B♯", "C♯, D♭", "D", "D♯, E♭", "E", "F", "F♯, G♭", "G", "G♯, A♭", "A", "A♯, B♭", "B"],
];

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
 * ADDITIONAL PROPERTIES:
 * energy: 0.894
 * danceability: 0.779
 * valence: 0.234
 * time_signature: 4
 * acousticness: 0.000802
 * instrumentalness: 0.923
 * liveness: 0.0744
 * loudness: -7.095
 * speechiness: 0.0638
 */
function processAudio(audioFeatures: SpotifyApi.AudioFeaturesObject) {
  const { key: pitchClass, mode, tempo, analysis_url: analysisUrl } = audioFeatures;
  const key = PITCH_CLASS[mode][pitchClass];
  const tone = TONES[mode][pitchClass];

  return { key, tone, tempo, analysisUrl };
}

function processItems(
  items: SpotifyApi.PlaylistTrackObject[],
  audioFeatures: SpotifyApi.AudioFeaturesObject[]
): TrackItem[] {
  return items
    .map((item, index) => ({ ...item, audio: processAudio(audioFeatures[index]) }))
    .filter((item) => item.track.is_playable);
}

const getPlaylist: ApiRequest = async (req, headers) => {
  const playlistId = req.params.playlistId;
  const market = req.session.user.country;

  // TODO: 4) Switch to store-based data

  const trackRes = await getTracks(playlistId, market, headers);
  const tracksPage: SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject> = trackRes.body;
  const trackIds = tracksPage.items.map((item) => item.track.id);
  const audioRes = await getTrackAudio(trackIds, headers);

  trackRes.body.items = processItems(tracksPage.items, audioRes.body.audio_features);

  return trackRes.body;
};

export const handler = http.async(makeResponse(getPlaylist));
