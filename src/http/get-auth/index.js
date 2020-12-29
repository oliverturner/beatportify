const arc = require("@architect/functions");
const spotify = require("./spotify");

/**
 *
 * @param {Request} req
 */
async function auth(req) {
  if (req.query.code) {
    let account;

    try {
      account = await spotify(req.query.code);

      console.log("auth", JSON.stringify(account, null, 2));
    } catch (err) {
      console.log("wtf?");

      return {
        statusCode: err.code,
        body: err.message,
      };
    }

    return {
      session: { account },
      location: "/",
    };
  }

  return {
    location: "/",
  };
}

exports.handler = arc.http.async(auth);
