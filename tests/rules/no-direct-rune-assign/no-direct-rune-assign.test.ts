import { messageId, rule } from '../../../src/rules/no-direct-rune-assign';
import { ruleTester } from '../../utils/ruleTester';

ruleTester.run('no-direct-rune-assign', rule, {
	valid: [
		{
			code: `const state = $notARealRune;`,
			filename: 'store.svelte.js',
		},
		{
			code: `const runes = { $notARealRune };`,
			filename: 'store.svelte.js',
		},
	],

	invalid: [
		{
			code: 'const state = $state;',
			filename: 'store.svelte.js',
			errors: [
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$state',
					},
				},
			],
		},
		{
			code: 'const state = $derived;',
			filename: 'store.svelte.js',
			errors: [
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$derived',
					},
				},
			],
		},
		{
			code: 'const state = $effect;',
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
			code: 'const state = $props;',
			filename: 'store.svelte.js',
			errors: [
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$props',
					},
				},
			],
		},
		{
			code: 'const runes = { $state };',
			filename: 'store.svelte.js',
			errors: [
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$state',
					},
				},
			],
		},
		{
			code: 'const runes = { $derived };',
			filename: 'store.svelte.js',
			errors: [
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$derived',
					},
				},
			],
		},
		{
			code: 'const runes = { $effect };',
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
			code: 'const runes = { $props };',
			filename: 'store.svelte.js',
			errors: [
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$props',
					},
				},
			],
		},
		{
			code: 'const runes = { $state, $derived, $effect, $props };',
			filename: 'store.svelte.js',
			errors: [
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$state',
					},
				},
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$derived',
					},
				},
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$effect',
					},
				},
				{
					messageId,
					type: 'Identifier',
					data: {
						name: '$props',
					},
				},
			],
		},
	],
});
