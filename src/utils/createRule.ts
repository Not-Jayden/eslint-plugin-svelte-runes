import { Rule } from 'eslint';

function createRule<const Name>(name: Name, rule: Rule.RuleModule) {
	return {
		name,
		rule,
	} as const;
}

// const x = createRule('no-restricted-svelte-runes', {});
