/**
 * @typedef {import("@typings/arc").SpotifySession} SpotifySession
 */

const { get, post } = require("tiny-json-http");

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT } = process.env;
const clientTokenRaw = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
const clientToken = Buffer.from(clientTokenRaw).toString("base64");
const url = "https://accounts.spotify.com/api/token";
const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: `Basic ${clientToken}`,
};

/**
 * @param {string} code
 * @returns {Promise<SpotifySession | { error: string }>}
 */
async function init(code) {
  try {
    const tokenResult = await post({
      url,
      headers,
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

    const account = {
      accessToken,
      refreshToken,
      user: userResult.body,
    };

    return account;
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

/**
 * @param {string} refresh_token
 * @returns {Promise<string | { error: string }>}
 */
async function refresh(refresh_token) {
  try {
    const tokenResult = await post({
      url,
      headers,
      data: {
        refresh_token,
        redirect_uri: SPOTIFY_REDIRECT,
        grant_type: "refresh_token",
      },
    });

    return tokenResult.body.access_token;
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

module.exports = {
  init,
  refresh,
};
