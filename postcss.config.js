import postcssPseudoEnter from "postcss-pseudo-class-enter";
import postcssPresetEnv from "postcss-preset-env";
import postcssInset from "postcss-inset";
import cssnano from "cssnano";

import { customMedia } from "./src/ui/theme.js";

/**
 * Return an environment-aware PostCSS config
 *
 * @param {boolean} isProd
 * @returns
 */
function getPlugins(isProd) {
  const plugins = [
    postcssPresetEnv({
      features: {
        "nesting-rules": true,
        "custom-selectors": true,
        "custom-media-queries": { importFrom: { customMedia } },
      },
    }),
    postcssInset(),
    postcssPseudoEnter(),
  ];

  if (isProd) {
    return plugins.concat([cssnano({ preset: "advanced" })]);
  }

  return plugins;
}

export default {
  plugins: getPlugins(process.env.NODE_ENV === "production"),
};
