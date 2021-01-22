import { writable, derived, Writable, Readable } from "svelte/store";

import type { Track } from "@typings/app";
import type { Playlist } from "@typings/spotify";

export const tracks: Writable<Track[]> = writable([]);

export const playlists: Writable<Playlist[]> = writable([]);

export const playlistMap: Readable<Record<string, Playlist>> = derived(playlists, ($playlists) => {
  const data = {};
  for (const playlist of $playlists) {
    data[playlist.id] = playlist;
  }

  return data;
});
