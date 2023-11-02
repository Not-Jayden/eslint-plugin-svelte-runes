import type { Rule } from 'eslint';
import { getImportSource } from '../utils/getImportSource';

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow exporting directly from .svelte.js/ts files outside of .svelte.js/ts files',
			category: 'Possible Errors',
			recommended: true,
		},
		messages: {
			noRestrictedSvelteExports:
				'Exporting directly from .svelte.js/ts files is not allowed unless you are within a .svelte.js/ts file.',
		},
	},

	create(context) {
		return {
			ExportNamedDeclaration(node) {
				if (!node.source || typeof node.source.value !== 'string') {
					return;
				}

				const fileName = context.filename;

				const exportSource = getImportSource({
					source: node.source.value,
					fileName,
				});

				if (!exportSource) {
					return;
				}

				// Check if current file is NOT a .svelte.js/ts file but trying to export directly from one
				if (!fileName.match(/\.svelte\.(js|ts)$/i) && exportSource.match(/\.svelte\.(js|ts)$/i)) {
					context.report({
						node: node.source,
						messageId: 'forbidden',
					});
				}
			},

			ExportAllDeclaration(node) {
				if (!node.source || typeof node.source.value !== 'string') {
					return;
				}

				const fileName = context.filename;

				const exportSource = getImportSource({
					source: node.source.value,
					fileName,
				});

				if (!exportSource) {
					return;
				}

				// Check if current file is NOT a .svelte.js/ts file but trying to use wildcard export from one
				if (!fileName.match(/\.svelte\.(js|ts)$/i) && exportSource.match(/\.svelte\.(js|ts)$/i)) {
					context.report({
						node: node.source,
						messageId: 'forbidden',
					});
				}
			},
		};
	},
};
