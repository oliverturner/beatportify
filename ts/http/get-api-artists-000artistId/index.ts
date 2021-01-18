import arc from "@architect/functions";
import { put } from "tiny-json-http";

import { makeResponse } from "@architect/shared/utils";
import type { ApiPageRequest } from "@typings/index";
import { Artist } from "@typings/app";

const playTrack: ApiPageRequest<Artist> = async (req, headers) => {
  const trackId = req.params.trackId;

  try {
    const result = await put({
      url: `https://api.spotify.com/v1/me/player/play`,
      headers,
      data: {
        uris: [`spotify:track:${trackId}`],
      },
    });

    return result.body;
  } catch (error) {
    // no device available for playback
    if (error.statusCode === 404) {
      return {
        error: error.body,
      };
    }

    throw error;
  }
};

export const handler = arc.http.async(makeResponse(playTrack));
