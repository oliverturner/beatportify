import { ArcRequest, ArcHeaders } from "./arc";

export interface ApiRequestHeaders {
  "Content-Type": "application/json";
  Authorization: string;
}

export type ApiRequest = (req: ArcRequest, headers: ArcHeaders) => Promise<Record<string, unknown>>;

export type ApiPageRequest = (
  req: ArcRequest,
  headers: ArcHeaders
) => Promise<Record<string, SpotifyApi.PagingObject<T>>>;
