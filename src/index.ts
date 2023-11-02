import type { ESLint } from 'eslint';

import { rule as noExternalSvelteImportsRule } from './rules/no-external-svelte-imports';
import { rule as noExternalSvelteExportsRule } from './rules/no-external-svelte-exports';

const plugin = {
	// TODO: generate this from package.json
	meta: {
		name: 'eslint-plugin-svelte-boundaries',
		version: '0.0.0',
	},
	rules: {
		'no-external-svelte-imports': noExternalSvelteImportsRule,
		'no-external-svelte-exports': noExternalSvelteExportsRule,
	},

	configs: {
		recommended: {
			rules: {
				'svelte-code-boundary/no-restricted-svelte-imports': 'error',
				'svelte-code-boundary/no-restricted-svelte-exports': 'error',
			},
		},
	},
} satisfies ESLint.Plugin;

export = plugin;
