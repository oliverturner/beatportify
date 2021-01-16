import { ArcRequest, ArcHeaders } from "./arc";
import { PagingObject } from "./spotify";

export interface ApiRequestHeaders {
  "Content-Type": "application/json";
  Authorization: string;
}

export type ApiRequest = (req: ArcRequest, headers: ArcHeaders) => Promise<Record<string, unknown>>;

export type ApiPageRequest<T> = (
  req: ArcRequest,
  headers: ArcHeaders
) => Promise<PagingObject<T> | { debug: res }>;
