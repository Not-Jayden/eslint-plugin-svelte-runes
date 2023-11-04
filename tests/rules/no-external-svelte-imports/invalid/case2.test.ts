import { messageId, rule } from '../../../../src/rules/no-external-svelte-imports';
import * as helper from '../../../../src/utils/getImportSource';
import { vi } from 'vitest';
import { ruleTester } from '../../../utils/ruleTester';

vi.spyOn(helper, 'getImportSource').mockImplementationOnce(() => {
	return './index.ts';
});
vi.spyOn(helper, 'getImportSource').mockImplementation(() => {
	return './store.svelte.ts';
});

ruleTester.run('no-restricted-svelte-imports - invalid - case 2', rule, {
	valid: [],

	invalid: [
		{
			code: 'import something from "./store.svelte.ts";',
			filename: 'index.ts',
			errors: [
				{
					messageId,
					type: 'Literal',
				},
			],
		},
	],
});
