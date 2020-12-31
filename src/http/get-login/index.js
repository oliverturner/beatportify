"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const functions_1 = __importDefault(require("@architect/functions"));
const utils_1 = require("../../shared/utils");
const scopes = [
    "playlist-read-private",
    "user-top-read",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state",
];
const loginURL = utils_1.buildUrl({
    rootUrl: "https://accounts.spotify.com/authorize",
    params: {
        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri: process.env.SPOTIFY_REDIRECT,
        response_type: "code",
        scope: scopes.join(" "),
    },
});
async function login(req) {
    const { user } = req.session;
    return {
        headers: {
            "content-type": "application/json; charset=utf8",
            "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        },
        statusCode: 200,
        body: JSON.stringify({
            user,
            loginURL,
            message: "Hello from Svelte + your Begin API!",
        }),
    };
}
exports.handler = functions_1.default.http.async(login);
