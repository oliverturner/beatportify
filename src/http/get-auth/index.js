import { http } from "@architect/functions";

import { init, refresh } from "./session";

/**
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 * @typedef {import("@typings/arc").SpotifySession} SpotifySession
 */

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

export const handler = http.async(auth);
