import { ArcRequest, ArcHeaders } from "./arc";
import { PagingObject } from "./spotify";

export type ApiRequest = (req: ArcRequest, headers: ArcHeaders) => Promise<Record<string, unknown>>;

export type ApiPageRequest<T> = (
  req: ArcRequest,
  headers: ArcHeaders
) => Promise<PagingObject<T> | { debug: res }>;

export type MakeResponse = (
  apiRequest: ApiRequest | ApiPageRequest<T>
) => (
  req: ArcRequest
) => Promise<{
  headers: { "content-type": string };
  statusCode: number;
  body: string;
}>;

export type ArtistRequest<T> = (
  artistId: string,
  headers: ArcHeaders,
  params?: Record<string, unknown>
) => Promise<{ body: T[] }>;
