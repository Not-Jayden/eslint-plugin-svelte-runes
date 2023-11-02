import type { Rule } from 'eslint';

import { RUNE_NAMES, SVELTE_FILE_EXTENSIONS } from 'src/constants';

import { checkIsVariableDefinedForIdentifier } from 'src/utils/checkIsVariableDefinedForIdentifier';

const messageId = 'noRestrictedSvelteRunes';

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'disallow the usage of $derived(), $effect(), $state(), and $props() function calls in non-Svelte files unless explicitly declared or imported',
			category: 'Possible Errors',
			recommended: true,
		},
		messages: {
			[messageId]: 'Usage of Svelte runes is not allowed outside Svelte files',
		},
	},

	create(context) {
		const fileName = context.filename;
		if (SVELTE_FILE_EXTENSIONS.some((extension) => fileName.endsWith(extension))) {
			return {};
		}

		return {
			CallExpression(node) {
				if (node.callee.type !== 'Identifier') {
					return;
				}
				if (!RUNE_NAMES.includes(node.callee.name as (typeof RUNE_NAMES)[number])) {
					return;
				}

				const initialScope = context.sourceCode.getScope(node);
				const isVariableDefinedForIdentifier = checkIsVariableDefinedForIdentifier({
					initialScope,
					identifierNode: node.callee,
				});

				if (isVariableDefinedForIdentifier) {
					return;
				}

				context.report({
					node,
					messageId,
				});
			},
		};
	},
};
