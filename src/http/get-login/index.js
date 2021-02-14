import { http } from "@architect/functions";
import { buildUrl } from "@architect/shared/utils";

/**
 * @typedef {import("@typings/index").ApiRequest} ApiRequest
 */

const scopes = [
  "playlist-read-private",
  "user-top-read",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
];

const loginURL = buildUrl({
  rootUrl: "https://accounts.spotify.com",
  endpoint: "/authorize",
  params: {
    client_id: process.env.SPOTIFY_CLIENT_ID || "",
    redirect_uri: process.env.SPOTIFY_REDIRECT || "",
    response_type: "code",
    scope: scopes.join(" "),
  },
});

/** @type {ApiRequest} */
const login = async (req) => {
  const { user } = req.session;

  return {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    statusCode: 200,
    body: JSON.stringify({ user, loginURL }),
  };
};

export const handler = http.async(login);
