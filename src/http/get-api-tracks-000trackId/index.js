const arc = require("@architect/functions");
const { get } = require("tiny-json-http");

async function playlist(req) {
  const account = req.session && req.session.account;
  if (!account) return { location: "/" };

  const trackID = req.params.trackID;
  let body;

  try {
    const result = await get({
      url: `https://api.spotify.com/v1/tracks/${trackID}`,
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
