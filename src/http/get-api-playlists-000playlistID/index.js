const arc = require("@architect/functions");
const { get } = require("tiny-json-http");

const { buildUrl } = require("../../shared/utils");

async function playlist(req) {
  const account = req.session && req.session.account;
  if (!account) return { location: "/" };

  const playlistID = req.params.playlistID;
  const url = buildUrl({
    rootUrl: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
    params: {
      // fields: ["id", "images", "name", "tracks"].join(","),
      fields: ["items(added_at,track(album.id,album.images,artists(id,name),id,name))"].join(","),
    },
  });

  console.log({ url });

  let body;

  try {
    const result = await get({
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${account.accessToken}`,
      },
    });

    body = JSON.stringify(result.body);
  } catch (error) {
    console.log(error.message);
    body = "oops";
  }

  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    statusCode: 200,
    body,
  };
}

exports.handler = arc.http.async(playlist);
