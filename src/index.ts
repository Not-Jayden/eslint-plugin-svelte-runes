import { rule as noRestrictedSvelteImportsRule } from "./rules/no-restricted-svelte-imports";

const plugin = {
  rules: {
    "no-restricted-svelte-imports": noRestrictedSvelteImportsRule,
  },
};

export = plugin;
