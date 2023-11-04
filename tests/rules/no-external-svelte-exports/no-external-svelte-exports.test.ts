import { RuleTester } from 'eslint';

import { messageId, rule } from '../../../src/rules/no-external-svelte-exports';
import * as helper from '../../../src/utils/getImportSource';

import { vi } from 'vitest';

const ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

vi.spyOn(helper, 'getImportSource').mockImplementation(() => {
	return './Component.svelte.js';
});

ruleTester.run('no-restricted-svelte-exports', rule, {
	valid: [
		{
			code: 'import something from "./notSvelteFile.js";',
		},
		{
			code: 'import something from "./notSvelteFile.js";',
			filename: 'Component.svelte.js',
		},
		{
			code: 'import something from "./Component.svelte.js";',
			filename: 'Component.svelte.js',
		},
		{
			code: 'import something from "./Component.svelte.ts";',
			filename: 'Component.svelte',
		},
	],

	invalid: [
		{
			code: 'export * from "./Component.svelte.js";',
			filename: 'test.js',
			errors: [
				{
					messageId,
					type: 'Literal',
				},
			],
		},
		{
			code: 'export * as Component from "./Component.svelte.ts";',
			filename: 'test.ts',
			errors: [
				{
					messageId,
					type: 'Literal',
				},
			],
		},
	],
});
