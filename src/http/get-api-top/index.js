"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const functions_1 = __importDefault(require("@architect/functions"));
const tiny_json_http_1 = require("tiny-json-http");
const utils_1 = require("../../shared/utils");
const getTop = async (_req, headers) => {
    const rootUrl = "https://api.spotify.com/v1/me/top/";
    const endpoints = ["artists", "tracks"].map((e) => rootUrl + e);
    const [artists, tracks] = await Promise.all(endpoints.map((url) => tiny_json_http_1.get({ url, headers })));
    return {
        artists: artists.body,
        tracks: tracks.body,
    };
};
exports.handler = functions_1.default.http.async(utils_1.makeResponse(getTop));
