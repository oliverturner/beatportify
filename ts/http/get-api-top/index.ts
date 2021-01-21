import { http } from "@architect/functions";
import { get } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";
import { getTracksAudio } from "@architect/shared/audio";

import type { ApiRequest } from "@typings/index";
import type { TopTimeRange } from "@typings/spotify";

const LIMIT = 48;
const TIME_RANGE = "short_term";
const ROOT_URL = "https://api.spotify.com/v1/me/top/";

const getTop: ApiRequest = async (req, headers) => {
  const limit = req.query.limit || LIMIT;
  const timeRange: TopTimeRange = req.query.timeRange as TopTimeRange || TIME_RANGE;

  const url = `${ROOT_URL}tracks?time_range=${timeRange}&limit=${limit}`;
  const page = (await get({ url, headers })).body;
  const tracks = await getTracksAudio(page.items, headers);

  return req.query.debug ? { page } : { tracks };
};

export const handler = http.async(makeResponse(getTop));
