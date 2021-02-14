import { Writable, Readable } from "svelte/store";

import type { Track } from "@typings/app";
import type { Playlist } from "@typings/spotify";

export type Tracks = Writable<Track[]>
export type Playlists = Writable<Playlist[]>
export type PlaylistMap = Readable<Record<string, Playlist>>