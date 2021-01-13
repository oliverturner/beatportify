export interface LoginData {
  message: string;
  loginURL?: string;
  user?: SpotifyApi.UserObjectPrivate;
}

export interface TrackItemAudio {
  key: string;
  tone: string;
  tempo: number;
  analysisUrl: string;
}
export interface TrackItem extends SpotifyApi.PlaylistTrackObject {
  audio: TrackItemAudio;
}

export type AlbumRedux = Pick<
  SpotifyApi.AlbumObjectSimplified,
  | "id"
  | "album_type"
  | "artists"
  | "images"
  | "name"
  | "release_date"
  | "release_date_precision"
  | "uri"
> & {
  total_tracks?: number;
};

interface TrackItemRedux {
  id: string;
  name: string;
  artists: SpotifyApi.ArtistObjectSimplified[];
  // "external_urls": {
  // "spotify": "https://open.spotify.com/album/7gtFhZXK2pHQnW5t5qx38s"
  // },
  // "href": "https://api.spotify.com/v1/albums/7gtFhZXK2pHQnW5t5qx38s",
  // "id": "7gtFhZXK2pHQnW5t5qx38s",
  // "images": [
  // {
  // "height": 640,
  // "url": "https://i.scdn.co/image/ab67616d0000b273732bafd1dbdfd46fa7c22400",
  // "width": 640
  // },
  // {
  // "height": 300,
  // "url": "https://i.scdn.co/image/ab67616d00001e02732bafd1dbdfd46fa7c22400",
  // "width": 300
  // },
  // {
  // "height": 64,
  // "url": "https://i.scdn.co/image/ab67616d00004851732bafd1dbdfd46fa7c22400",
  // "width": 64
  // }
  // ],

  album: AlbumRedux;
  audio?: TrackItemAudio;
}
