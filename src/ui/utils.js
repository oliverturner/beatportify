/*
import type { PagingObject } from "@typings/spotify";

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
*/

/**
 * @param {{ limit: number }}
 * @returns {import("../../typings/spotify").PagingObject<T>}
 */
export function getDefaultPage({ limit = 0 }) {
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
