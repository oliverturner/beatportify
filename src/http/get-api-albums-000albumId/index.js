import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";
import { getTracksAudio } from "@architect/shared/audio";

/**
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 */

/** @type {ApiRequest} */
const getAlbumData = async (req, headers) => {
  const albumId = req.params.albumId;
  const market = req.session.user.country;

  const url = buildUrl({ endpoint: `/albums/${albumId}`, params: { market } });
  const album = (await get({ url, headers })).body;
  const { id, artists, images, label, name, tracks: tracksRaw, external_ids, release_date } = album;

  // TODO: Relax `processTrack` requirements: Pick<{...required}>
  // TODO: Use CSS counter to display track numbers against names?
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

export const handler = http.async(makeResponse(getAlbumData));
