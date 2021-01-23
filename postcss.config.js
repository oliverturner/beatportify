const postcssPseudoEnter = require("postcss-pseudo-class-enter");
const postcssPresetEnv = require(`postcss-preset-env`);
const postcssInset = require(`postcss-inset`);
const cssnano = require("cssnano");

const { customMedia } = require("./src/ui/theme.js");

function getPlugins(isProd) {
  const plugins = [
    postcssPresetEnv({
      features: {
        "nesting-rules": true,
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

module.exports = {
  plugins: getPlugins(process.env.NODE_ENV === "production"),
};
