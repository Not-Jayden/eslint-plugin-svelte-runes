import { RuleTester } from 'eslint';

import { rule } from '../../src/rules/no-external-svelte-imports';

const ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('no-restricted-svelte-imports', rule, {
	valid: [
		{
			code: 'import something from "./notSvelteFile.js";',
			filename: 'test.js',
		},
		{
			code: 'import something from "./notSvelteFile.js";',
			filename: 'myComponent.svelte.js',
		},
		{
			code: 'import something from "./myComponent.svelte.js";',
			filename: 'myComponent.svelte.js',
		},
		{
			code: 'import something from "./myComponent.svelte.ts";',
			filename: 'myComponent.svelte',
		},
	],

	invalid: [
		{
			code: 'import something from "./myComponent.svelte.js";',
			filename: 'test.js',
			errors: [
				{
					messageId: 'forbidden',
					type: 'Literal',
				},
			],
		},
		{
			code: 'import something from "./myComponent.svelte.ts";',
			filename: 'test.ts',
			errors: [
				{
					messageId: 'forbidden',
					type: 'Literal',
				},
			],
		},
	],
});
