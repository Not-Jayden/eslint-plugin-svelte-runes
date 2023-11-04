import { RuleTester } from 'eslint';

export const ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});
