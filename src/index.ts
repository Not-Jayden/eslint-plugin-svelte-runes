import type { ESLint } from "eslint";

import { rule as noRestrictedSvelteImportsRule } from "./rules/no-restricted-svelte-imports";
import { rule as noRestrictedSvelteExportsRule } from "./rules/no-restricted-svelte-exports";

const plugin = {
  rules: {
    "no-restricted-svelte-imports": noRestrictedSvelteImportsRule,
    "no-restricted-svelte-exports": noRestrictedSvelteExportsRule,
  },

  configs: {
    recommended: {
      rules: {
        "svelte-code-boundary/no-restricted-svelte-imports": "error",
        "svelte-code-boundary/no-restricted-svelte-exports": "error",
      },
    },
  },
} satisfies ESLint.Plugin;

export = plugin;
