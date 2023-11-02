import { Rule } from 'eslint';

import { EFFECT_RUNE, SVELTE_JS_FILE_EXTENSION, SVELTE_TS_FILE_EXTENSION } from 'src/constants';

const messageId = 'noEffectOutsideComponents';

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow usage of the $effect rune outside of .svelte files',
			category: 'Possible Errors',
		},
		messages: {
			[messageId]: '$effect rune should only allowed within .svelte component files',
		},
	},

	create: (context) => {
		// only run this rule on .svelte.js or .svelte.ts files
		const fileName = context.filename;

		const isSvelteJsOrTsFile = [SVELTE_JS_FILE_EXTENSION, SVELTE_TS_FILE_EXTENSION].some((extension) =>
			fileName.endsWith(extension),
		);
		if (!isSvelteJsOrTsFile) {
			return {};
		}

		return {
			Identifier(node) {
				if (node.name === EFFECT_RUNE) {
					context.report({
						node,
						messageId,
					});
				}
			},
		};
	},
};

export default rule;
