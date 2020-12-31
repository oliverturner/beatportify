"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const functions_1 = __importDefault(require("@architect/functions"));
const session_1 = require("./session");
/**
 * @param {Request} req
 */
async function auth(req) {
    if (req.query.code) {
        let account;
        try {
            account = await session_1.init(req.query.code);
        }
        catch (err) {
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
            accessToken = await session_1.refresh(req.session.refreshToken);
        }
        catch (err) {
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
exports.handler = functions_1.default.http.async(auth);
