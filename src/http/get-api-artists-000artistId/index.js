import arc from "@architect/functions";
import { get } from "tiny-json-http";

import { API_URL, buildUrl, makeResponse } from "@architect/shared/utils";
import { getTracksAudio } from "@architect/shared/audio";

/**
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 * @typedef {import("@typings/arc").ArcHeaders} ArcHeaders
 * @typedef {import("@typings/app").Album} Album
 * @typedef {import("@typings/app").Artist} Artist
 * @typedef {import("@typings/app").Track} Track
 * @typedef {import("@typings/spotify").PagingKeysAlbum} PagingKeysAlbum
 */

/**
 * @param {string} artistId
 * @param {ArcHeaders} headers
 * @returns {Promise<{body:Artist}>}
 */
function getArtist(artistId, headers) {
  return get({
    url: `${API_URL}/artists/${artistId}`,
    headers,
  });
}

/**
 * @param {string} artistId
 * @param {ArcHeaders} headers
 * @returns {Promise<{body:Track[]}>}
 */
function getTopTracks(artistId, headers) {
  const url = buildUrl({
    endpoint: `/artists/${artistId}/top-tracks`,
    params: { market: "from_token" },
  });

  return get({ url, headers });
}

/**
 * @param {string} artistId
 * @param {ArcHeaders} headers
 * @param {PagingKeysAlbum} params
 * @returns {Promise<{body:Album[]}>}
 */
function getAlbums(artistId, headers, params = {}) {
  const url = buildUrl({
    endpoint: `/artists/${artistId}/albums`,
    params: { ...params, market: "from_token" },
  });

  return get({ url, headers });
}

/**
 * @param {string} artistId
 * @param {ArcHeaders} headers
 * @returns {Promise<{body:Artist[]}>}
 */
function getRelatedArtists(artistId, headers) {
  return get({
    url: `${API_URL}/artists/${artistId}/related-artists`,
    headers,
  });
}

/** @type {ApiRequest} */
const getArtistData = async (req, headers) => {
  const artistId = req.params.artistId;

  const requestMap = {
    artist: getArtist,
    albums: getAlbums,
    relatedArtists: getRelatedArtists,
    topTracks: getTopTracks,
  };

  const responses = await Promise.allSettled(
    Object.values(requestMap).map((fn) => fn(artistId, headers))
  );

  const data = {};
  let index = 0;
  for (const key of Object.keys(requestMap)) {
    const res = responses[index++];

    if (res.status === "rejected") {
      data[key] = { error: res.reason };
      continue;
    }

    if (key === "topTracks") {
      const { tracks: topTracks } = res.value.body;
      data[key] = await getTracksAudio(topTracks, headers);
      continue;
    }

    data[key] = res.value.body;
  }

  return data;
};

export const handler = arc.http.async(makeResponse(getArtistData));
