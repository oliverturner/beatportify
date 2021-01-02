const breakpoints = {
  s: 414,
  m: 768,
  l: 960,
  xl: 1200
};

/**
 * Produces an object of media queries from `breakpoints` suitable for use in
 * matchMedia queries in JS
 *
 * {
 *   m:  (min-width: 768px),
 *   l:  (min-width: 960px),
 *   xl: (min-width: 1200px)
 * }
 */
const mediaQueries = Object.entries(breakpoints).reduce((acc, [k, v]) => {
  return { ...acc, [k]: `(min-width: ${v}px)` };
}, {});

/**
 * Produces a series of @custom-media props for use in CSS
 * Consumed by PostCSS (see postcss.config.js)
 * {
 *   --mq-m:  (min-width: 768px),
 *   --mq-l:  (min-width: 960px),
 *   --mq-xl: (min-width: 1200px)
 * }
 *
 * usage:
 * .app {
 *   @media (--mq-m) { ... }
 *   @media (--mq-l) { ... }
 *   @media (--mq-xl) { ... }
 * }
 */
const customMedia = Object.entries(mediaQueries).reduce((acc, [k, v]) => {
  return { ...acc, [`--mq-${k}`]: v };
}, {});

module.exports = {
  breakpoints,
  mediaQueries,
  customMedia
};
