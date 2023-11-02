import { Rule } from 'eslint';

export function createRule<const Name>(name: Name, rule: Rule.RuleModule) {
	return {
		name,
		rule,
	} as const;
}
