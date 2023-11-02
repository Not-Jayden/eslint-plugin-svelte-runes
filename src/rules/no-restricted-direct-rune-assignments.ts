import type { Rule } from 'eslint';

import { RUNE_NAMES, SVELTE_FILE_EXTENSIONS } from 'src/constants';

export const noRestrictedDirectRuneAssignments: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Disallow the assignment of Svelte runes as object properties or direct variable assignments, as the compiler will not be able to process them.',
			category: 'Possible Errors',
			recommended: true,
		},
		messages: {
			noRestrictedDirectRuneAssignments:
				'Direct assignment or property assignment of Svelte runes is not allowed without invocation.',
		},
	},

	create(context) {
		if (!SVELTE_FILE_EXTENSIONS.some((extension) => context.filename.endsWith(extension))) {
			return {};
		}

		return {
			Property(node) {
				function getIdentifierOfInterest(node: Extract<Rule.Node, { type: 'Property' }>) {
					if (node.shorthand && node.key.type === 'Identifier') {
						return node.key;
					}

					if (node.value.type === 'Identifier') {
						return node.value;
					}

					return null;
				}

				const identifierOfInterest = getIdentifierOfInterest(node);
				if (!identifierOfInterest) {
					return;
				}

				if (!RUNE_NAMES.includes(identifierOfInterest.name as (typeof RUNE_NAMES)[number])) {
					return;
				}

				context.report({
					node: identifierOfInterest,
					messageId: 'noRuneAssignments',
				});
			},
			VariableDeclarator(node) {
				if (node.init?.type !== 'Identifier') {
					return;
				}

				if (!RUNE_NAMES.includes(node.init.name as (typeof RUNE_NAMES)[number])) {
					return;
				}

				context.report({
					node: node.init,
					messageId: 'noRuneAssignments',
				});
			},
		};
	},
};
