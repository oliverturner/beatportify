import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";
import { getTracksAudio } from "@architect/shared/audio";

import type { ApiRequest } from "@typings/index";
import type { Album } from "@typings/spotify";

const getAlbumData: ApiRequest = async (req, headers) => {
  const albumId = req.params.albumId;
  const market = req.session.user.country;

  const url = buildUrl({ endpoint: `/albums/${albumId}`, params: { market } });
  const album: Album = (await get({ url, headers })).body;
  const {
    id,
    artists,
    images,
    label,
    name,
    tracks,
    external_ids: externalIds,
    release_date: releaseDate,
  } = album;

  // const tracks = getTracksAudio(tracksRaw.items, headers);

  return {
    id,
    artists,
    images,
    label,
    name,
    tracks,
    externalIds,
    releaseDate,
  };
};

export const handler = http.async(makeResponse(getAlbumData));
