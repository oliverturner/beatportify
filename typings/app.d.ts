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
