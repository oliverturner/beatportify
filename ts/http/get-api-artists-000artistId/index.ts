import arc from "@architect/functions";
import { get } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";
import { getTracksAudio } from "@architect/shared/audio";

import type { ApiRequest } from "@typings/index";
// import type { Artist } from "@typings/app";
import type { ArcHeaders } from "@typings/arc";

function getArtist(artistId: string, headers: ArcHeaders) {
  return get({
    url: `https://api.spotify.com/v1/artists/${artistId}`,
    headers,
  });
}

function getTopTracks(artistId: string, market: string, headers: ArcHeaders) {
  return get({
    url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
    data: { market },
    headers,
  });
}

const getArtistData: ApiRequest = async (req, headers) => {
  const artistId = req.params.artistId;
  const market = req.session.user.country;

  const [artistRes, tracksRes] = await Promise.allSettled([
    getArtist(artistId, headers),
    getTopTracks(artistId, market, headers),
  ]);

  const artist =
    artistRes.status === "fulfilled" ? artistRes.value.body : { error: artistRes.reason };

  const topTracks =
    tracksRes.status === "fulfilled"
      ? await getTracksAudio(tracksRes.value.body.tracks, headers)
      : { error: tracksRes.reason };

  return {
    artist,
    topTracks,
  };
};

export const handler = arc.http.async(makeResponse(getArtistData));
