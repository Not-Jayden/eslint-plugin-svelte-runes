import type { Rule } from 'eslint';

import { getImportSource } from '../utils/getImportSource'; // Update the path accordingly

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
					const importPath = node.source.value as string;
					const resolvedPath = getImportSource({ source: importPath, fileName: context.getFilename() });

					if (!resolvedPath) {
						return;
					}
					if (resolvedPath.endsWith('.svelte')) {
						return;
					}

					if (!resolvedPath.endsWith('.svelte.js') && !resolvedPath.endsWith('.svelte.ts')) {
						context.report({
							node: node.source,
							messageId,
						});
					}
				}
			},
		};
	},
};
