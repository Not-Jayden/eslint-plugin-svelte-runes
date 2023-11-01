import type { Rule } from "eslint";

import { runeNames, svelteFileExtensions } from "src/constants";

import { checkIsVariableDefinedForIdentifier } from "src/utils/checkIsVariableDefinedForIdentifier";

export const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "disallow the usage of $derived(), $effect(), $state(), and $props() function calls unless explicitly declared or imported",
      category: "Possible Errors",
      recommended: true,
    },
    messages: {
      noRestrictedSvelteRunes:
        "Usage of Svelte runes is not allowed outside Svelte files",
    },
  },

  create(context) {
    const fileName = context.filename;
    if (
      svelteFileExtensions.some((extension) => fileName.endsWith(extension))
    ) {
      return {};
    }

    return {
      CallExpression(node) {
        if (node.callee.type !== "Identifier") {
          return;
        }
        if (
          !runeNames.includes(node.callee.name as (typeof runeNames)[number])
        ) {
          return;
        }

        const initialScope = context.sourceCode.getScope(node);
        const isVariableDefinedForIdentifier =
          checkIsVariableDefinedForIdentifier({
            initialScope,
            identifierNode: node.callee,
          });

        if (isVariableDefinedForIdentifier) {
          return;
        }

        context.report({
          node,
          messageId: "runeDetected",
        });
      },
    };
  },
};
