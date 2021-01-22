import { get } from "tiny-json-http";

import { processTrack } from "./data";
import { buildUrl } from "./utils";

import type { ArcHeaders } from "@typings/arc";
import type * as Portify from "@typings/app";
import type * as Spotify from "@typings/spotify";
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
export function processAudio(audioFeatures: Spotify.AudioFeatures) {
  const { key, mode, tempo, analysis_url: analysisUrl } = audioFeatures;
  const pitch = PITCHES[mode][key];
  const tone = TONES[mode][key];
  const bpm = Math.round(tempo);

  return { key, pitch, tone, bpm, analysisUrl };
}

/**
 * Return a method for fetching an array of AudioFeature instances
 */
export const makeAudioRequest: AudioRequestFactory = (headers) => (trackIds) => {
  const url = buildUrl({ endpoint: `/audio-features`, params: { ids: trackIds.join(",") } });

  return get({ url, headers });
};

export async function getTracksAudio(tracks: Spotify.Track[], headers: ArcHeaders) {
  const getAudioFeatures = makeAudioRequest(headers);
  const tracksMap: Record<string, Portify.Track> = {};
  for (const track of tracks) {
    if (track.is_playable === false) continue;
    tracksMap[track.id] = processTrack(track);
  }

  const trackIds = Object.keys(tracksMap);
  const audioFeatures = (await getAudioFeatures(trackIds)).body.audio_features;

  for (const audio of audioFeatures) {
    // Local tracks have no audio analysis
    if (!audio) continue;

    const item = tracksMap[audio.id];
    item.audio = processAudio(audio);
  }

  return Object.values(tracksMap);
}
