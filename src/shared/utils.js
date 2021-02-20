// @ts-nocheck
const API_URL = "https://api.spotify.com/v1";

/**
 * @param {{
 *   rootUrl?: string;
 *   endpoint: string;
 *   params: Record<string, string>;
 *   asUrl?: boolean
 * }} params
 *
 * @returns {string | URL}
 */
function buildUrl({ rootUrl = API_URL, endpoint, params, asUrl }) {
  const builtURL = new URL(`${rootUrl}${endpoint}`);
  for (const [key, val] of Object.entries(params)) {
    builtURL.searchParams.set(key, val);
  }

  if (asUrl) {
    return builtURL;
  }

  return builtURL.toString();
}

/**
 * @param {number} statusCode
 * @param {unknown} body
 */
function makePayload(statusCode, body) {
  return {
    headers: { "content-type": "application/json; charset=utf-8" },
    statusCode,
    body: JSON.stringify(body),
  };
}

/**
 * @type { import("@typings/index").MakeResponse }
 */
const makeResponse = (apiRequest) => async (req) => {
  const { accessToken } = req.session;
  if (!accessToken) return { location: "/" };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const result = await apiRequest(req, headers);
    return makePayload(200, result);
  } catch (error) {
    // accessToken expired: use refreshToken to generate a new one
    // TODO await a request to `req.requestContext.http.path`, store session object, redirect to refreshUrl?
    if (error.statusCode === 401) {
      const refreshUrl = req.requestContext.http.path;
      console.log("unauthorised: refresh", { refreshUrl });

      return {
        location: `/auth?refreshUrl=${refreshUrl}`,
      };
    }

    return makePayload(error.statusCode, { message: error.message });
  }
};

module.exports = {
  API_URL,
  buildUrl,
  makeResponse,
};
