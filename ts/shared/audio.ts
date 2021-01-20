import { get } from "tiny-json-http";
import { buildUrl } from "./utils";

import type { ArcHeaders } from "@typings/arc";
import type { AudioFeatures } from "@typings/spotify";
import type { AudioRequestFactory } from "@typings/app";

// Camelot keys indexed by mode -> pitch class
// https://maustsontoast.com/2020/pitch-class-tonal-counterparts-and-camelot-key-equivalents
const PITCHES = [
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
export function processAudio(audioFeatures: AudioFeatures) {
  const { key, mode, tempo, analysis_url: analysisUrl } = audioFeatures;
  const pitch = PITCHES[mode][key];
  const tone = TONES[mode][key];
  const bpm = Math.round(tempo);

  return { key, pitch, tone, bpm, analysisUrl };
}

// TODO: deprecate and replace with makeAudioRequest
export function getTrackAudio(
  trackIds: string[],
  headers: ArcHeaders
): Promise<{ body: { audio_features: AudioFeatures[] } }> {
  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/audio-features`,
    params: { ids: trackIds.join(",") },
  });

  return get({ url, headers });
}

/**
 * Return a method for fetching an array of AudioFeature instances
 *
 * @param headers
 */
export const makeAudioRequest: AudioRequestFactory = (headers) => (trackIds) => {
  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/audio-features`,
    params: { ids: trackIds.join(",") },
  });

  return get({ url, headers });
};
