import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { buildUrl, makeResponse } from "@architect/shared/utils";
import { getTracksAudio } from "@architect/shared/audio";

import type { ApiRequest } from "@typings/index";
import type { Album, Track } from "@typings/spotify";

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
    tracks: tracksRaw,
    external_ids: externalIds,
    release_date: releaseDate,
  } = album;

  // TODO: Relax `processTrack` requirements: Pick<{...required}>
  // TODO: Use CSS counter to display track numbers against names
  const albumTracks: any[] = [];
  let trackIndex = 1;
  for (const track of tracksRaw.items) {
    const albumTrack = {
      ...track,
      album: { ...album },
      external_ids: externalIds,
      popularity: undefined,
    };

    albumTracks.push(albumTrack);
  }

  let tracks;
  try {
    tracks = await getTracksAudio(albumTracks, headers);
  } catch (err) {
    console.log({ err });
  }

  console.log({ tracks });

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
