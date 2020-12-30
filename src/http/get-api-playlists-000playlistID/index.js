const arc = require("@architect/functions");
const { get } = require("tiny-json-http");

const { buildUrl, makeResponse } = require("../../shared/utils");

/**
 * @param {Request} req
 * @param {import("../../../typings").APIRequestHeaders} headers
 */
async function getPlaylist(req, headers) {
  const playlistId = req.params.playlistId;
  const market = req.session.user.country;

  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    params: {
      market,
      // fields:
      //   "items(added_at,track(album.id,album.images,artists(id,name),id,name))",
    },
  });

  const result = await get({ url, headers });

  return result.body;
}

exports.handler = arc.http.async(makeResponse(getPlaylist));
