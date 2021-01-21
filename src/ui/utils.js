/**
 * @type {import("../../typings/spotify").getDefaultPage}
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
