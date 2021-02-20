/**
 * @typedef {keyof typeof breakpoints} BreakpointId
 * @typedef {{[k in BreakpointId]?: string}} MediaQueries
 */

const breakpoints = {
  small: 414,
  medium: 768,
  large: 960,
  xlarge: 1200,
};

/**
 * Produces an object of media queries from `breakpoints` suitable for use in
 * matchMedia queries in JS
 *
 * {
 *   medium: (min-width: 768px),
 *   large:  (min-width: 960px),
 *   xlarge: (min-width: 1200px)
 * }
 * 
 * @type {Partial<Record<BreakpointId, string>>}
 */
const mediaQueries = {};
for (const [k, v] of Object.entries(breakpoints)) {
  mediaQueries[k] = `(min-width: ${v}px)`;
}

/**
 * Produces a series of @custom-media props for use in CSS
 * Consumed by PostCSS (see postcss.config.js)
 * {
 *   --mq-medium: (min-width: 768px),
 *   --mq-large:  (min-width: 960px),
 *   --mq-xlarge: (min-width: 1200px)
 * }
 *
 * usage:
 * .app {
 *   @media (--mq-medium) { ... }
 *   @media (--mq-large)  { ... }
 *   @media (--mq-xlarge) { ... }
 * }
 * 
 * @type {Partial<Record<`--mq-${BreakpointId}`, string>>}
 */
const customMedia = {};
for (const [k, v] of Object.entries(mediaQueries)) {
  customMedia[`--mq-${k}`] = v;
}

module.exports = {
  breakpoints,
  mediaQueries,
  customMedia,
};
