/* eslint-env node */
module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:eslint-plugin-eslint-plugin/recommended',
		'plugin:eslint-plugin-n/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'eslint-plugin-eslint-plugin', 'eslint-plugin-n', 'eslint-plugin-svelte-runes'],
	root: true,
	rules: {
		'@typescript-eslint/consistent-type-imports': 'error',
		'n/no-unpublished-import': [
			'error',
			{
				allowModules: ['eslint'],
			},
		],
		// TODO: figure out how to get this to play nice with typescript
		'n/no-missing-import': ['off'],
		'eslint-plugin-svelte-runes/no-direct-rune-assign': 'error',
	},
	settings: {
		'eslint-plugin-n': {},
	},
};
