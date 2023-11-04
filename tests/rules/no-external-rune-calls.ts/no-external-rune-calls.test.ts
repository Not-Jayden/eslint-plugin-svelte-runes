import { messageId, rule } from '../../../src/rules/no-external-rune-calls';
import { ruleTester } from '../../utils/ruleTester';

ruleTester.run('no-external-rune-calls', rule, {
	valid: [
		{
			code: `$effect(() => {console.log(count);});`,
			filename: 'Counter.svelte',
		},
		// manually defined runes in a non-svelte file
		{
			code: `const $state = (value) => {
				return value;
			};
			const count = $state(0);`,
			filename: 'index.js',
		},
	],

	invalid: [
		{
			code: `$effect(() => {console.log(count);});`,
			filename: 'index.js',
			errors: [
				{
					messageId,
					type: 'CallExpression',
				},
			],
		},
		{
			code: `function createStore() {
				$effect(() => {console.log(count);});
			}`,
			filename: 'index.js',
			errors: [
				{
					messageId,
					type: 'CallExpression',
				},
			],
		},
		{
			code: `const count = $state(0);`,
			filename: 'index.js',
			errors: [
				{
					messageId,
					type: 'CallExpression',
				},
			],
		},
	],
});
