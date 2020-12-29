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

module.exports = {
  buildUrl,
};
