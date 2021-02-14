/**
 * @param {import("@typings/spotify").SimplifiedAlbum} itemAlbum
 * @returns {import("@typings/app").Album}
 */
export function processAlbum(itemAlbum) {
  const { album_type, artists, id, images, name, uri } = itemAlbum;

  return {
    id,
    album_type,
    artists,
    images,
    name,
    uri,
  };
}

/**
 * @param {import("@typings/spotify").Track} item
 * @returns {import("@typings/app").Track}
 */
export function processTrack(item) {
  const { id, album, artists, duration_ms, is_playable, name, uri } = item;

  return {
    id,
    // album: processAlbum(album),
    album,
    artists,
    duration_ms,
    is_playable,
    name,
    uri,
  };
}
