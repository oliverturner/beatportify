const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess({
    // scss: () => ({ renderSync: true, implementation: "sass" }),
    defaults: {
      script: "typescript",
      style: "scss",
    },
  }),
};
