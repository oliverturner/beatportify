import type { Image, PagingObject } from "@typings/spotify";

export function getDefaultPage<T>({ limit = 0 }): PagingObject<T> {
  return {
    limit,
    total: 0,
    href: "",
    items: [],
    offset: 0,
    next: "",
    previous: "",
  };
}

export function getSrcSet(images: Image[]) {
  return images.map(({ url, width }) => `${url} ${width}w`).join(", ");
}
