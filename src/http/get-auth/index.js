/**
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 * @typedef {import("@typings/arc").SpotifySession} SpotifySession
 */

const { http } = require("@architect/functions");

const { init, refresh } = require("./session");

/** @type {ApiRequest} */
const auth = async (req) => {
  if (req.query.code) {
    /** @type {SpotifySession | { error: string }} */
    let account;

    try {
      account = await init(req.query.code);
    } catch (err) {
      return {
        statusCode: err.code,
        body: err.message,
      };
    }

    return {
      session: { ...account },
      location: "/",
    };
  }

  if (req.query.refreshUrl) {
    /** @type {string | { error: string }} */
    let accessToken;

    try {
      accessToken = await refresh(req.session.refreshToken);
    } catch (err) {
      return {
        statusCode: err.code,
        body: err.message,
      };
    }

    return {
      session: { ...req.session, accessToken },
      location: req.query.refreshUrl,
    };
  }

  return {
    location: "/",
  };
};

module.exports = {
  handler: http.async(auth),
};
