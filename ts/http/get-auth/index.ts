import { http } from "@architect/functions";

import { init, refresh } from "./session";

import type { ArcRequest, SpotifySession } from "@typings/arc";
import type { ApiRequest } from "@typings/index";

const auth: ApiRequest = async (req: ArcRequest) => {
  if (req.query.code) {
    let account: SpotifySession | { error: string };

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
    let accessToken: string | { error: string };

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
