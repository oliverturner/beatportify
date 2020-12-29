module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "global-require": "off",
  },
};
