import { rule } from '../../../../src/rules/no-external-svelte-imports';
import * as helper from '../../../../src/utils/getImportSource';
import { vi } from 'vitest';
import { ruleTester } from '../../../utils/ruleTester';

vi.spyOn(helper, 'getImportSource')
	// mock getting the filename being tested
	.mockImplementationOnce(() => {
		return './test.js';
	})
	// mock the path being imported from
	.mockImplementation(() => {
		return './notSvelteFile.js';
	});

ruleTester.run('no-restricted-svelte-imports', rule, {
	valid: [
		{
			code: 'import something from "./notSvelteFile.js";',
			filename: 'test.js',
		},
	],

	invalid: [],
});
