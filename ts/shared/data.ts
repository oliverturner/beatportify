import type { AlbumRedux, TrackItemRedux } from "@typings/app";

export function purgeTrack(item: SpotifyApi.TrackObjectFull): TrackItemRedux {
  const {
    available_markets,
    disc_number,
    explicit,
    external_ids,
    external_urls,
    is_local,
    popularity,
    ...track
  } = item;

  return track;
}

export function purgeAlbum(itemAlbum: SpotifyApi.AlbumObjectSimplified): AlbumRedux {
  const { available_markets, type, ...album } = itemAlbum;

  return album;
}
