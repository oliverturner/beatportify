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

/**
 * @param {Request} req
 */
const makeResponse = (apiRequest) => async (req) => {
  const { accessToken } = req.session;
  if (!accessToken) return { location: "/" };

  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const result = await apiRequest(req, headers);
    body = JSON.stringify(result);
  } catch (error) {
    if (error.statusCode === 401) {
      const refreshUrl = req.requestContext.http.path;
      return {
        location: `/auth?refreshUrl=${refreshUrl}`,
      };
    }

    statusCode = error.statusCode;
    body = error.message;
  }

  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    statusCode,
    body,
  };
};

module.exports = {
  buildUrl,
  makeResponse,
};
