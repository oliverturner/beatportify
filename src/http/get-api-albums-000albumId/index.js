/**
 * @typedef {import("@typings/spotify").Album} Album
 * @typedef {import("@typings/spotify").Track} Track
 * @typedef {import("@typings/spotify").ExternalId} ExternalId
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { buildUrl, makeResponse } = require("@architect/shared/utils");
const { getTracksAudio } = require("@architect/shared/audio");

/** @type {ApiRequest} */
const getAlbumData = async (req, headers) => {
  const albumId = req.params.albumId;
  const market = req.session.user.country;

  const url = buildUrl({ endpoint: `/albums/${albumId}`, params: { market } });

  /** @type {Album} */
  const album = (await get({ url, headers })).body;
  const { id, artists, images, label, name, tracks: tracksRaw, external_ids, release_date } = album;

  // TODO: Relax `processTrack` requirements: Pick<{...required}>
  /** @type {any[]} */
  const albumTracks = [];
  for (const track of tracksRaw.items) {
    const albumTrack = {
      ...track,
      album: { ...album },
      external_ids,
      popularity: undefined,
    };

    albumTracks.push(albumTrack);
  }

  let tracks = await getTracksAudio(albumTracks, headers);

  return {
    id,
    artists,
    images,
    label,
    name,
    tracks,
    external_ids,
    release_date,
  };
};

module.exports = {
  handler: http.async(makeResponse(getAlbumData)),
};
