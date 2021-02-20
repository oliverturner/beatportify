const pageDefaults = {
  total: 0,
  href: "",
  items: [],
  offset: 0,
  next: "",
  previous: "",
};

/**
 * @param {{ limit: number }} params
 * @returns {import("@typings/spotify").PagingObject<unknown>}
 */
export function getDefaultPage({ limit = 0 }) {
  return { ...pageDefaults, limit };
}

/**
 * @param {import("@typings/spotify").Image[]} images
 * @returns {string}
 */
export function getSrcSet(images) {
  return images.map(({ url, width }) => `${url} ${width}w`).join(", ");
}
