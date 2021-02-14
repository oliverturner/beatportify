module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    // enable additional rules
    "linebreak-style": ["error", "unix"],
    "handle-callback-err": "error",
    // override default options for rules from base configurations
    "no-cond-assign": ["error", "always"],
    // disable rules from base configurations
    "arrow-body-style": "off",
    "no-console": "off",
    // style specific
    "no-trailing-spaces": "error",
    "no-unused-vars": ["error", { args: "none" }],
  },
  plugins: ["svelte3"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3",
      settings: { "svelte3/ignore-styles": () => true },
    },
  ],
};
