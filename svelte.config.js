import sveltePreprocess from "svelte-preprocess";

export const preprocess = sveltePreprocess({
  scss: { renderSync: true },
  postcss: true,
});
