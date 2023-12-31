import type { Rule } from 'eslint';

import { PROPS_RUNE, SVELTE_JS_FILE_EXTENSION, SVELTE_TS_FILE_EXTENSION } from '../constants';

const messageId = 'noPropsOutsideComponents';

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow usage of the $props rune outside of .svelte files',
			category: 'Possible Errors',
		},
		messages: {
			[messageId]: 'Usage of the $props rune is only allowed within .svelte component files',
		},
		schema: [],
	},

	create: (context) => {
		// only run this rule on .svelte.js or .svelte.ts files
		const fileName = context.filename;
		if (!fileName.endsWith(SVELTE_JS_FILE_EXTENSION) && !fileName.endsWith(SVELTE_TS_FILE_EXTENSION)) {
			return {};
		}

		return {
			Identifier(node) {
				if (node.name === PROPS_RUNE) {
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
