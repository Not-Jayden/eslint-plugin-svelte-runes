//

module.exports = {
  plugins: ["svelte-restricted-imports"],

  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },

  rules: {
    "svelte-restricted-imports/no-restricted-svelte-imports": "error",
  },
};
