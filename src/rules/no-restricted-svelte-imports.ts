import type { Rule } from "eslint";

import { getImportSource } from "../utils/getImportSource";

export const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "disallow importing from .svelte.js/ts files outside of .svelte.js/ts files and .svelte files",
      category: "Possible Errors",
      recommended: true,
    },
    messages: {
      noRestrictedSvelteImports:
        "Importing from .svelte.js/ts files is not allowed unless you are within a .svelte.js/ts or .svelte file.",
    },
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (typeof node.source.value !== "string") {
          return;
        }

        const fileName = context.filename;

        const importSource = getImportSource({
          source: node.source.value,
          fileName,
        });

        if (!importSource) {
          return;
        }

        // Check if current file is NOT a .svelte.js/ts file or .svelte file but trying to import from one
        if (
          !fileName.match(/\.svelte\.(js|ts)$/i) &&
          !fileName.match(/\.svelte$/i) &&
          importSource.match(/\.svelte\.(js|ts)$/i)
        ) {
          context.report({
            node: node.source,
            messageId: "forbidden",
          });
        }
      },
    };
  },
};
