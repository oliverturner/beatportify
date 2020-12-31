"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const functions_1 = __importDefault(require("@architect/functions"));
const tiny_json_http_1 = require("tiny-json-http");
const utils_1 = require("../../shared/utils");
const playTrack = async (req, headers) => {
    const trackId = req.params.trackId;
    try {
        const result = await tiny_json_http_1.put({
            url: `https://api.spotify.com/v1/me/player/play`,
            headers,
            data: {
                uris: [`spotify:track:${trackId}`],
            },
        });
        return result.body;
    }
    catch (error) {
        // no device available for playback
        if (error.statusCode === 404) {
            return {
                error: error.body,
            };
        }
        throw error;
    }
};
exports.handler = functions_1.default.http.async(utils_1.makeResponse(playTrack));
