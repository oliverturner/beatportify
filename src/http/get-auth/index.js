const arc = require("@architect/functions");
const { init, refresh } = require("./session");

/**
 * @param {Request} req
 */
async function auth(req) {
  if (req.query.code) {
    let account;

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
    let accessToken;

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
}

exports.handler = arc.http.async(auth);
