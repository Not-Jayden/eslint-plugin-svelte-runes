import { messageId, rule } from '../../../src/rules/no-effect-outside-components';
import { ruleTester } from '../../utils/ruleTester';

ruleTester.run('no-effect-outside-components', rule, {
	valid: [
		{
			code: `$effect(() => {console.log(count);});`,
			filename: 'Counter.svelte',
		},
	],

	invalid: [
		{
			code: `$effect(() => {console.log(count);});`,
			filename: 'store.svelte.js',
			errors: [
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$effect',
					},
				},
			],
		},
		{
			code: `function createStore() {
				$effect(() => {console.log(count);});
			}`,
			filename: 'store.svelte.ts',
			errors: [
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$effect',
					},
				},
			],
		},
	],
});
