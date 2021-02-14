import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";

const legalParams = ["limit", "offset"];

/**
 * @typedef {import("@typings/index").ApiPageRequest} ApiPageRequest
 * @typedef {import("@typings/spotify").Playlist} Playlist
 */

/** @type {ApiPageRequest<Playlist>} */
const getPlaylists = async (req, headers) => {
  try {
    const url = new URL("https://api.spotify.com/v1/me/playlists");
    for (const [k, v] of Object.entries(req.query)) {
      if (legalParams.includes(k)) {
        url.searchParams.set(k, v);
      }
    }

    const result = await get({ url, headers });

    return result.body;
  } catch (err) {
    return { err };
  }
};

export const handler = http.async(makeResponse(getPlaylists));
