// import { writable, derived } from "svelte/store";

// import type { Track } from "@typings/app";
// import type * as Spotify from "@typings/spotify";

// export const tracks = writable([] as Track[]);

// export const playlists = writable([] as Spotify.Playlist[]);

// export const playlistDict = derived(playlists, ($playlists) => {
//   const dict:Record<string, Spotify.Playlist> = {}

//   for (const playlist of $playlists) {
//     dict[playlist.id] = playlist;

//   };

//   return dict;
// });

import { writable, derived } from "svelte/store";

// import type { Track } from "@typings/app";
// import type * as Spotify from "@typings/spotify";

export const tracks = writable([]);

export const playlists = writable([]);

export const playlistDict = derived(playlists, ($playlists) => {
  const dict = {};

  for (const playlist of $playlists) {
    dict[playlist.id] = playlist;
  }

  return dict;
});
