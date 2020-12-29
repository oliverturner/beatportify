const arc = require("@architect/functions");
const { get } = require("tiny-json-http");

const { makeResponse } = require("../../shared/utils");

async function getTop(_req, headers) {
  const rootUrl = "https://api.spotify.com/v1/me/top/";
  const endpoints = ["artists", "tracks"].map((e) => rootUrl + e);

  const [artists, tracks] = await Promise.all(
    endpoints.map((url) => get({ url, headers }))
  );

  return {
    artists: artists.body,
    tracks: tracks.body,
  };
}

exports.handler = arc.http.async(makeResponse(getTop));
