/**
 * @typedef {import("@typings/arc").ArcHeaders} ArcHeaders
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 * @typedef {import("@typings/spotify").ApiResponsePlaylist} ApiResponsePlaylist
 * @typedef {import("@typings/app").Track} PortifyTrack
 */

const { http } = require("@architect/functions");
const { get } = require("tiny-json-http");

const { buildUrl, makeResponse } = require("@architect/shared/utils");
const { getTracksAudio } = require("@architect/shared/audio");

/** @type {(items: PortifyTrack[]) => boolean} */
function testCollection(items) {
  return items.length > 1 && new Set(items.map(({ album }) => album && album.id)).size === 1;
}

/**
 * @param {{
 *   playlistId: string,
 *   headers: ArcHeaders,
 *   params: Record<string, string>
 * }} params
 *
 * @returns {Promise<{ body: ApiResponsePlaylist }>}
 */
function getTracks({ playlistId, headers, params }) {
  const url = buildUrl({ endpoint: `/playlists/${playlistId}/tracks`, params });

  return get({ url, headers });
}

/**
 * @type {ApiRequest}
 */
const getPlaylist = async (req, headers) => {
  const playlistId = req.params.playlistId;
  const params = {
    offset: req.query.offset || "0",
    limit: req.query.limit || "10",
    market: req.session.user.country,
  };

  // TODO: optimise with fewer iterations & more composition
  const page = (await getTracks({ playlistId, params, headers })).body;
  const tracks = page.items.filter(({ is_local }) => !is_local).map(({ track }) => track);
  // @ts-ignore
  const items = await getTracksAudio(tracks, headers);
  const isCollection = testCollection(items);

  return { ...page, isCollection, items };
};

module.exports = {
  handler: http.async(makeResponse(getPlaylist)),
};
