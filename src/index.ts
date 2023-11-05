import type { ESLint, Rule } from 'eslint';

import { rule as noExternalSvelteImportsRule } from './rules/no-external-svelte-imports';
import { rule as noExternalSvelteExportsRule } from './rules/no-external-svelte-exports';
import { rule as noExternalRuneCallsRule } from './rules/no-external-rune-calls';
import { rule as noEffectOutsideComponentsRule } from './rules/no-effect-outside-components';
import { rule as noPropsOutsideComponentsRule } from './rules/no-props-outside-components';
import { rule as noDirectRuneAssignRule } from './rules/no-direct-rune-assign';
import { rule as noInitializedRuneExportsRule } from './rules/no-initialized-rune-exports';
import { rule as noInitializedRuneReturnRule } from './rules/no-initialized-rune-return';
import { rule as requireExtensionsRule } from './rules/require-extensions';

const rules = {
	'no-external-svelte-imports': noExternalSvelteImportsRule,
	'no-external-svelte-exports': noExternalSvelteExportsRule,
	'no-external-rune-calls': noExternalRuneCallsRule,
	'no-effect-outside-components': noEffectOutsideComponentsRule,
	'no-props-outside-components': noPropsOutsideComponentsRule,
	'no-direct-rune-assign': noDirectRuneAssignRule,
	'no-initialized-rune-exports': noInitializedRuneExportsRule,
	'no-initialized-rune-return': noInitializedRuneReturnRule,
	'require-extensions': requireExtensionsRule,
} as const satisfies Record<string, Rule.RuleModule>;

type RuleKey = keyof typeof rules;
type RuleConfig = Record<`svelte-runes/${RuleKey}`, 'error'>;

const recommendedRules = {
	'svelte-runes/no-direct-rune-assign': 'error',
	'svelte-runes/no-external-rune-calls': 'error',
	'svelte-runes/no-external-svelte-exports': 'error',
	'svelte-runes/no-external-svelte-imports': 'error',
	'svelte-runes/no-props-outside-components': 'error',
	'svelte-runes/no-initialized-rune-exports': 'error',
	'svelte-runes/no-initialized-rune-return': 'error',
	'svelte-runes/require-extensions': 'error',
} as const satisfies Partial<RuleConfig>;

const allRules = {
	'svelte-runes/no-direct-rune-assign': 'error',
	'svelte-runes/no-external-rune-calls': 'error',
	'svelte-runes/no-external-svelte-exports': 'error',
	'svelte-runes/no-external-svelte-imports': 'error',
	'svelte-runes/no-props-outside-components': 'error',
	'svelte-runes/no-initialized-rune-exports': 'error',
	'svelte-runes/no-initialized-rune-return': 'error',
	'svelte-runes/require-extensions': 'error',
	'svelte-runes/no-effect-outside-components': 'error',
} satisfies RuleConfig;

const plugin = {
	rules,

	configs: {
		recommended: {
			rules: recommendedRules,
		},
		all: {
			rules: allRules,
		},
	},
} satisfies ESLint.Plugin;

export = plugin;
