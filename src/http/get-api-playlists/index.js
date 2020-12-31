"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const functions_1 = __importDefault(require("@architect/functions"));
const tiny_json_http_1 = require("tiny-json-http");
const utils_1 = require("../../shared/utils");
const getPlaylists = async (_req, headers) => {
    const result = await tiny_json_http_1.get({
        url: "https://api.spotify.com/v1/me/playlists",
        headers,
    });
    return result.body;
};
exports.handler = functions_1.default.http.async(utils_1.makeResponse(getPlaylists));
