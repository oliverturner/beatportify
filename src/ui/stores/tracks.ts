import { writable, derived } from "svelte/store";

export const tracks = writable([]);

export const playlists = writable([]);

export const playlistDict = derived(playlists, ($playlists) => {
  const dict = {};

  for (const playlist of $playlists) {
    dict[playlist.id] = playlist;
  }

  return dict;
});