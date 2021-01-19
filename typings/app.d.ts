import type * as Spotify from "@typings/spotify";
export interface LoginData {
  message: string;
  loginURL?: string;
  user?: SpotifyApi.UserObjectPrivate;
}

export type Album = Pick<
  Spotify.SimplifiedAlbum,
  "id" | "album_type" | "artists" | "images" | "name" | "uri"
>;

export type Artist = Pick<Spotify.Artist, "name" | "id">;

export interface TrackAudio {
  key: string;
  tone: string;
  tempo: number;
  analysisUrl: string;
}

export type Track = Pick<
  Spotify.Track,
  "artists" | "duration_ms" | "id" | "is_playable" | "name" | "uri"
> & {
  artists: Artist[];
  album: Album;
  audio?: TrackAudio;
};

export type TrackAudioFetch = (
  trackIds: string[]
) => Promise<{ body: { audio_features: AudioFeatures[] } }>;

export type AudioRequestFactory = (headers: ArcHeaders) => TrackAudioFetch;
