import type { ApiRequest, ApiRequestHeaders } from "@typings/index";
import type { ArcRequest } from "@typings/arc";

interface BuildUrlProps {
  rootUrl: string;
  params: Record<string, string>;
}
export function buildUrl({ rootUrl, params }: BuildUrlProps) {
  const builtURL = new URL(rootUrl);
  for (const [key, val] of Object.entries(params)) {
    builtURL.searchParams.set(key, val as string);
  }

  return builtURL;
}

function makePayload(statusCode: number, body: Record<string, unknown>) {
  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    statusCode,
    body: JSON.stringify(body),
  };
}

export const makeResponse = (apiRequest: ApiRequest) => async (req: ArcRequest) => {
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
