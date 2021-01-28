import type { PlaylistPage } from "@typings/app";
import type { Image, PagingObject } from "@typings/spotify";

const pageDefaults = {
  total: 0,
  href: "",
  items: [],
  offset: 0,
  next: "",
  previous: "",
};

export function getDefaultPage<T>({ limit = 0 }): PagingObject<T> {
  return { ...pageDefaults, limit };
}

export function getPlaylistPage({ limit = 0 }): PlaylistPage {
  return { ...pageDefaults, limit, isCollection: false };
}

export function getSrcSet(images: Image[]) {
  return images.map(({ url, width }) => `${url} ${width}w`).join(", ");
}
