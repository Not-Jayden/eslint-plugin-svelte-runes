const fs = require("fs");
const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "disallow importing from .svelte.js/ts files outside of .svelte.js/ts files and .svelte files",
      category: "Possible Errors",
    },
    messages: {
      forbidden:
        "Importing from .svelte.js/ts files is restricted unless you are within a .svelte.js/ts or .svelte file.",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const fileName = context.getFilename();
        let importSource = node.source.value;

        // Resolving the absolute path of the imported module
        const importedModulePath = path.resolve(
          path.dirname(fileName),
          importSource
        );

        // Check if the file with .js or .ts extension exists
        if (fs.existsSync(importedModulePath + ".js")) {
          importSource += ".js";
        } else if (fs.existsSync(importedModulePath + ".ts")) {
          importSource += ".ts";
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
