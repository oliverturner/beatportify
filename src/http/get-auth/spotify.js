const { get, post } = require("tiny-json-http");

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT,
} = process.env;
const clientTokenRaw = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
const clientToken = Buffer.from(clientTokenRaw).toString("base64");

module.exports = async function spotify(code) {
  try {
    const tokenResult = await post({
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${clientToken}`,
      },
      data: {
        code,
        redirect_uri: SPOTIFY_REDIRECT,
        grant_type: "authorization_code",
      },
    });

    const accessToken = tokenResult.body.access_token;
    const refreshToken = tokenResult.body.refresh_token;
    const userResult = await get({
      url: "https://api.spotify.com/v1/me",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { display_name, href, id, images } = userResult.body;
    const account = {
      accessToken,
      refreshToken,
      user: {
        id,
        display_name,
        href,
        images: images[0],
      },
    };

    return account;
  } catch (err) {
    return {
      error: err.message,
    };
  }
};
