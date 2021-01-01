import arc from "@architect/functions";
import { get } from "tiny-json-http";

import { makeResponse } from "../../shared/utils";

import type  { ApiRequest } from "../../../typings";

const getTop: ApiRequest = async (_req, headers) => {
  const rootUrl = "https://api.spotify.com/v1/me/top/";
  const endpoints = ["artists", "tracks"].map((e) => rootUrl + e);

  const [artists, tracks] = await Promise.all(endpoints.map((url) => get({ url, headers })));

  return {
    artists: artists.body,
    tracks: tracks.body,
  };
};

export const handler = arc.http.async(makeResponse(getTop));
