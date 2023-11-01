import { Rule } from "eslint";
import { svelteJsFileExtension, svelteTsFileExtension } from "src/constants";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of the $props rune outside of .svelte files",
      category: "Possible Errors",
      recommended: true,
    },
    messages: {
      noRestrictedSveltePropsRune:
        "Usage of the $props rune is only allowed within .svelte component files",
    },
    schema: [],
  },

  create: (context) => {
    // only run this rule on .svelte.js or .svelte.ts files
    const fileName = context.filename;
    if (
      !fileName.endsWith(svelteJsFileExtension) &&
      !fileName.endsWith(svelteTsFileExtension)
    ) {
      return {};
    }

    return {
      Identifier(node) {
        if (node.name === "$props") {
          context.report({
            node,
            messageId: "noRestrictedSveltePropsRune",
          });
        }
      },
    };
  },
};

export default rule;
