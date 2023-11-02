import type { Rule } from 'eslint';

import { RUNE_NAMES, SVELTE_FILE_EXTENSIONS } from 'src/constants';

import { getPropertyValueIdentifier } from 'src/utils/getPropertyValueIdentifier';

const messageId = 'noRestrictedDirectRuneAssignments';

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Disallow the assignment of Svelte runes as object properties or direct variable assignments, as the compiler will not be able to process them.',
			category: 'Possible Errors',
			recommended: true,
		},
		messages: {
			[messageId]: 'Direct assignment or property assignment of Svelte runes is not allowed without invocation.',
		},
	},

	create(context) {
		if (!SVELTE_FILE_EXTENSIONS.some((extension) => context.filename.endsWith(extension))) {
			return {};
		}

		return {
			Property(node) {
				const propertyValueIdentifier = getPropertyValueIdentifier(node);
				if (!propertyValueIdentifier) {
					return;
				}

				if (!RUNE_NAMES.includes(propertyValueIdentifier.name as (typeof RUNE_NAMES)[number])) {
					return;
				}

				context.report({
					node: propertyValueIdentifier,
					messageId,
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
					messageId,
				});
			},
		};
	},
};
