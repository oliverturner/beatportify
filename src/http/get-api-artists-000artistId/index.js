/**
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 * @typedef {import("@typings/arc").ArcHeaders} ArcHeaders
 * @typedef {import("@typings/app").Album} Album
 * @typedef {import("@typings/app").Artist} Artist
 * @typedef {import("@typings/app").Track} Track
 * @typedef {import("@typings/spotify").PagingKeysAlbum} PagingKeysAlbum
 */

const arc = require("@architect/functions");
const { get } = require("tiny-json-http");

const { API_URL, buildUrl, makeResponse } = require("@architect/shared/utils");
const { getTracksAudio } = require("@architect/shared/audio");

/**
 * @type {import("@typings/index").ArtistRequest<Artist>}
 */
function getArtist(artistId, headers) {
  return get({
    url: `${API_URL}/artists/${artistId}`,
    headers,
  });
}

/**
 * @type {import("@typings/index").ArtistRequest<Track>}
 */
function getTopTracks(artistId, headers) {
  const url = buildUrl({
    endpoint: `/artists/${artistId}/top-tracks`,
    params: { market: "from_token" },
  });

  return get({ url, headers });
}

/**
 * @type {import("@typings/index").ArtistRequest<Artist>}
 */
function getRelatedArtists(artistId, headers) {
  return get({
    url: `${API_URL}/artists/${artistId}/related-artists`,
    headers,
  });
}

/**
 * @type {import("@typings/index").ArtistRequest<Album>}
 */
function getAlbums(artistId, headers, params = {}) {
  const url = buildUrl({
    endpoint: `/artists/${artistId}/albums`,
    params: { ...params, market: "from_token" },
  });

  return get({ url, headers });
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

  /** @type {Record<string, unknown>} */
  const data = {};
  let index = 0;

  for (const key of Object.keys(requestMap)) {
    const res = responses[index++];

    if (res.status === "rejected") {
      data[key] = { error: res.reason };
      continue;
    }

    if (key === "topTracks") {
      // @ts-ignore
      const { tracks: topTracks } = res.value.body;
      data[key] = await getTracksAudio(topTracks, headers);
      continue;
    }

    data[key] = res.value.body;
  }

  return data;
};

module.exports = {
  handler: arc.http.async(makeResponse(getArtistData)),
};
