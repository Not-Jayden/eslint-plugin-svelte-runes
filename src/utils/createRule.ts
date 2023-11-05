import type { Rule } from 'eslint';

type Configuration = 'recommended';

type RuleData = {
	rule: Rule.RuleModule;

	id: string;
	configurations: Configuration[];
};

export function createRule<const ID extends string>(
	id: ID,
	rule: Rule.RuleModule,
	configurations: Configuration[],
): RuleData {
	return {
		id,
		rule,
		configurations,
	} as const satisfies RuleData;
}
