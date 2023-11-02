import type { Rule } from 'eslint';

import { RUNE_NAMES } from 'src/constants';

const messageId = 'noExportedRunes';

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow the export of variables or values initialized with a Svelte rune CallExpression.',
			category: 'Possible Errors',
		},
		messages: {
			[messageId]: 'Do not export values initialized with Svelte runes.',
		},
	},

	create(context) {
		// Track variables and their initializers
		const runeInitializers = new Map();

		return {
			VariableDeclaration(node) {
				for (const declarator of node.declarations) {
					if (
						declarator.init?.type === 'CallExpression' &&
						declarator.init.callee.type === 'Identifier' &&
						declarator.id.type === 'Identifier' &&
						RUNE_NAMES.includes(declarator.init.callee.name as (typeof RUNE_NAMES)[number])
					) {
						runeInitializers.set(declarator.id.name, declarator.init.callee.name);
					}
				}
			},

			ExportNamedDeclaration(node) {
				if (node.declaration?.type === 'VariableDeclaration') {
					for (const declarator of node.declaration.declarations) {
						if (
							declarator.init?.type === 'CallExpression' &&
							declarator.init.callee.type === 'Identifier' &&
							RUNE_NAMES.includes(declarator.init.callee.name as (typeof RUNE_NAMES)[number])
						) {
							context.report({
								node: declarator,
								messageId,
							});
						}
					}
				}

				if (node.specifiers) {
					for (const specifier of node.specifiers) {
						const localName = specifier.local.name;
						if (
							RUNE_NAMES.includes(localName as (typeof RUNE_NAMES)[number]) ||
							runeInitializers.has(localName)
						) {
							context.report({
								node: specifier,
								messageId,
							});
						}
					}
				}
			},

			ExportDefaultDeclaration(node) {
				if (
					node.declaration.type === 'CallExpression' &&
					node.declaration.callee.type === 'Identifier' &&
					RUNE_NAMES.includes(node.declaration.callee.name as (typeof RUNE_NAMES)[number])
				) {
					context.report({
						node: node.declaration,
						messageId,
					});
				} else if (node.declaration.type === 'Identifier' && runeInitializers.has(node.declaration.name)) {
					context.report({
						node: node.declaration,
						messageId,
					});
				}
			},
		};
	},
};
