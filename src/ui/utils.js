const pageDefaults = {
  total: 0,
  href: "",
  items: [],
  offset: 0,
  next: "",
  previous: "",
};

/**
 * @param {{ limit: number }} param0
 * @returns {import("@typings/spotify").PagingObject}
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
