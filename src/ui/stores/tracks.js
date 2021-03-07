import { writable, derived } from "svelte/store";

/**
 * @typedef {import("@typings/spotify").Playlist} Playlist
 * @typedef {import("@typings/stores").Tracks} Tracks
 * @typedef {import("@typings/stores").Playlists} Playlists
 * @typedef {import("@typings/stores").PlaylistMap} PlaylistMap
 */

/** @type {Tracks} */
export const tracks = writable([]);

/** @type {Playlists} */
export const playlists = writable([]);

/** @type {PlaylistMap} */
export const playlistMap = derived(playlists, ($playlists = []) => {
  /** @type Record<string, Playlist> */
  const data = {};
  for (const playlist of $playlists) {
    data[playlist.id] = playlist;
  }

  return data;
});
