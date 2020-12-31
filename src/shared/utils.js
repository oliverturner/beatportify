"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResponse = exports.buildUrl = void 0;
/**
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
exports.buildUrl = buildUrl;
function makePayload(statusCode, body) {
    return {
        headers: {
            "content-type": "application/json; charset=utf8",
            "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        },
        statusCode,
        body: JSON.stringify(body),
    };
}
const makeResponse = (apiRequest) => async (req) => {
    const { accessToken } = req.session;
    if (!accessToken)
        return { location: "/" };
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    };
    try {
        const result = await apiRequest(req, headers);
        return makePayload(200, result);
    }
    catch (error) {
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
exports.makeResponse = makeResponse;
