import type { Rule } from "eslint";

export const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "disallow the usage of $derived(), $effect(), $state(), and $props() function calls unless declared or imported",
      category: "Possible Errors",
    },
    messages: {
      runeDetected: "Usage of Svelte runes is not allowed outside Svelte files",
    },
  },

  create(context) {
    const fileName = context.filename;
    if (
      fileName.endsWith(".svelte") ||
      fileName.endsWith(".svelte.js") ||
      fileName.endsWith(".svelte.ts")
    ) {
      return {};
    }

    const runeNames = ["$derived", "$effect", "$state", "$props"] as const;

    function isFunctionImportedOrDeclared(name: string): boolean {
      // Get the current scope
      const scope = context.getScope();

      // Check in the variable list if the function name exists
      const variable = scope.variables.find(
        (variable) => variable.name === name
      );

      // If the variable exists and has some references, then it's imported or declared in the current scope
      return !!variable && variable.references.length > 0;
    }

    return {
      CallExpression(node) {
        if (
          node.callee.type === "Identifier" &&
          runeNames.includes(node.callee.name as (typeof runeNames)[number])
        ) {
          if (!isFunctionImportedOrDeclared(node.callee.name)) {
            context.report({
              node,
              messageId: "runeDetected",
            });
          }
        }
      },
    };
  },
};
