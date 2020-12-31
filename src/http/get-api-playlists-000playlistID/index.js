"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const functions_1 = __importDefault(require("@architect/functions"));
const tiny_json_http_1 = require("tiny-json-http");
const utils_1 = require("../../shared/utils");
const getPlaylist = async (req, headers) => {
    const playlistId = req.params.playlistId;
    const market = req.session.user.country;
    const url = utils_1.buildUrl({
        rootUrl: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        params: {
            market,
        },
    });
    const result = await tiny_json_http_1.get({ url, headers });
    return result.body;
};
exports.handler = functions_1.default.http.async(utils_1.makeResponse(getPlaylist));
