import type { ApiPageRequest, ApiRequest, ApiRequestHeaders } from "@typings/index";
import type { ArcRequest } from "@typings/arc";

export const API_URL = "https://api.spotify.com/v1";

interface BuildUrlProps {
  rootUrl?: string;
  endpoint: string;
  params: Record<string, unknown>;
}
export function buildUrl({ rootUrl = API_URL, endpoint, params }: BuildUrlProps) {
  const builtURL = new URL(`${rootUrl}${endpoint}`);
  for (const [key, val] of Object.entries(params)) {
    builtURL.searchParams.set(key, val as string);
  }

  return builtURL;
}

function makePayload(statusCode: number, body: unknown) {
  return {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    statusCode,
    body: JSON.stringify(body),
  };
}

export const makeResponse = (apiRequest: ApiRequest | ApiPageRequest<unknown>) => async (
  req: ArcRequest
) => {
  const { accessToken } = req.session;
  if (!accessToken) return { location: "/" };

  const headers: ApiRequestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const result = await apiRequest(req, headers);
    return makePayload(200, result);
  } catch (error) {
    // accessToken expired: se refreshToken to generate a new accessToken
    if (error.statusCode === 401) {
      const refreshUrl = req.requestContext.http.path;
      return {
        location: `/auth?refreshUrl=${refreshUrl}`,
      };
    }

    return makePayload(error.statusCode, { message: error.message });
  }
};
