import { messageId, rule } from '../../../../src/rules/no-external-svelte-imports';
import * as helper from '../../../../src/utils/getImportSource';
import { vi } from 'vitest';
import { ruleTester } from '../../../utils/ruleTester';

vi.spyOn(helper, 'getImportSource').mockImplementationOnce(() => {
	return './index.js';
});
vi.spyOn(helper, 'getImportSource').mockImplementation(() => {
	return './store.svelte.js';
});

ruleTester.run('no-restricted-svelte-imports - invalid - case 1', rule, {
	valid: [],

	invalid: [
		{
			code: 'import something from "./store.svelte.js";',
			filename: 'index.js',
			errors: [
				{
					messageId,
					type: 'Literal',
				},
			],
		},
	],
});
