/**
 *
 * @param {{
 *   rootUrl: string
 *   params: Record<string, string>
 * }}
 */
function buildUrl({ rootUrl, params }) {
  const builtURL = new URL(rootUrl);
  for (const [key, val] of Object.entries(params)) {
    builtURL.searchParams.set(key, val);
  }

  return builtURL;
}

function makePayload(statusCode, body) {
  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    statusCode,
    body: JSON.stringify(body),
  };
}

/**
 * @param {Request} req
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
    // accessToken expired: se refreshToken to generate a new accessToken
    if (error.statusCode === 401) {
      const refreshUrl = req.requestContext.http.path;
      return {
        location: `/auth?refreshUrl=${refreshUrl}`,
      };
    }

    // no device available for playback
    if (error.statusCode === 404) {
      return makePayload(error.statusCode, error.body);
    }

    return makePayload(error.statusCode, { message: error.message });
  }
};

module.exports = {
  buildUrl,
  makeResponse,
};
