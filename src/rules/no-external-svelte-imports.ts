import type { Rule } from 'eslint';

import { SVELTE_COMPONENT_PATTERN, SVELTE_JS_OR_TS_PATTERN } from '../constants';

import { getImportSource } from '../utils/getImportSource';

type ImportNode = Extract<Rule.Node, { type: 'ImportDeclaration' | 'ImportExpression' }>;

export const messageId = 'noRestrictedSvelteImports';

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow importing from .svelte.js/ts files outside of .svelte.js/ts files and .svelte files',
			category: 'Possible Errors',
			recommended: true,
		},
		messages: {
			[messageId]:
				'Importing from .svelte.js/ts files is not allowed unless you are within a .svelte.js/ts or .svelte file.',
		},
	},

	create(context) {
		function checkImport(node: ImportNode, sourceValue: string) {
			if (typeof sourceValue !== 'string') {
				return;
			}

			const fileName = context.filename;

			const importSource = getImportSource({
				source: sourceValue,
				fileName,
			});

			if (!importSource) {
				return;
			}

			// Check if current file is NOT a .svelte.js/ts file or .svelte file but trying to import from one
			if (
				!fileName.match(SVELTE_JS_OR_TS_PATTERN) &&
				!fileName.match(SVELTE_COMPONENT_PATTERN) &&
				importSource.match(SVELTE_JS_OR_TS_PATTERN)
			) {
				context.report({
					node: node.source,
					messageId,
				});
			}
		}

		return {
			ImportDeclaration(node) {
				if (node.source.type !== 'Literal') {
					return;
				}
				if (typeof node.source.value !== 'string') {
					return;
				}

				checkImport(node, node.source.value);
			},

			ImportExpression(node) {
				if (node.source.type !== 'Literal') {
					return;
				}
				if (typeof node.source.value !== 'string') {
					return;
				}

				checkImport(node, node.source.value);
			},
		};
	},
};
