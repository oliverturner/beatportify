import sveltePreprocess from "svelte-preprocess";
import postCSSConfig from "./postcss.config";

export const preprocess = sveltePreprocess({
  scss: { renderSync: true },
  postcss: postCSSConfig,
});
