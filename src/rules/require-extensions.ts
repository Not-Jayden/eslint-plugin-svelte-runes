import type { Rule } from 'eslint';

import { getImportSource } from '../utils/getImportSource'; // Update the path accordingly
import { SVELTE_COMPONENT_FILE_EXTENSION, SVELTE_JS_FILE_EXTENSION, SVELTE_TS_FILE_EXTENSION } from 'src/constants';

const messageId = 'requireExtensions';

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Require using a full .svelte.js or .svelte.ts file extension, unless there is a component that exists as just .svelte.',
			category: 'Stylistic Issues',
		},
		messages: {
			[messageId]: 'Use a full .svelte.js or .svelte.ts file extension unless a .svelte file exists.',
		},
	},

	create(context) {
		return {
			ImportDeclaration(node) {
				if (node.source && node.source.value) {
					const importPath = node.source.value;
					if (typeof importPath !== 'string') {
						return;
					}

					if (!importPath.endsWith('.svelte')) {
						return;
					}

					const resolvedPath = getImportSource({ source: importPath, fileName: context.getFilename() });

					if (!resolvedPath) {
						return;
					}

					// If the resolved path ends with .svelte, then it's a valid component
					if (resolvedPath.endsWith(SVELTE_COMPONENT_FILE_EXTENSION)) {
						return;
					}

					if (
						!resolvedPath.endsWith(SVELTE_JS_FILE_EXTENSION) &&
						!resolvedPath.endsWith(SVELTE_TS_FILE_EXTENSION) // TODO: determine if the file can/should be able to end with .svelte.ts
					) {
						context.report({
							node: node.source,
							messageId,
							// fix by appending .js to the import path
							fix: (fixer) => fixer.replaceText(node.source, `'${importPath}.js'`),
						});
					}
				}
			},
		};
	},
};
