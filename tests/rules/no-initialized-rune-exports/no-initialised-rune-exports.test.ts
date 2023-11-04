import { messageId, rule } from '../../../src/rules/no-initialized-rune-exports';
import { ruleTester } from '../../utils/ruleTester';

ruleTester.run('no-initialized-rune-exports', rule, {
	valid: [
		{
			code: `export const count = 0;`,
			filename: 'index.js',
		},
	],

	invalid: [
		{
			code: `export const count = $state(0);`,
			filename: 'index.js',
			errors: [
				{
					messageId,
					type: 'VariableDeclarator',
				},
			],
		},
		{
			code: `const count = $state(0);
			export { count };`,
			filename: 'index.js',
			errors: [
				{
					messageId,
					type: 'ExportNamedDeclaration',
				},
			],
		},
		{
			code: `export default $state(0);`,
			filename: 'index.js',
			errors: [
				{
					messageId,
					type: 'ExportDefaultDeclaration',
				},
			],
		},
		{
			code: `export const count = $state(0);
			export default count;`,
			filename: 'index.js',
			errors: [
				{
					messageId,
					type: 'VariableDeclarator',
				},
				{
					messageId,
					type: 'ExportDefaultDeclaration',
				},
			],
		},
	],
});
