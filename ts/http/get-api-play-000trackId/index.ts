import { http } from "@architect/functions";
import { put } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";

import type { ApiRequest } from "@typings/index";

const playTrack: ApiRequest = async (req, headers) => {
  const trackId = req.params.trackId;

  try {
    const result = await put({
      url: `https://api.spotify.com/v1/me/player/play`,
      headers,
      data: {
        uris: [`spotify:track:${trackId}`],
      },
    });

    console.log({ playTrack: result });

    return result;
  } catch (error) {
    // no device available for playback
    if (error.statusCode === 404) {
      return error.body;
    }

    throw error;
  }
};

export const handler = http.async(makeResponse(playTrack));
