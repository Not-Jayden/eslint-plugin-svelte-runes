import type { Rule } from 'eslint';

const RUNE_NAMES = ['$state', '$derived'];
const messageIdReturn = 'noDirectRuneReturns';

export const ruleReturn: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Disallow returning variables or values initialized with a Svelte rune CallExpression directly from functions.',
			category: 'Possible Errors',
		},
		messages: {
			[messageIdReturn]: 'Do not return values initialized with Svelte runes directly from functions.',
		},
	},

	create(context) {
		const runeInitializers = new Map();

		return {
			VariableDeclaration(node) {
				for (const declarator of node.declarations) {
					if (
						declarator.init?.type === 'CallExpression' &&
						declarator.init.callee.type === 'Identifier' &&
						declarator.id.type === 'Identifier' &&
						RUNE_NAMES.includes(declarator.init.callee.name)
					) {
						runeInitializers.set(declarator.id.name, declarator.init.callee.name);
					}
				}
			},

			ReturnStatement(node) {
				if (node.argument?.type === 'ObjectExpression') {
					for (const property of node.argument.properties) {
						// TODO: Handle basic spread property case
						if (property.type !== 'Property') {
							continue;
						}

						if (property.value.type === 'Identifier' && runeInitializers.has(property.value.name)) {
							context.report({
								node: property,
								messageId: messageIdReturn,
							});
						}
					}
				}
			},
		};
	},
};
