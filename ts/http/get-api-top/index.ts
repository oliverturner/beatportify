import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";

const getTop: ApiRequest = async (_req, headers) => {
  const rootUrl = "https://api.spotify.com/v1/me/top/";
  const endpoints = ["artists", "tracks"].map((e) => rootUrl + e);

  const [artists, tracks] = await Promise.all(endpoints.map((url) => get({ url, headers })));

  return {
    artists: artists.body,
    tracks: tracks.body,
  };
};

export const handler = http.async(makeResponse(getTop));
